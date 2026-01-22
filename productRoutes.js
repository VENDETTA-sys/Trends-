const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const { sellerOnly } = require("../middleware/roleMiddleware");
const { getProducts, getProductById, createProduct } = require("../controllers/productController");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, sellerOnly, createProduct);

module.exports = router;