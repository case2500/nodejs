const express = require("express");
const router = express.Router();
// const protect = require("../middleWare/authMiddleware");
const {
  createAutonumber,
  getAutonumber,
  updatedAutoNumber
//   deleteategory,
//   updateategory,
} = require("../controllers/autonumberController.js");


router.post("/", createAutonumber);
router.get("/", getAutonumber);
router.put("/", updatedAutoNumber);

module.exports = router;
