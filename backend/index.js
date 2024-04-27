const connection = require("./database");
const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const querystring = require("querystring");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchUser = require("./middleware/fetchUser");
const jwtSecret = require("./jwtSecret");

// Middleware
app.use(cors());

app.use(express.json());
const connection = connectToDatabase();

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


app.get("/search", (req, res) => {
  let query = req.query.q;
  let keywords = query.split(" ");

  keywords = keywords.map((keyword) => querystring.unescape(keyword));

  let sql = "SELECT * FROM Product WHERE ";
  keywords.forEach((keyword, index) => {
    if (index > 0) {
      sql += " OR ";
    }
    sql +=
      "Name LIKE '%" + keyword + "%' OR Description LIKE '%" + keyword + "%'";
  });

  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.status(200).json({ product: result });
  });
});


router.post(
  "/signup",
  check("email", "Email Length Error").isEmail().isLength({ min: 5, max: 30 }),
  check("password", "Password Length 10 - 20").isLength({ min: 5, max: 15 }),
  async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      // for admin
      const sql =
        "INSERT INTO User(`Name`, `Email`, `Password`, `Address`, `Contact`,`Admin`) VALUES (?, ?, ?, ?, ?,'No')";
      const values = [
        req.body.name,
        req.body.email,
        hashedPassword,
        req.body.address,
        req.body.contact,
      ];

      connection.query(sql, values, (err) => {
        if (err) {
          console.error("Error during signup:", err);
          return res.status(500).json({ error: "Error during signup" });
        }

        return res
          .status(200)
          .json({ message: "User registered successfully" });
      });
    } catch (error) {
      console.error("Error during signup:", error);
      return res.status(500).json({ error: "Error during signup" });
    }
  }
);


router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  router.post("/PlaceOrder", async (req, res) => {
  try {
    const productId = req.body.productId;
    const customerId = req.body.customerId;
    const quantity = req.body.quantity;
    const totalBill = req.body.totalBill;

    // Check if a row with the same ProductId and Status exists
    const checkIfExistsQuery = "SELECT * FROM Orders WHERE ProductId = ? AND Status = 'pending'";
    connection.query(checkIfExistsQuery, [productId], (err, result) => {
      if (err) {
        console.error("Error checking if order exists:", err);
        return res.status(500).json({ error: "Error checking if order exists" });
      }

      if (result.length > 0) {
        // If the row exists, update the existing row
        const existingQuantity = result[0].Quantity;
        const existingTotalBill = result[0].TotalBill;
        const updatedQuantity = existingQuantity + quantity;
        const updatedTotalBill = existingTotalBill + totalBill;
        const updateOrderQuery = "UPDATE Orders SET Quantity = ?, TotalBill = ? WHERE ProductId = ? AND Status = 'pending'";
        connection.query(updateOrderQuery, [updatedQuantity, updatedTotalBill, productId], (updateErr) => {
          if (updateErr) {
            console.error("Error updating order:", updateErr);
            return res.status(500).json({ error: "Error updating order" });
          }
          return res.status(200).json({ message: "Order updated successfully" });
        });
      } else {
        // If the row doesn't exist, insert a new row
        const insertOrderQuery = "INSERT INTO Orders (ProductId, Status, CustomerId, Date, Review, Quantity, TotalBill) VALUES (?, 'pending', ?, NULL, NULL, ?, ?)";
        connection.query(insertOrderQuery, [productId, customerId, quantity, totalBill], (insertErr) => {
          if (insertErr) {
            console.error("Error inserting order:", insertErr);
            return res.status(500).json({ error: "Error inserting order" });
          }
          return res.status(200).json({ message: "Order inserted successfully" });
        });
      }
    });

  } catch (error) {
    console.error("Error during Place Order:", error);
    return res.status(500).json({ error: "Error during Place Order" });
  }
});


router.post("/getOrders", async (req, res) => {
  try {
    const productId = req.body.productId;
    const customerId = req.body.customerId;

    // Check if customerId and/or productId are provided
    if (!customerId && !productId) {
      return res.status(400).json({ error: "customerId or productId required" });
    }

    // Construct the SQL query to retrieve orders based on customerId and productId
    let sql = "SELECT * FROM Orders WHERE 1=1"; // Placeholder condition
    const queryParams = [];

    if (customerId) {
      sql += " AND CustomerId = ?";
      queryParams.push(customerId);
    }
    if (productId) {
      sql += " AND ProductId = ?";
      queryParams.push(productId);
    }

    // Execute the SQL query with dynamic conditions
    connection.query(sql, queryParams, (err, result) => {
      if (err) {
        console.error("Error retrieving orders:", err);
        return res.status(500).json({ error: "Error retrieving orders" });
      }
      return res.status(200).json({ orders: result });
    });

  } catch (error) {
    console.error("Error retrieving orders:", error);
    return res.status(500).json({ error: "Error retrieving orders" });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM User WHERE Email = ?";
  connection.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ error: "Error during login" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = results[0];
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.Password, salt);
    const hashedPassword=user.Password;

    try {
   
      const passwordMatch = await bcrypt.compare(password, hashedPassword);
      if (passwordMatch) {
        const PayLoad = {
          user: {
            email: email,
          },
        };

        const expirationTime = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
        // Sign the JWT token with the payload and expiration time
        const token = jwt.sign({ ...PayLoad, exp: expirationTime }, jwtSecret);
        const payload = {
          user: {
            id: user.ID
          }
        };

        // Generate JWT token
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '7d' });

        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      console.error("Error during password comparison:", error);
      return res.status(500).json({ error: "Error during login" });
    }
  });
});

router.post("/getUser", fetchUser, async (req, res) => {
  const email = req.user.email;
  const sql = "SELECT * FROM User WHERE Email = ?";
  connection.query(sql, [email], async (err, results) => {

router.post('/getUser',fetchUser, async (req, res) => {

  const id =req.user.id;
  const sql = "SELECT * FROM User WHERE ID = ?";
  connection.query(sql, [id], async (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ error: "Error during login" });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }
    const user = results[0];
    try {
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal ServerError 3" });
    }
  });
});

// Import and use routes
app.use("/Product", require("./AdminRoutes/ProductRoutes"));
app.use("/Orders", require("./AdminRoutes/OrderRoutes"));
app.use("/", router);


router.post("/addToCart", [], async function (req, res) {
  const { customerId, productId, quantity } = req.body;
  
  // Check if the product already exists in the cart
  const checkIfExistsQuery = "SELECT * FROM Cart WHERE ProductId = ? AND CustomerId = ?";
  connection.query(checkIfExistsQuery, [productId, customerId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length > 0) {
      // If the product exists, update the quantity
      const updateQuantityQuery = "UPDATE Cart SET Quantity = Quantity + ? WHERE ProductId = ? AND CustomerId = ?";
      connection.query(updateQuantityQuery, [quantity, productId, customerId], (updateErr) => {
        if (updateErr) {
          console.error(updateErr);
          return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Cart updated successfully" });
      });
    } else {
      // If the product doesn't exist, insert a new row
      const insertItemQuery = "INSERT INTO Cart (CustomerId, ProductId, Quantity) VALUES (?, ?, ?)";
      connection.query(insertItemQuery, [customerId, productId, quantity], (insertErr) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Item added to cart successfully" });
      });
    }
  });
});


router.post("/getCartItem", async function (req, res) {
  const { customerId } = req.body;

  // Check if customerId is provided
  if (!customerId) {
    return res.status(400).json({ error: "customerId required" });
  }

  try {
    // Retrieve all cart items for the given customerId
    const cartSql = "SELECT * FROM Cart WHERE CustomerId = ?";
    const cartResult = await new Promise((resolve, reject) => {
      connection.query(cartSql, [customerId], (cartErr, cartResult) => {
        if (cartErr) {
          console.error(cartErr);
          reject({ error: "Internal server error" });
        }
        resolve(cartResult);
      });
    });

    // If no cart items found for the customerId
    if (cartResult.length === 0) {
      return res.status(404).json({ error: "No items found in the cart for the given customerId" });
    }

    // Array to store cart items with product details
    const cartItemsWithDetails = [];

    // Iterate through each cart item
    for (const cartItem of cartResult) {
      // Retrieve product details for the cart item
      const productSql = "SELECT * FROM Product WHERE ID = ?";
      const productResult = await new Promise((resolve, reject) => {
        connection.query(productSql, [cartItem.ProductId], (productErr, productResult) => {
          if (productErr) {
            console.error(productErr);
            reject({ error: "Internal server error" });
          }
          resolve(productResult[0]); // Assuming only one product will match the ID
        });
      });

      // Add quantity from the cart to product details
      const cartQuantity = cartItem.Quantity;
      const productWithQuantity = { ...productResult, cartQuantity };

      // Add the product with quantity to the array
      cartItemsWithDetails.push(productWithQuantity);
    }

    // Send the response
    if (cartItemsWithDetails.length === 0) {
      return res.status(404).json({ error: "No cart items with product details found for the given customerId" });
    }
    return res.status(200).json({ cartItemsWithDetails });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/cancelOrder", async (req, res) => {
  try {
    const { customerId, productId, status } = req.body;
    console.log("B C I ", customerId);
    console.log("B p I ", productId);
    console.log("Status: ", status);

    // Check if customerId, productId, and status are provided
    if (!customerId || !productId || !status) {
      return res.status(400).json({ error: "customerId, productId, and status are required" });
    }

    // Check if the status is valid
    if (status !== "pending" && status !== "approved") {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Check the current status of the order
    connection.query(
      "SELECT Status FROM Orders WHERE customerId = ? AND productId = ? AND Status = ?",
      [customerId, productId, status],
      (err, result) => {
        if (err) {
          console.error("Error checking order status:", err);
          return res.status(500).json({ error: "Error cancelling order" });
        }

        if (result.length === 0) {
          return res.status(404).json({ error: "Order not found" });
        }

        // Update the order status to 'cancelled' in the Orders table
        connection.query(
          "UPDATE Orders SET Status = 'cancelled' WHERE customerId = ? AND productId = ? AND Status = ?",
          [customerId, productId, status],
          (err, result) => {
            if (err) {
              console.error("Error cancelling order:", err);
              return res.status(500).json({ error: "Error cancelling order" });
            }
            return res.status(200).json({ message: "Order cancelled successfully" });
          }
        );
      }
    );
  } catch (error) {
    console.error("Error cancelling order:", error);
    return res.status(500).json({ error: "Error cancelling order" });
  }
});


router.post("/deleteCartItem", async function (req, res) {
  const { customerId, productId } = req.body;

  // Check if customerId and productId are provided
  if (!customerId || !productId) {
    return res.status(400).json({ error: "customerId and productId required" });
  }

  // Delete the specific item from Cart table for the given customerId and productId
  const sql = "DELETE FROM Cart WHERE CustomerId = ? AND ProductId = ?";
  connection.query(sql, [customerId, productId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item not found in the cart" });
    }
    return res.status(200).json({ success: true, message: "Cart item deleted successfully" });
  });
});


router.post("/CurrentOrders", async (req, res) => {
  try {
    const userId = req.body.customerId;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ error: "userId required" });
    }

    // Construct the SQL query to retrieve orders and product details based on userId
    const ordersQuery = `
      SELECT Orders.*, Product.*, Orders.Quantity AS OrderQuantity
      FROM Orders
      JOIN Product ON Orders.ProductId = Product.ID
      WHERE Orders.CustomerId = ?
    `;

    // Execute the SQL query with dynamic conditions
    connection.query(ordersQuery, [userId], (err, orders) => {
      if (err) {
        console.error("Error retrieving current orders:", err);
        return res.status(500).json({ error: "Error retrieving current orders" });
      }

      // If no orders found for the given userId
      if (orders.length === 0) {
        return res.status(404).json({ message: "No orders found for the given userId" });
      }

      return res.status(200).json({ currentOrders: orders });
    });

  } catch (error) {
    console.error("Error retrieving current orders:", error);
    return res.status(500).json({ error: "Error retrieving current orders" });
  }
});

const port = 3000; // Choose any available port you prefer
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = router;