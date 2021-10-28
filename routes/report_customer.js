const app = require('express').Router();
const pool = require("../services/db");
const authorize = require("../client/src/middleware/authorization");

// Get customer if authorized
app.post("/get_all_customers_by_time_frame", authorize, async (req, res) => {
    try {
    
      if(req.body.is_employee !== "true"){
        return res.status(400).send("You are not a customer");
     }
        const {start_date} = req.body;
        const {end_date} = req.body;
        const {store_id_fk} = req.body;
        const customers_in_timeframe = await pool.query("SELECT * FROM customer,store WHERE join_date <= ? AND join_date >= ? AND store_id = store_id_fk  AND store_id_fk LIKE CONCAT('%',?,'%') ", 
        [
            end_date,
            start_date,
            store_id_fk
        ]);

      res.json(customers_in_timeframe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  // Get customer if authorized
app.post("/get_amount_of_customers_by_time_frame", authorize, async (req, res) => {
  try {
  
    if(req.body.is_employee !== "true"){
      return res.status(400).send("You are not a customer");
   }
   const {start_date} = req.body;
   const {end_date} = req.body;

const end = end_date;
const start = start_date;

   const {store_id_fk} = req.body;
      const amount_of_customers = await pool.query("SELECT COUNT(customer_id) as total, DATEDIFF(?,?) as diff FROM customer WHERE join_date <= ? AND join_date >= ? AND store_id_fk LIKE CONCAT('%',?,'%')", [
        end,
        start,
        end_date,
        start_date,
        store_id_fk
      ]);

    res.json(amount_of_customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



  // Get customer if authorized
  app.post("/get_total_amont_of_customers", authorize, async (req, res) => {
    try {
    
      if(req.body.is_employee !== "true"){
        return res.status(400).send("You are not a customer");
     }
  
     const {store_id_fk} = req.body;
        const amount_of_customers = await pool.query("SELECT COUNT(customer_id) as total FROM customer", [
        ]);
  
      res.json(amount_of_customers);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


module.exports = app;