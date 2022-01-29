const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const KEY_ID = "rzp_test_glyvhWarg5Vl9d";
const SECRET = "9Rw3F1VdJHtof1cxclW65sQp";

const app = express();
app.use(express.json({ extended: false }));
app.use(cors());

app.post("/create-order", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: KEY_ID,
            key_secret: SECRET,
        });
        const options = {
            amount: Math.floor(req.body.amount * 100),
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        console.log(order);
        if (!order) {
            return res.status(500).send("Some error occured");
        }
        res.send(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(`server started on http://localhost:${port}`)
);
