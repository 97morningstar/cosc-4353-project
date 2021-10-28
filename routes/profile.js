const app = require('express').Router();
const pool = require("../services/db");
const authorize = require("../client/src/middleware/authorization");

// Get customer if authorized
app.post("/", authorize, async (req, res) => {
    try {
        console.log("info",req.body);
        
        const user = await pool.query("SELECT * FROM customer WHERE customer_id = ?", [req.body.user_id]);
        console.log("user",user);
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


module.exports = app;