const app = require('express').Router();
const pool = require("../services/db");
const authorize = require("../client/src/middleware/authorization");

// Get customer if authorized
app.post("/", authorize, async (req, res) => {
    try {
    
      if(req.body.is_employee !== "false"){
        return res.status(400).send("You are not an employee");
     }

        const invoice = await pool.query("SELECT * FROM invoice WHERE customer_id_fk = ? AND order_status = 'cart'", [req.body.user_id]);

      res.json(invoice);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  app.put("/update_quantity", authorize, async (req, res) => {
    try {

       
        const {quantity} = req.body;
        const {invoice_item_id} = req.body;
        
        const invoice = await pool.query("UPDATE invoice_item SET quantity = ? WHERE invoice_item_id = ?", [quantity, invoice_item_id]);
    
      res.send(invoice);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


module.exports = app;