const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const { createOrder, myOrders } = require("../controllers/orderController");

router.post("/", protect, createOrder);
router.get("/my", protect, myOrders);

module.exports = router;