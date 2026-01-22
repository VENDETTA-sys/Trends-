const Coupon = require("../models/Coupon");

exports.applyCoupon = async (req, res) => {
  try {
    const { code, amount } = req.body;

    const coupon = await Coupon.findOne({ code: code.toUpperCase(), active: true });
    if (!coupon) return res.status(400).json({ message: "Invalid coupon" });

    if (amount < coupon.minAmount) {
      return res.status(400).json({ message: `Minimum amount ₹${coupon.minAmount} required` });
    }

    const discount = Math.floor((amount * coupon.discountPercent) / 100);
    res.json({ discount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};