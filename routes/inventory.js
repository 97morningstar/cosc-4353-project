const app = require('express').Router();
const pool = require("../services/db");
const authorize = require("../client/src/middleware/authorization");

  app.put("/inventory/update_item", async (req, res) => {
    try {
       
        const {name} = req.body;
        const {manufacture_cost} = req.body;
        const {selling_price} = req.body;
        const {brand} = req.body;
        

        const {category} = req.body;

        const {discount} = req.body;
        const {item_id} = req.body; 
        
        const invoice = await pool.query("UPDATE item SET name=?,manufacture_cost=?,selling_price=?,category=?,brand=?,discount=? WHERE item_id=?", 
        [name, 
         manufacture_cost,
         selling_price,
         category,
         brand,
         discount,
         item_id
        ]);
    
      res.send(invoice);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


  app.put("/inventory/update_quantity", async (req, res) => {
    try {
       
        const {item_id} = req.body; 
        
        const quantity_store = await pool.query("UPDATE store_has_item SET quantity=0 WHERE store_has_item.item_id = ?", 
        [
         item_id
        ]);

        const quantity_warehouse = await pool.query("UPDATE warehouse_has_item SET quantity=0 WHERE warehouse_has_item.item_id = ?", 
        [
         item_id
        ]);
    
      res.send("Success");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  app.put("/inventory/restock_store", async (req, res) => {
    try {
       
        const {item_id} = req.body; 
        const {store_id} = req.body;
        
        const quantity_store = await pool.query("UPDATE store_has_item SET quantity=50 WHERE store_has_item.item_id = ? AND store_has_item.store_id = ?", 
        [
         item_id,
         store_id
        ]);
      res.send("Success");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  app.put("/inventory/restock_warehouse", async (req, res) => {
    try {
       
        const {item_id} = req.body; 
        const {warehouse_id} = req.body;
        const quantity_warehouse = await pool.query("UPDATE warehouse_has_item SET quantity=1000 WHERE warehouse_has_item.item_id = ? AND warehouse_has_item.warehouse_id =?", 
        [
         item_id,
         warehouse_id
        ]);
    
      res.send("Success");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });



module.exports = app;