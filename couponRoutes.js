const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const { applyCoupon } = require("../controllers/couponController");

router.post("/apply", protect, applyCoupon);

module.exports = router;