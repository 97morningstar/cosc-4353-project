const app = require('express').Router();
const pool = require("../services/db");
const authorize = require("../client/src/middleware/authorization");

// Get customer if authorized
app.post("/", authorize, async (req, res) => {
    try {
    
      
        if(req.body.is_employee !== "true"){
           return res.status(400).send("You are not an employee");
        }
       /* const invoice = await pool.query("SELECT * FROM invoice WHERE customer_id_fk = ? AND order_status = 'cart'", [req.body.user_id]);
*/
      res.json("You have access");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });




module.exports = app;