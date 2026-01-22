const Address = require("../models/Address");

exports.addAddress = async (req, res) => {
  try {
    const a = await Address.create({ ...req.body, user: req.user._id });
    res.json(a);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.myAddresses = async (req, res) => {
  const list = await Address.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(list);
};