const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(helmet());

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 200,
});
app.use(limiter);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/coupons", require("./routes/couponRoutes"));
app.use("/api/otp", require("./routes/otpRoutes"));
app.use("/api/returns", require("./routes/returnRoutes"));
app.use("/api/seller", require("./routes/sellerRoutes"));
app.use("/api/seller", require("./routes/sellerOrdersRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/addresses", require("./routes/addressRoutes"));

app.get("/", (req, res) => {
  res.send("✅ Trends Hub Backend Running...");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.log("❌ DB Error:", err.message));