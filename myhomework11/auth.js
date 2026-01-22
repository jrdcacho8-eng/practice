const express = require('express');

const bcrypt = require('bcryptjs');

const connection = require('./db'); // MySQL connection

const router = express.Router();



router.get('/', (req, res) => {

res.sendFile(path.join(__dirname,'form.html'));

});

// User registration route

router.post('/register', (req, res) => {

 const { username, password } = req.body;

 // Check if the username is already taken

 const query = 'SELECT * FROM users WHERE username = ?';

 connection.query(query, [username], (err, results) => {

  if (err) {

   return res.status(500).send('Error checking user existence');

  }

  if (results.length > 0) {

   return res.status(400).send('Username already exists');

  }

  // Hash the password before saving it

  bcrypt.hash(password, 10, (err, hash) => {

   if (err) {

    return res.status(500).send('Error hashing password');

   }

   // Insert the new user into the database

   const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';

   connection.query(insertQuery, [username, hash], (err) => {

    if (err) {

     return res.status(500).send('Error saving user');

    }

    res.status(201).send('User registered successfully');

   });

  });

 });

});

module.exports = router;


router.post('/login', (req, res) => {

 const { username, password } = req.body;

 // Find the user by username

 const query = 'SELECT * FROM users WHERE username = ?';

 connection.query(query, [username], (err, results) => {

  if (err) {

   return res.status(500).send('Error finding user');

  }

  if (results.length === 0) {

   return res.status(400).send('User not found');

  }

  const user = results[0];

  // Compare the password with the hashed password

  bcrypt.compare(password, user.password, (err, isMatch) => {

   if (err) {

    return res.status(500).send('Error comparing passwords');

   }

   if (!isMatch) {

    return res.status(400).send('Invalid password');

   }

   // Save user session

   req.session.user = user;

   res.status(200).send('Login successful');

  });

 });

});

function isAuthenticated(req, res, next) {

 if (req.session.user) {

  return next();

 }

 return res.status(401).send('You need to log in to access this page');

}

// Example of a protected route

router.get('/dashboard', isAuthenticated, (req, res) => {

 res.send(`Welcome to the dashboard, ${req.session.user.username}`);

});

router.post('/logout', (req, res) => {

 req.session.destroy((err) => {

  if (err) {

   return res.status(500).send('Error logging out');

  }

  res.status(200).send('Logout successful');

 });

});