const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const { sellerOnly } = require("../middleware/roleMiddleware");
const { sellerOrders } = require("../controllers/sellerOrdersController");

router.get("/orders", protect, sellerOnly, sellerOrders);

module.exports = router;