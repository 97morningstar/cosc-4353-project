const app = require('express').Router();
const pool = require("../services/db");


app.get("/item/search/:name", async (req, res) => {
    try {
  
      const {name} = req.params;
       
      const items_by_name = await pool.query("SELECT * FROM item WHERE name LIKE CONCAT('%',?,'%')", [name]);
      console.log(items_by_name, name);
      res.json(items_by_name);
    }catch (err) {
      console.log(err.message);
    }
  })


module.exports = app;