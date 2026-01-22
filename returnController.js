const Order = require("../models/Order");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.requestReturn = async (req, res) => {
  const { reason } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) return res.status(404).json({ message: "Order not found" });
  if (order.user.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not allowed" });

  order.returnRequest = {
    requested: true,
    reason: reason || "",
    status: "requested",
  };

  await order.save();
  res.json({ message: "Return requested" });
};

exports.approveReturn = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.returnRequest.status = "approved";
  await order.save();
  res.json({ message: "Return approved" });
};

exports.rejectReturn = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.returnRequest.status = "rejected";
  await order.save();
  res.json({ message: "Return rejected" });
};

exports.refundOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) return res.status(404).json({ message: "Order not found" });
  if (order.paymentStatus !== "paid") return res.status(400).json({ message: "Not paid order" });

  // Auto refund via Razorpay
  const paymentId = order.paymentInfo?.razorpay_payment_id;
  if (!paymentId) return res.status(400).json({ message: "Payment ID missing" });

  const refund = await razorpay.payments.refund(paymentId, {
    amount: Math.floor(order.totalPrice * 100), // in paise
  });

  order.returnRequest.status = "refunded";
  order.refundAmount = order.totalPrice;
  await order.save();

  res.json({ message: "Refund success", refund });
};