const app = require('express').Router();
const pool = require("../services/db")

// get all items
app.get("/view_all_markers", async (req, res) => {
    try {
        const all_markers = await pool.query("SELECT * FROM markerpoints");
        res.json(all_markers);
    } catch (err) {
        console.log(err.message);
    }
})

// get markers by userId
app.get("/view_user_markers/:userID", async (req, res) => {
    try {
        const { userID } = req.params;
        const all_user_markers = await pool.query("SELECT * FROM markerpoints WHERE user_id = ?", [userID]);

        res.json(all_user_markers);
    } catch (err) {
        console.log(err.message);
    }
})

// get markers by severity
app.get("/view_severity_markers/:severity", async (req, res) => {
    try {
        const { severity } = req.params;
        const all_severity_markers = await pool.query("SELECT * FROM markerpoints WHERE severity = ?", [severity]);

        res.json(all_severity_markers);
    } catch (err) {
        console.log(err.message);
    }
})

// get markers in date range


// post marker point
app.post("/create_point", async (req, res) => {
    try {


        const data = req.body;

        const newItem = await pool.query("INSERT INTO markerpoints(user_id, created_on, expires_after, latitude, longitude, description, severity) VALUES(?, NOW(), 0, ?, ?, ?, ?)",
            [data.user_id,
            data.latitude,
            data.longitude,
            data.description,
            data.severity,
            ]);

           
  

   
        res.json(data);
        


    } catch (err) {
        console.log(err.message);
    }
});



// update marker point by id (put)
app.put("/update_point/:marker_id", async (req, res) => {
    try {
        const { marker_id } = req.params;
        const data = req.body;

        const newItem = await pool.query("UPDATE markerpoints SET created_on = NOW(), latitude = ?, longitude = ?, description = ?, severity = ? WHERE id = ?",
            [data.latitude,
            data.longitude,
            data.description,
            data.severity,
                marker_id
            ]);

        res.json("A marker point was updated. Success");
    } catch (err) {
        console.log(err.message);
    }
});

// delete marker point by id
app.delete("/delete_point/:marker_id", async (req, res) => {
    try {
        const { marker_id } = req.params;
        const deleteCustomer = await pool.query("DELETE FROM markerpoints WHERE id = ?", [marker_id]);
        res.json("Marker point was deleted successfully");
    } catch (err) {
        console.log(err.message);
    }
});


module.exports = app;