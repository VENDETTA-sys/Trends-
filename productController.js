const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Product not found" });
  res.json(p);
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, images, variants, tags } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      images: images || [],
      variants: variants || [],
      tags: tags || [],
      seller: req.user._id,
      rating: 4.5,
      numReviews: 10,
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};