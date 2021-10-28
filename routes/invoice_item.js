const app = require('express').Router();
const pool = require("../services/db")



//update quantity 
app.put("/invoice_item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updateQuantity = await pool.query("UPDATE invoice_item SET quantity = ? WHERE invoice_item_id = ? ",
      [
        data.quantity,
        id
      ]);

    res.json("Quantity was updated successfully!");
  } catch (err) {
    console.log(err.message);
  }
});


//get invoice_item by invoice_item_id
app.get("/invoice_item_hi/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const allInvoiceitem = await pool.query("SELECT * FROM invoice_item WHERE invoice_item_id = ?", [id]);

    res.json(allInvoiceitem);
  } catch (err) {
    console.log(err.message);
  }
});
//get invoice_item by invoice id
app.get("/fullInvoice/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const allInvoiceitem = await pool.query("SELECT * FROM invoice_item WHERE invoice_id_fk = ?", [id]);

    res.json(allInvoiceitem);
  } catch (err) {
    console.log(err.message);
  }
});
//Delete invoice item by id
app.delete("/api/invoice_item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("item_id",id);
    const updateQuantity = await pool.query("UPDATE invoice_item SET quantity = 0 WHERE invoice_item_id = ?", [id]);
    const deleteInvoiceitem = await pool.query("DELETE FROM invoice_item WHERE invoice_item_id = ?", [id]);
    res.json("item was deleted successfully");
  } catch (err) {
    console.log(err.message);
  }
});


//Create new invoice_item 
app.post("/create_invoice_item", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    // const checkItem = await pool.query("SELECT * FROM invoice_item WHERE invoice_id_fk = ? AND item_id_fk = ?", [data.invoice_id_fk, data.item_id_fk]);
    //console.log(checkItem.length);
    /*
    if (checkItem.length != 0) {
      const updateInvoiceitem = await pool.query("UPDATE invoice_item SET quantity = ? WHERE invoice_id_fk = ? AND item_id_fk = ?", [data.quantity, data.invoice_id_fk, data.item_id_fk]);
      res.json("An invoice_item was been successfully updated.");
    }
    else {
      const newInvoiceitem = await pool.query("INSERT INTO invoice_item( quantity, item_id_fk, invoice_id_fk) VALUES ( ?, ?, ?)",
        [,
          data.quantity,
          data.item_id_fk,
          data.invoice_id_fk
        ]);
      res.json("A new invoice_item was been successfully added.");
      
    }
    */
  } catch (err) {
    console.log(err.message);
  }
});



module.exports = app;
