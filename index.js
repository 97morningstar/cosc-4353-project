
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const pool = require("./services/db")
const path = require("path");

// process.env.NODE_ENV => production or undefined




//middleware
app.use(cors());
app.use(express.json()); // allow us to access request body req.body

app.use(express.static(path.join(__dirname, "cosc-4353-frontend/build")));




// Deploy
/*if (process.env.NODE_ENV === 'production') {
    //serve static content
  //npm run build
	app.use(express.static('client/build'));
}*/


app.use("/api", require("./routes/marker"));


//routes
/*
app.use("/auth", require("./client/src/routes/jwtAuth"));
app.use("/api", require("./routes/customer")); 
app.use("/api", require("./routes/item"));
app.use("/api", require("./routes/store"));
app.use("/api", require("./routes/search"));
app.use("/api", require("./routes/employee"));
app.use("/api", require("./routes/invoice"));
app.use("/api", require("./routes/invoice_item"));*/
/* Register Protect routes */
/*app.use("/get_profile", require("./routes/profile"));
app.use("/get_cart", require("./routes/cart"));
app.use("/get_dashboard", require("./routes/dashboard"));

app.use("/", require("./routes/invoice_item_cart"));
app.use("/", require("./routes/order_history"));
app.use("/", require("./routes/inventory"));
app.use("/", require("./routes/account"));

app.use("/", require("./routes/report_3"));
app.use("/", require("./routes/report_customer"));
app.use("/", require("./routes/report_profit"));
*/



/* Do not move from here */
app.get('*', (request, response) => {
  console.log(__dirname+'/cosc-4353-frontend/build'+'/'+'index.html')
	response.sendFile(path.join(__dirname, 'cosc-4353-frontend/build', 'index.html'));
});


/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error("error",err.message, err.stack);
  res.status(statusCode).json({'message': err.message});


  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

