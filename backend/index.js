const connectToDatabase = require('./database');
const express = require("express");
const app = express();
const cors = require("cors");
// Middleware
app.use(cors());
app.use(express.json()); 
const connection = connectToDatabase();
function createProductInfoTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS Product(
            ID INT AUTO_INCREMENT PRIMARY KEY,
            Name VARCHAR(255) NOT NULL,
            Price DECIMAL(10, 2) NOT NULL,
            Description LONGTEXT NOT NULL,
            Quantity INT ,
            Rating Float
        )
    `;

    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Error creating productinfo table:', err);
            return;
        }
        console.log('Productinfo table created or already exists');
    });
}

createProductInfoTable();
// Import and use routes
app.use('/Product', require('./AdminRoutes/ProductRoutes'));
app.use('/Orders', require('./AdminRoutes/OrderRoutes'));

const port = 3000; // Choose any available port you prefer
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
