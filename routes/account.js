const app = require('express').Router();
const pool = require("../services/db");
const authorize = require("../client/src/middleware/authorization");

// Get customer if authorized
app.post("/get_account", authorize, async (req, res) => {
    try {
    
      if(req.body.is_employee !== "false"){
        return res.status(400).send("You are not an employee");
     }

        const payment = await pool.query("SELECT * FROM payment WHERE customer_id_fk = ? AND is_deleted = 0", [req.body.user_id]);

      res.json(payment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  app.put("/account/update_payment", authorize, async (req, res) => {
    try {
       
        const data = req.body;
        
        const payment = await pool.query("UPDATE payment SET card_number = ?, expiration_month = ?, expiration_year = ?, security_code = ? WHERE payment_id = ?", [
          data.card_number, 
          data.expiration_month,
          data.expiration_year,
          data.security_code,
          data.id
        ]);

        console.log("server",payment);


        const data2 = {
          card_number: data.card_number, 
          expiration_month: data.expiration_month,
          expiration_year: data.expiration_year,
          security_code: data.security_code,
          payment_id: data.id
        }
    
      res.send(data2);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  app.post("/account/add_payment", authorize, async (req, res) => {
    try {
       
        const data = req.body;
        
        const payments = await pool.query("INSERT INTO payment (card_number,expiration_month,expiration_year,security_code, customer_id_fk) VALUES (?,?,?,?,?)", [
          data.card_number, 
          data.expiration_month,
          data.expiration_year,
          data.security_code,
          data.user_id
        ]);

        const payment = await pool.query("SELECT * FROM payment WHERE customer_id_fk = ? AND is_deleted = 0", [req.body.user_id]);

      res.json(payment);
    
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


  app.put("/account/delete_payment/:id", authorize, async (req, res) => {
    try {
      const {id} = req.params;
        const data = req.body;
        console.log("why",data.id)
        
        const payments = await pool.query("UPDATE payment SET is_deleted = 1 WHERE payment_id = ?", [
          id
        ]);

        

       
      res.json("Payment Method deleted");
    
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


module.exports = app;