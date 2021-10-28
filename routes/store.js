const app = require('express').Router();
const pool = require("../services/db")

// create a store
app.post("/create_store", async (req, res) => {
    try {
      const data  = req.body;
      console.log(data);
      const newStore = await pool.query("INSERT INTO store(store_name, location_location_id) VALUES ( ?, ?)",
       [data.store_name, 
        data.location_location_id
      ] );
      
      res.json("A new store was added. Success");
    }catch (err){
      console.log(err.message);
    }
  });

  // get all stores
app.get("/view_all_stores", async (req, res) => {
    try {
      const all_stores = await pool.query("SELECT * FROM store");
  
      res.json(all_stores);
    }catch (err) {
      console.log(err.message);
    }
  })

  // get store by id
app.get("/store/:store_id", async (req, res) => {
    try {
  
      const {store_id} = req.params;
  
      const store_by_id = await pool.query("SELECT * FROM store WHERE store_id = ?", [store_id]);
  
      res.json(store_by_id);
    }catch (err) {
      console.log(err.message);
    }
  })

  // Get store by location
  app.get("/store/location/:location_location_id", async (req, res) => {
    try {
  
      const {location_location_id} = req.params;
  
      const store_by_location_id = await pool.query("SELECT * FROM store WHERE location_location_id = ?", [location_location_id]);
  
      res.json(store_by_location_id);
    }catch (err) {
      console.log(err.message);
    }
  })

  // update a store
app.put("/store/:store_id", async (req, res) => {
    try {
      const {store_id} = req.params;
      const data  = req.body;

      const updateItem = await pool.query("UPDATE store SET store_name = ?, location_location_id = ? WHERE store_id = ?" , 
      [ data.store_name, 
        data.location_location_id,
        store_id
      ]);
      
      res.json("Store was updated successfully!");
    }catch (err) {
      console.log(err.message);
    }
});

// delete a customer by id
app.delete("/store/:store_id", async (req, res) => {
  try {
    const {store_id} = req.params;
    const deleteCustomer = await pool.query("DELETE FROM store WHERE store_id = ?", [store_id]);
    res.json("Store was deleted successfully");
  }catch (err) {
    console.log(err.message);
  }
});

module.exports = app;