const app = require('express').Router();
const pool = require("../services/db")


// invoice 

//view all invoice
app.get("/view_all_invoice", async (req, res) => {
    try {
        const all_invoice = await pool.query("SELECT * FROM invoice");
        res.json(all_invoice);
    } catch (err) {
        console.log(err.message);
    }
})
app.get("/view_all_purchases", async (req, res) => {
    try {
        const all_invoice = await pool.query("SELECT * FROM invoice WHERE order_status <> 'cart'");
        res.json(all_invoice);
    } catch (err) {
        console.log(err.message);
    }
})


//get all items in order_status =  'cart'
app.get("/cart/:id", async (req, res) => {
    try {

        const { id } = req.params;

        const Cart = await pool.query("SELECT * FROM invoice WHERE order_status = 'cart' AND invoice_id = ?", [id]);

        res.json(Cart);
    } catch (err) {
        console.log(err.message);
    }
});




// create new invoice 
app.post("/create_invoice", async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        var time_of_transaction = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes();
        const newInvoice = await pool.query("INSERT INTO invoice(total_cost, time_of_transaction, order_status, payment_id_fk, customer_id_fk, store_id_fk) VALUES ( ?, ?, ?, ?, ?, ?)",
            [data.total_cost,
            time_of_transaction,
            data.order_status,
            data.payment_id_fk,
            data.customer_id_fk,
            data.store_id_fk,
            ]);

        res.json("A new invoice was successfully added. ");
    } catch (err) {
        console.log(err.message);
    }
});






// delete [when the employee clicks on button 'DELETE'] ?
app.delete("/invoice/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteInvoice = await pool.query("DELETE FROM invoice WHERE invoice_id = ?", [id]);
        res.json("Invoice was successfully deleted !");
    } catch (err) {
        console.log(err.message);
    }
});

// Update order status to refunded (problem here, check to see if order_status = 'purchased' and need the use of id) TWO PARAMETERS 
//needs testing
app.put("/refund/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pool.query("SELECT * FROM invoice WHERE invoice_id = ?", [id]);
        console.log(data[0].order_status);

        if (data[0].order_status == "cart") {
            const error = {
                ERROR: "Return cannot be done!"
            }
            res.status(400).send(error);
        }

        const updateInvoiceitem = await pool.query("UPDATE invoice SET order_status = 'refunded' WHERE invoice_id = ? ",
            [

                id
            ]);

        res.json("The transaction was successfully refunded!");
    } catch (err) {
        console.log(err.message);
    }
});

// In transit 
app.put("/refund/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pool.query("SELECT * FROM invoice WHERE invoice_id = ?", [id]);
        console.log(data[0].order_status);

        if (data[0].order_status != "purchased") {
            const error = {
                ERROR: "Return cannot be done!"
            }
            res.status(400).send(error);
        }

        const updateInvoiceitem = await pool.query("UPDATE invoice SET order_status = 'In transit' WHERE invoice_id = ? ",
            [

                id
            ]);

        res.json("The transaction was shipped!");
    } catch (err) {
        console.log(err.message);
    }
});

// Arrived
app.put("/arrived/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pool.query("SELECT * FROM invoice WHERE invoice_id = ?", [id]);
        console.log(data[0].order_status);

        if (data[0].order_status != "In Transit") {
            const error = {
                ERROR: "Return cannot be done!"
            }
            res.status(400).send(error);
        }

        const updateInvoiceitem = await pool.query("UPDATE invoice SET order_status = 'Arrived' WHERE invoice_id = ? ",
            [

                id
            ]);

        res.json("The item has successfully arrived");
    } catch (err) {
        console.log(err.message);
    }
});

// Purchased 
app.put("/purchase", async (req, res) => {
    try {
       
        const body = req.body;
       const payment = await pool.query("SELECT * FROM payment WHERE customer_id_fk = ?", [body.customer_id_fk]);
       
        console.log(payment);

       if (payment.length === 0) {
            const error = {
                ERROR: "You need to provide at leat one payment method"
            }
           return res.status(400).send(error);
        }
       

       

        var now = new Date();
        var d = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes();
        console.log(d);
        const sum = await pool.query("SELECT SUM(item.manufacture_cost * invoice_item.quantity) valsum FROM invoice_item, item WHERE invoice_item.item_id_fk = item.item_id AND invoice_item.invoice_id_fk = ? GROUP BY invoice_item.invoice_id_fk",
        [
            body.invoice_id
        ])
        // We also need total_cost_after_tax
        console.log(sum);
        console.log(sum[0].valsum);
        const updateInvoiceitem = await pool.query("UPDATE invoice SET order_status = 'purchased', time_of_transaction = ?, payment_id_fk = ?, total_cost_after_tax = ?, total_manufacture_cost = ? WHERE invoice_id = ? ",
            [
                d,
                body.payment_id_fk,
                body.total_cost_after_tax,
                sum[0].valsum,
                body.invoice_id,
                
            ]);
        const createNewinvoice = await pool.query("INSERT INTO invoice (customer_id_fk, store_id_fk) VALUES (?,?)", [body.customer_id_fk, body.store_id_fk])
        res.json("The transaction was successfully purchased!");
    } catch (err) {
        console.log(err.message);
    }
});

//get (total_cost,time_of_transaction) by and order_status=purchased and customer_id=? [Order history of a specific customer] 2 PARAMETRS 

//get (total_cost) by and order_status=cart and customer_id=? [cart of specific customer]


module.exports = app;
