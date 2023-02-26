const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
updateOrder,
} = require("../controllers/orderController.js");


router.post("/",  createOrder);
// router.patch("/updateOrder", protect,updateOrder);
router.put('/:id',updateOrder)
router.get("/",  getOrders);
router.get("/:id", getOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
