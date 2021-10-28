const app = require('express').Router();
const pool = require("../services/db")
const authorize = require("../client/src/middleware/authorization");
// create an item
app.post("/create_item", async (req, res) => {
    try {
      const data  = req.body;
      
      const newItem = await pool.query("INSERT INTO item(name, manufacture_cost, selling_price, category, brand, discount) VALUES ( ?, ?, ?, ?, ?, ?)",
       [data.name, 
        data.manufacture_cost,
        data.selling_price,
        data.category,
        data.brand,
        data.discount
      ] );
      
      res.json("A new item was added. Success");
    }catch (err){
      console.log(err.message);
    }
  });

  // get all items
app.get("/view_all_items", async (req, res) => {
    try {
      const all_items = await pool.query("SELECT * FROM item, store_has_item WHERE store_has_item.item_id=item.item_id AND store_has_item.quantity > 0");
  
      res.json(all_items);
    }catch (err) {
      console.log(err.message);
    }
  })

app.post("/view_all_inventories", authorize ,async (req,res) => {
  try {
    const all_items = await pool.query("SELECT item.item_id,item.name,item.category,item.brand,item.selling_price,item.manufacture_cost,item.discount, store_has_item.store_id, warehouse_has_item.warehouse_id,store.store_name,store_has_item.quantity as storeQuantity,warehouse.warehouse_name,warehouse_has_item.quantity as warehouseQuantity FROM item,store_has_item,warehouse_has_item,store,warehouse WHERE item.item_id = warehouse_has_item.item_id AND item.item_id = store_has_item.item_id AND store.store_id = store_has_item.store_id AND warehouse.warehouse_id = warehouse_has_item.warehouse_id AND warehouse.store_store_id = store.store_id ORDER BY item.item_id,store.store_name ASC");

    res.json(all_items);
  }catch (err) {
    console.log(err.message);
  }
})
  // get item by id
app.get("/item/:item_id", async (req, res) => {
    try {
  
      const {item_id} = req.params;
     
      const item_by_id = await pool.query("SELECT * FROM item WHERE item_id = ?", [item_id]);
  
      res.json(item_by_id);
    }catch (err) {
      console.log(err.message);
    }
  })
  
  // get items by category
app.get("/item/category/:category", async (req, res) => {
    try {
  
      const {category} = req.params;
  
      const items_by_category = await pool.query("SELECT * FROM item WHERE category = ?", [category]);
  
      res.json(items_by_category);
    }catch (err) {
      console.log(err.message);
    }
  })


  // update an item
app.put("/item/:item_id", async (req, res) => {
    try {
      const {item_id} = req.params;
      const data  = req.body;
      console.log(item_id);
      const updateItem = await pool.query("UPDATE item SET name = ?, manufacture_cost = ?, selling_price = ?, category = ?, brand = ?, discount = ? WHERE item_id = ?" , 
      [ data.name,
        data.manufacture_cost,
        data.selling_price,
        data.category,
        data.brand,
        data.discount,
        item_id
      ]);
     
      var invoiceIdCarts = await pool.query("SELECT invoice_id FROM invoice WHERE order_status = 'cart'");
     
      for (i = 0; i < invoiceIdCarts.length; i++){
        var updateCorrespondingInvoiceItems = await pool.query("UPDATE invoice_item SET total_cost = 0 WHERE item_id_fk = ? AND invoice_id_fk = ? ",
        [item_id,
        invoiceIdCarts[i].invoice_id
      ]);
      }
      //this makes sure that all the carts have their cost's modified if their item was affected
      console.log("Item was updated successfully!");
      res.json("Item was updated successfully!");
    }catch (err) {
      console.log(err.message);
    }
});

module.exports = app;