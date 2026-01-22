const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const { sellerOnly } = require("../middleware/roleMiddleware");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/multiple", protect, sellerOnly, upload.array("images", 8), async (req, res) => {
  try {
    if (!req.files?.length) return res.status(400).json({ message: "No files" });

    const urls = [];

    for (const file of req.files) {
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = `data:${file.mimetype};base64,${b64}`;

      const uploaded = await cloudinary.uploader.upload(dataURI, {
        folder: "trends-hub-products",
      });

      urls.push(uploaded.secure_url);
    }

    res.json({ images: urls });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;