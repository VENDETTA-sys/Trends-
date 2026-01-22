const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");
const {
  requestReturn,
  approveReturn,
  rejectReturn,
  refundOrder,
} = require("../controllers/returnController");

router.post("/:id/request", protect, requestReturn);
router.put("/:id/approve", protect, adminOnly, approveReturn);
router.put("/:id/reject", protect, adminOnly, rejectReturn);
router.put("/:id/refunded", protect, adminOnly, refundOrder);

module.exports = router;