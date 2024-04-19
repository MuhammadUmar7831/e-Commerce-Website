const express = require('express');
const router = express.Router();
const connectToDatabase = require('../database');
const connection = connectToDatabase();
const multer=require('multer');
router.post('/addproduct', function(req, res) {
    const sql = "INSERT INTO Product (Name, Price, Description,Quantity) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.pname,
        req.body.price,
        req.body.pdesc,
        req.body.pquantity,
    ];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding product:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const newProduct = {
            ID: result.insertId, // Use the inserted ID
            Name: req.body.pname,
            Price: req.body.price,
            Description: req.body.pdesc,
            Quantity:req.body.pquantity
        };
        return res.status(200).json({ message: 'Product added successfully', product: newProduct });
    });
});


router.put('/updateproduct/:id', function(req, res) {
    const productId = req.params.id;
    const sql = "UPDATE Product SET Name = ?, Price = ?, Quantity = ?, Description = ? WHERE ID = ?";
    const values = [
        req.body.pname,
        req.body.price,
        req.body.pquantity,
        req.body.pdesc,
        productId,
    ];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ message: 'Product updated successfully',values });
    });
});

router.get('/allProducts', function(req, res) {
    const sql = "SELECT * FROM Product";
    connection.query(sql, (err, products) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json(products);
    });
});
router.delete('/deleteProduct/:id', function(req, res) {
    const productId = req.params.id;
    const sql = "DELETE FROM Product WHERE ID = ?";
    
    connection.query(sql, [productId], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ message: 'Product deleted successfully',productId });
    });
});

module.exports = router;
