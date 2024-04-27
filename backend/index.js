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
app.use("/", router);

const port = 3000; // Choose any available port you prefer
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = router;
