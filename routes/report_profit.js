const app = require('express').Router();
const pool = require("../services/db");
const authorize = require("../client/src/middleware/authorization");

// Get customer if authorized
app.post("/get_all_invoices_by_time_frame", authorize, async (req, res) => {
    try {
    
      if(req.body.is_employee !== "true"){
        return res.status(400).send("You are not a customer");
     }
        const {start_date} = req.body;
        const {end_date} = req.body;
        const {store_id_fk} = req.body;
        const customers_in_timeframe = await pool.query("SELECT invoice_id,time_of_transaction,total_cost_after_tax,total_manufacture_cost,store_name FROM invoice,store WHERE time_of_transaction <= ? AND time_of_transaction >= ? AND store_id_fk LIKE CONCAT('%',?,'%') AND store_id_fk = store_id ", 
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
app.post("/get_sales_info_by_time_frame",authorize ,async (req, res) => {
  try {
  
    if(req.body.is_employee !== "true"){
      return res.status(400).send("You are not a customer");
   }
   const {start_date} = req.body;
   const {end_date} = req.body;

const end = end_date;
const start = start_date;

   const {store_id_fk} = req.body;
      const amount_of_customers = await pool.query("SELECT  COUNT(total_cost_after_tax) as amount_of_sales, AVG(total_cost_after_tax) as avg_cost, SUM(total_cost_after_tax) as total_cost, SUM(total_cost_after_tax - total_manufacture_cost) as profit, SUM(total_manufacture_cost) as total_manufacture_cost, DATEDIFF(?,?) as diff FROM invoice WHERE time_of_transaction <= ? AND time_of_transaction >= ? AND store_id_fk LIKE CONCAT('%',?,'%') ", [
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
app.post("/get_total_sales_info", authorize,async (req, res) => {
    try {
    
      if(req.body.is_employee !== "true"){
        return res.status(400).send("You are not a customer");
     }
     const {store_id_fk} = req.body;
        const amount_of_customers = await pool.query("SELECT  COUNT(total_cost_after_tax) as amount_of_sales, AVG(total_cost_after_tax) as avg_cost, SUM(total_cost_after_tax) as total_cost, SUM(total_cost_after_tax - total_manufacture_cost) as profit, SUM(total_manufacture_cost) as total_manufacture_cost FROM invoice", [

        ]);
  
      res.json(amount_of_customers);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

module.exports = app;