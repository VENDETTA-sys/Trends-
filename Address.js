const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fullName: String,
    phone: String,
    pincode: String,
    city: String,
    state: String,
    street: String,
    landmark: String,
    type: { type: String, enum: ["home", "work"], default: "home" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);