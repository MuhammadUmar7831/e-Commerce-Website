const connectToDatabase = require('./database');
const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json()); 
const connection = connectToDatabase();

const port = 3000; // Choose any available port you prefer
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});