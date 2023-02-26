const express = require("express");
const router = express.Router();

// controllers
const { createImage, removeImage } = require("../controllers/cloudinary.js");

// middleware
const {protect} = require("../middleWare/authMiddleware");

//@Endpoint     http://localhost:5000/api/images
router.post("/",  createImage);
// router.post("/", createImage);
router.post("/removeimages",removeImage);

module.exports = router;

