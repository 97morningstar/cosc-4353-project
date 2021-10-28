const app = require('express').Router();
const pool = require("../services/db");
const authorize = require("../client/src/middleware/authorization");

// Get customer if authorized
app.post("/order_history", authorize, async (req, res) => {
  try {

    console.log(req.body.user_id)

    const invoice = await pool.query("SELECT * FROM invoice INNER JOIN store ON invoice.store_id_fk = store.store_id WHERE customer_id_fk = ? AND order_status != 'cart'", [req.body.user_id]);
    const invoice_items = await pool.query("SELECT * FROM invoice INNER JOIN invoice_item ON invoice.invoice_id = invoice_item.invoice_id_fk INNER JOIN item ON invoice_item.item_id_fk = item.item_id WHERE invoice.customer_id_fk = ? AND invoice.order_status != 'cart'", [req.body.user_id]);

    const invoices = [];
    invoice.map((index, i) => {
      const itemsArray = [];

      invoice_items.map((items, j) => {
        if (items.invoice_id_fk === index.invoice_id) {
          itemsArray.push(items)
        }
      })
      index.array = itemsArray;
      invoices.push(index);
    })

    res.json(invoices);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



module.exports = app;