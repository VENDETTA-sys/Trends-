const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

exports.stats = async (req, res) => {
  const users = await User.countDocuments();
  const products = await Product.countDocuments();
  const orders = await Order.countDocuments();

  const paidOrders = await Order.find({ paymentStatus: "paid" });
  const revenue = paidOrders.reduce((sum, o) => sum + o.totalPrice, 0);

  res.json({ users, products, orders, revenue });
};

exports.allOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "email").sort({ createdAt: -1 });
  res.json(orders);
};

exports.allUsers = async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
};

exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.orderStatus = status;
  await order.save();

  res.json({ message: "Status updated" });
};

exports.updateUserRole = async (req, res) => {
  const { role } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.role = role;
  await user.save();

  res.json({ message: "Role updated" });
};