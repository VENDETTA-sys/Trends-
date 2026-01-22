const router = require("express").Router();
const { sendOtp, verifyReset } = require("../controllers/otpController");

router.post("/send", sendOtp);
router.post("/verify-reset", verifyReset);

module.exports = router;