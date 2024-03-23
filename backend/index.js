const connectToDatabase = require('./database');

// Connect to the database
const connection = connectToDatabase();
connection.end();
