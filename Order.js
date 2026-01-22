const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        qty: Number,
        price: Number,
      },
    ],
    totalPrice: Number,

    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    orderStatus: {
      type: String,
      enum: ["placed", "packed", "shipped", "out_for_delivery", "delivered"],
      default: "placed",
    },

    paymentInfo: {
      razorpay_order_id: String,
      razorpay_payment_id: String,
      razorpay_signature: String,
    },

    summary: {
      subtotal: Number,
      deliveryCharge: Number,
      gst: Number,
      discount: Number,
    },

    returnRequest: {
      requested: { type: Boolean, default: false },
      reason: { type: String, default: "" },
      status: {
        type: String,
        enum: ["none", "requested", "approved", "rejected", "refunded"],
        default: "none",
      },
    },

    refundAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);