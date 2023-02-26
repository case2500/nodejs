const express = require("express");
const { contactUs } = require("../controllers/contactController");
const router = express.Router();
const {auth} = require("../middleWare/authMiddleware");

router.post("/", auth, contactUs);

module.exports = router;
