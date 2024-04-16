const express = require('express');
const router = express.Router();
const connection = require('../database');
const multer=require('multer');
router.post('/addproduct', function(req, res) {
    const sql = "INSERT INTO Products (ProductName, ProductPrice, ProductDescription) VALUES (?, ?, ?)";
    const values = [
        req.body.pname,
        req.body.price,
        req.body.pdesc
    ];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding product:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const newProduct = {
            idproductinfo: result.insertId, // Use the inserted ID
            ProductName: req.body.pname,
            ProductPrice: req.body.price,
            ProductDescription: req.body.pdesc
        };
        return res.status(200).json({ message: 'Product added successfully', product: newProduct });
    });
});


router.put('/updateproduct/:id', function(req, res) {
    const productId = req.params.id;
    const { pname, price, pdesc } = req.body;
    const sql = "UPDATE Products SET ProductName = ?, ProductPrice = ?, ProductDescription = ? WHERE idproductinfo = ?";
    const values = [pname, price, pdesc, productId];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ message: 'Product updated successfully' });
    });
});
router.get('/allProducts', function(req, res) {
    const sql = "SELECT * FROM Products";
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
    const sql = "DELETE FROM Products WHERE idproductinfo = ?";
    
    connection.query(sql, [productId], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ message: 'Product deleted successfully',productId });
    });
});

module.exports = router;
