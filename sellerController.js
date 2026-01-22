const Order = require("../models/Order");
const Product = require("../models/Product");

exports.analytics = async (req, res) => {
  const products = await Product.find({ seller: req.user._id });
  const productIds = products.map((p) => p._id);

  const orders = await Order.find({ "items.product": { $in: productIds }, paymentStatus: "paid" });

  const totalSales = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  res.json({
    totalProducts: products.length,
    totalOrders: orders.length,
    totalSales,
  });
};