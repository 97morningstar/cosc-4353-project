const app = require('express').Router();
const pool = require("../services/db");
const authorize = require("../client/src/middleware/authorization");
const bcrypt = require("bcrypt")
const validInfo = require("../client/src/middleware/validInfo");

  // get all customers
app.post("/view_all_employee", authorize, async (req, res) => {
    try {
      const all_customers = await pool.query("SELECT * FROM employee");
      res.json(all_customers);
    }catch (err) {
      console.log(err.message);
    }
})

app.post("/employee/create_employee", async (req, res) => {
  try {
    const data  = req.body;
    console.log(data)

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    //console.log(data.email);

    const bcryptPassword = await bcrypt.hash(data.password,salt);


    const newEmployee = await pool.query("INSERT INTO `employee`(`first_name`, `middle_initial`, `last_name`, `employment_date`, `date_of_birth`, `email`, `password`, `salary`, `street_number`, `street_name`, `city`, `zip_code`, `phone_number`, `store_store_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      data.first_name,
      data.middle_initial,
      data.last_name,
      data.employment_date,
      data.date_of_birth,
      data.email,
      bcryptPassword,
      data.salary,
      data.street_number,
      data.street_name,
      data.city,
      data.zip_code,
      data.phone_number,
      data.store_store_id
    ]);
    res.json(newEmployee);
  }catch (err) {
    console.log(err.message);
  }
})

// get a employee by id
app.get("/employee/:id", async (req, res) => {
    try {
  
      const {id} = req.params;
  
      const employee_by_id = await pool.query("SELECT * FROM employee WHERE employee_id = ?", [id]);
  
      res.json(employee_by_id);
    }catch (err) {
      console.log(err.message);
    }
  })

  // update a customer by id
app.put("/employee/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const data  = req.body;
      console.log(id)

      const updateEmployee = await pool.query("UPDATE employee SET first_name = ?, middle_initial = ?, last_name = ?, email = ?, phone_number=?, salary=?, street_number = ?, street_name = ?, city = ?, zip_code = ? WHERE employee_id = ? ", 
      [ data.first_name, 
      data.middle_initial,
      data.last_name,
      data.email,
      data.phone_number,
      data.salary,
      data.street_number,
      data.street_name,
      data.city,
      data.zip_code,
      id
      ]);
      
      res.json("Employee was updated successfully!");
    }catch (err) {
      console.log(err.message);
    }
});

// delete a customer by id
app.delete("/delete/employee/:id", async (req, res) => {
    try {
      const {id} = req.params;
      console.log(id)
      const deleteEmployee = await pool.query("DELETE FROM employee WHERE employee_id = ?", [id]);
      res.json("Employee was deleted successfully");
    }catch (err) {
      console.log(err.message);
    }
});

module.exports = app;
