const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const { addAddress, myAddresses } = require("../controllers/addressController");

router.post("/", protect, addAddress);
router.get("/my", protect, myAddresses);

module.exports = router;