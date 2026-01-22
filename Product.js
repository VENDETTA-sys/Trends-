const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: String,
    stock: Number,
    images: [String],
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },

    variants: [
      {
        size: String,
        color: String,
        stock: Number,
      },
    ],

    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);