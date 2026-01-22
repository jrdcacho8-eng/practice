
//require('dotenv').config(); // Load environment variables
const path = require('path');
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const connection = require('./db'); // Ensure this is a connection pool
const authRoutes = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Store Options
const sessionStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 900000, // How often to clear expired sessions (15 min)
    expiration: 86400000, // How long a session is valid (24 hours)
}, connection);

// Session setup
app.use(
  session({
    key: 'session_cookie_name',
    secret: process.env.SESSION_SECRET || 'a-very-hard-to-guess-string',
    store: sessionStore,
    resave: false,
    saveUninitialized: false, // Recommended: don't create sessions until something is stored
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // true if using HTTPS
        httpOnly: true, // Prevents XSS attacks from reading the cookie
        maxAge: 86400000 
    },
  })
);


app.get('/', (req, res) => {

res.sendFile(path.join(__dirname,'register.html'));

});

app.get('/login', (req, res) => {

res.sendFile(path.join(__dirname,'login.html'));

});

app.use('/auth', authRoutes);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});