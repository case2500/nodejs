const express = require("express");
const router = express.Router();
const {protect }= require("../middleWare/authMiddleware");
const {
  createCategory,
  getCategorys,
  getCategory,
  deletcategory,
  updatCategory,
} = require("../controllers/categoryController.js");
const { upload } = require("../utils/fileUpload");

router.post("/",  createCategory);
router.put("/:id",updatCategory);
router.get("/", getCategorys);
router.get("/:id",  getCategory);
router.delete("/:id",deletcategory);

module.exports = router;
