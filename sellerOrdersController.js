const Order = require("../models/Order");
const Product = require("../models/Product");

exports.sellerOrders = async (req, res) => {
  const products = await Product.find({ seller: req.user._id });
  const productIds = products.map((p) => p._id);

  const orders = await Order.find({ "items.product": { $in: productIds } })
    .populate("user", "email")
    .populate("items.product");

  res.json(orders);
};