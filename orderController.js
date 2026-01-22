const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");

exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice, summary } = req.body;

    const order = await Order.create({
      user: req.user._id,
      items,
      totalPrice,
      summary,
      paymentStatus: "pending",
      orderStatus: "placed",
    });

    // email confirmation (order placed)
    await sendEmail({
      to: req.user.email,
      subject: "Trends Hub - Order Placed ✅",
      html: `
        <h2>Thanks for shopping with Trends Hub 🎉</h2>
        <p>Your order is placed successfully.</p>
        <p><b>Order ID:</b> ${order._id}</p>
        <p><b>Total:</b> ₹${order.totalPrice}</p>
      `,
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("items.product");
  res.json(orders);
};