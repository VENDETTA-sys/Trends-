const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");
const {
  stats,
  allOrders,
  allUsers,
  updateOrderStatus,
  updateUserRole,
} = require("../controllers/adminController");

router.get("/stats", protect, adminOnly, stats);
router.get("/orders", protect, adminOnly, allOrders);
router.get("/users", protect, adminOnly, allUsers);

router.put("/orders/:id/status", protect, adminOnly, updateOrderStatus);
router.put("/users/:id/role", protect, adminOnly, updateUserRole);

module.exports = router;