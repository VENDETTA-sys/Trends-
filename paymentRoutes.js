const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", protect, async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: Math.floor(amount * 100),
    currency: "INR",
  };

  const order = await razorpay.orders.create(options);
  res.json(order);
});

router.post("/verify", protect, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (expected !== razorpay_signature) {
    return res.status(400).json({ message: "Payment verification failed" });
  }

  const order = await Order.findById(orderId).populate("user");
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.paymentStatus = "paid";
  order.paymentInfo = { razorpay_order_id, razorpay_payment_id, razorpay_signature };
  await order.save();

  res.json({ message: "Payment verified" });
});

module.exports = router;