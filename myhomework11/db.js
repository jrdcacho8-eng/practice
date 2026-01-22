const mysql = require('mysql2');

//const app = express();
//app.use(express.json()); // Middleware to parse JSON data

// 1. Establish the Connection
const connection = mysql.createConnection({
  host: '10.0.0.64',
  user: 'api_user',      // Replace with your MySQL username
  password: 'C@pstoneAJE3', // Replace with your MySQL password
  database: 'auth_demo'
})

// Connect to the database

connection.connect((err) => {

 if (err) {

  console.error('Error connecting to MySQL:', err);

  return;

 }

 console.log('Connected to MySQL database.');

});

module.exports = connection;