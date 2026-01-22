const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const { sellerOnly } = require("../middleware/roleMiddleware");
const { analytics } = require("../controllers/sellerController");

router.get("/analytics", protect, sellerOnly, analytics);

module.exports = router;