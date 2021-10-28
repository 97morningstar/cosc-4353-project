const app = require('express').Router();
const pool = require("../services/db")


// get all items
app.get("/view_all_markers", async (req, res) => {
  try {
    const all_markers = await pool.query("SELECT * FROM markerpoints");

    res.json(all_markers);
  }catch (err) {
    console.log(err.message);
  }
})



module.exports = app;