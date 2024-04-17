const connection = require("./database");
const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
// Middleware
app.use(cors());
app.use(express.json());

router.get("/getProducts", function (req, res) {
  const sql = "SELECT * FROM Product";
  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.status(200).json({ products: result }); // Corrected response
  });
});

// Import and use routes
app.use('/Product', require('./AdminRoutes/ProductRoutes'));
app.use('/', router);

const port = 3000; // Choose any available port you prefer
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});