const express = require('express');
const router = express.Router();
const connectToDatabase = require('../database');
const connection = connectToDatabase();

router.get('/allOrders', function (req, res) {
    const sql = `
    SELECT Orders.ID , Orders.ProductId, Orders.Status, Orders.CustomerId AS OrderCustomerId, Orders.Date , Orders.Quantity, Orders.TotalBill, Product.Name AS ProductName, Customer.ID AS CustomerId, Customer.Name, Customer.Address, Customer.Contact
    FROM Orders
    INNER JOIN Product ON Orders.ProductId = Product.ID
    INNER JOIN Customer ON Orders.CustomerId = Customer.ID
    WHERE Orders.Status IN ('pending', 'approved')`;
    connection.query(sql, (err, orders) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        return res.status(200).json(orders);
    });
});

router.put('/approveOrder/:id', function (req, res) {
    const orderId = req.params.id;
    const sql = `
        UPDATE Orders
        SET Status = 'approved'
        WHERE ID = ? AND Status = 'pending'
    `;
    const selectSql = `
        SELECT Orders.*, Product.Name AS ProductName, Customer.*
        FROM Orders
        INNER JOIN Product ON Orders.ProductId = Product.ID
        INNER JOIN Customer ON Orders.CustomerId = Customer.ID
        WHERE Orders.ID = ?
    `;
    connection.query(sql, [orderId], (err, result) => {
        if (err) {
            console.error('Error updating order status:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found or status is not pending' });
        }
        connection.query(selectSql, [orderId], (err, updatedOrder) => {
            if (err) {
                console.error('Error fetching updated order:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            return res.status(200).json(updatedOrder[0]); // Return the updated order
        });
    });
});

router.put('/completeOrder/:id', function (req, res) {
    const orderId = req.params.id;
    const sql = `
        UPDATE Orders
        SET Status = 'completed'
        WHERE ID = ? AND Status = 'approved'
    `;
    const selectSql = `
        SELECT Orders.*, Product.Name AS ProductName, Customer.*
        FROM Orders
        INNER JOIN Product ON Orders.ProductId = Product.ID
        INNER JOIN Customer ON Orders.CustomerId = Customer.ID
        WHERE Orders.ID = ?
    `;
    connection.query(sql, [orderId], (err, result) => {
        if (err) {
            console.error('Error updating order status:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found or status is not pending' });
        }
        connection.query(selectSql, [orderId], (err, updatedOrder) => {
            if (err) {
                console.error('Error fetching updated order:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            return res.status(200).json(updatedOrder[0]); // Return the updated order
        });
    });
});

router.put('/rejectOrder/:id', function (req, res) {
    const orderId = req.params.id;
    const sql = `
    UPDATE Orders
    SET Status = 'rejected'
    WHERE ID = ? AND Status IN ('pending', 'approved')
    `;
    const selectSql = `
        SELECT Orders.*, Product.Name AS ProductName, Customer.*
        FROM Orders
        INNER JOIN Product ON Orders.ProductId = Product.ID
        INNER JOIN Customer ON Orders.CustomerId = Customer.ID
        WHERE Orders.ID = ?
    `;
    connection.query(sql, [orderId], (err, result) => {
        if (err) {
            console.error('Error updating order status:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found or status is not pending' });
        }
        connection.query(selectSql, [orderId], (err, updatedOrder) => {
            if (err) {
                console.error('Error fetching updated order:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            return res.status(200).json(updatedOrder[0]); // Return the updated order
        });
    });
});
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 since getMonth() returns 0-based index
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}router.get('/ordersByMonth', function (req, res) {
    // Get the current year and month
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Adding 1 since getMonth() returns 0-based index

    // Array to hold orders by month
    const ordersByMonth = [];

    // Loop through each month of the current year
    for (let month = 1; month <= currentMonth; month++) {
        // Get the first and last day of the month
        const firstDayOfMonth = new Date(currentYear, month - 1, 1); // Subtracting 1 to adjust month index
        const lastDayOfMonth = new Date(currentYear, month, 0); // Last day of previous month is last day of current month

        // Format first and last day of month for SQL query
        const firstDayFormatted = formatDate(firstDayOfMonth);
        const lastDayFormatted = formatDate(lastDayOfMonth);

        // Query to count orders for the current month
        const sql = `
        SELECT COUNT(*) AS orderCount
        FROM Orders
        WHERE Date >= ? AND Date <= ? AND Status = 'completed'
        `;
        
        connection.query(sql, [firstDayFormatted, lastDayFormatted], (err, result) => {
            if (err) {
                console.error('Error fetching order count for month:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // Push order count for current month to the array
            ordersByMonth.push({ month: month, orderCount: result[0].orderCount });

            // If this is the last month, send the response
            if (month === currentMonth) {
                return res.status(200).json(ordersByMonth);
            }
        });
    }
});

module.exports = router;