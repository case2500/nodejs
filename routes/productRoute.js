const express = require("express");
// import Category from './../../frontend/src copy/component/Category';
const router = express.Router();
const {auth} = require("../middleWare/authMiddleware");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductCategory,
  getProductSearch,
} = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");

router.post("/",auth,createProduct);
router.put("/:id", updateProduct);
// router.get("/", protect, getProducts);
router.get("/", getProducts);
// router.get("/:id", protect, getProduct);
router.get("/:id", getProduct);
router.get("/cat/:query", getProductCategory);
router.get("/productsearch/:keyword", getProductSearch);
router.delete("/:id",  deleteProduct);

module.exports = router;
