const app = require('express').Router();
const pool = require("../services/db")

  // get all customers
app.get("/view_all_customer", async (req, res) => {
    try {
      const all_customers = await pool.query("SELECT * FROM customer");
      res.json(all_customers);
    }catch (err) {
      console.log(err.message);
    }
})

// get a customer by id
app.get("/customer/:id", async (req, res) => {
    try {
  
      const {id} = req.params;
  
      const customers_by_id = await pool.query("SELECT * FROM customer WHERE customer_id = ?", [id]);
  
      res.json(customers_by_id);
    }catch (err) {
      console.log(err.message);
    }
  })

  String.prototype.isNumber = function(){
    
    for(let i = 0; i < this.length; i++){
      if(this[i] < '0' || this[i] > '9'){
        return false;
      }
    }
    return true;
  
  }
  // update a customer by id
app.put("/customer/:id/:store_id_fk", async (req, res) => {
    try {
      const {id} = req.params;
      const {store_id_fk} = req.params;

      const data  = req.body;

      if(data.first_name == ""){
        const error = {
          first_name: "First Name can't be empty."
        }
       res.status(400).send(error);
      }else if(data.last_name == ""){
        const error = {
          last_name: "Last Name can't be empty."
        }
       res.status(400).send(error);
      }else if(data.middle_initial == ""){
        const error = {
          middle_initial: "Middle Initial can't be empty."
        }
       res.status(400).send(error);
      }else if(String(data.street_number).length == 0){
        const error = {
          street_number: "Street Number can't be empty."
        }
       res.status(400).send(error);
      }else if(data.street_name == ""){
        const error = {
          street_name: "Street Name can't be empty."
        }
       res.status(400).send(error);
      }else if(String(data.zip_code).length == 0){
        const error = {
          zip_code: "Zip Code can't be empty."
        }
       res.status(400).send(error);
      }else{

      const updateCustomer = await pool.query("UPDATE customer SET first_name = ?, middle_initial = ?, last_name = ?, street_number = ?, street_name = ?, zip_code = ?, date_of_birth = ?, is_member = ?, store_id_fk = ? WHERE customer_id = ?", 
      [ data.first_name, 
      data.middle_initial,
      data.last_name,
      data.street_number,
      data.street_name,
      data.zip_code,
      data.date_of_birth,
      data.is_member,
      store_id_fk,
      id,
      ]);
      
      res.json("Customer was updated successfully!");
    }
    }catch (err) {
      console.log(err.message);
    }
});

// delete a customer by id
app.delete("/customer/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const deleteCustomer = await pool.query("DELETE FROM customer WHERE customer_id = ?", [id]);
      res.json("Customer was deleted successfully");
    }catch (err) {
      console.log(err.message);
    }
});

module.exports = app;
