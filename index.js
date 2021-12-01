
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const pool = require("./services/db")
const path = require("path");
const socket = require("socket.io");




//middleware/*
app.use(cors());
app.use(express.json()); /// allow us to access request body req.body*/

app.use(express.static(path.join(__dirname, "client/build")));


// Deploy - Do not delete
/*if (process.env.NODE_ENV === 'production') {
    //serve static content
  //npm run build
	app.use(express.static('client/build'));
}*/


app.use("/api", require("./routes/marker"));


const students = ["Elie", "Matt", "Joel", "Michael"];

app.get("/get", (req, res) => {
  return res.json(students);
});


/* Do not move from here */
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error("error",err.message, err.stack);
  res.status(statusCode).json({'message': err.message});


  return;
});

/*
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
*/



module.exports = app;