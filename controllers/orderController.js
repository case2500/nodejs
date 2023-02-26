const asyncHandler = require("express");
const { Order } = require("../models/orderModel");
const express = require("express");
const { OrderItem } = require("../models/order-item.js");
const { Category } = require("../models/categoryModel.js");
const  Product  = require("../models/productModel.js");
// Create Prouct

const createOrder = async (req, res) => {
  // console.log(req.body);
  // const {id,orderItems,quantity,totalprice}=req.body;
  // console.log("req.body.user==="+req.body.user._id)
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem._id,
      });

      console.log("newOrderItem===>" + JSON.stringify(req.body.orderItems));

      // + - products
      let bulkOption = (req.body.orderItems).map((productNewOrder) => {
        return {
          updateOne: {
            filter: { _id: productNewOrder._id },
            update: {
              $inc: {
                quantity: -productNewOrder.quantity,
                sold: +productNewOrder.quantity,
              },
            },
          },
        };
      });

      // var bulk = Product.initializeUnorderedBulkOp();
      // bulk.find( { status: "D" } ).update( { $set: { status: "I", points: "0" } } );
      // bulk.find( { item: null } ).update( { $set: { item: "TBD" } } );
      // bulk.execute();

     console.log("updated==>"+JSON.stringify(bulkOption))
      let updated =  Product.bulkWrite(bulkOption, {});
 
//  res.send(updated);

      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );
  const orderItemsIdsResolved = await orderItemsIds;

  let order = new Order({
    orderItems: orderItemsIdsResolved,
    user: req.body.user._id,
    totalPrice: req.body.totalprice,
  });
  // console.log("req.body.user.id"+req.body.user.id)
  order = await order.save();

  if (!order) return res.status(400).send("the order cannot be created!");

  res.send(req.body);
};

// Get all Products
// const getOrders = ( (req, res) => {
//   console.log("get")
//   const order =  Order.find({});
//   res.status(200).json(order);
// });

// Get all Products
const getOrders = async (req, res) => {
  // console.log(req.body);
  const neworder = await Order.find({});
  res.status(200).json(neworder);
};

// Get single product
// const getOrder = async (req, res) => {
//   console.log(req.params);
//   const order = await Order.findById({user:req.params.id})
//     .populate("user", "name")
//     .populate({
//       path: "orderItems",
//       populate: {
//         path: "product",
//         populate: "category",
//       },
//     });

//   if (!order) {
//     res.status(500).json({ success: false });
//   }
//   // res.send(order);
// };

// Get single product
const getOrder = async (req, res) => {
  //  console.log(req.params)
  const orderuserid = req.params.id;
  // console.log("tableName="+tableName)
  const order = await Order.find({ user: orderuserid })
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        // populate: "category",
      },
    })
    .sort({ dateOrdered: -1 });
  // console.log(order.map(p=>(p.totalPrice)))
  // console.log("order"+order)
  if (!order) {
    res.status(404);
    throw new Error("order not found");
  }
  res.status(200).json(order);
};

// Delete order product
const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  // if product doesnt exist
  if (!order) {
    res.status(404);
    throw new Error("order not found");
  }
  await order.remove();
  res.status(200).json({ message: "order deleted." });
};

// Delete bill order
// const deleteOrder = asyncHandler(async (req, res) => {

//   const { id } = req.params;

//   const order = await Order.find({ autoNumber: id });
//   console.log(order)
//   // // if product doesnt exist
//   var myquery = {autoNumber: id };
//   if (order !== []) {
//     await Order.deleteMany(myquery )
//     res.status(200).json({ message: "order deleted." });
//   }
//   else {
//     res.status(404);
//     throw new Error("order not found");
//   }

// });

// Update User
const updateOrder = async (req, res) => {
  console.log("userid=>" + req.params.id);
  const id = req.params.id;
  console.log("id===" + id);

  const filter = { _id: id };
  const update = { status: 0 };

  const order = Order.find({ _id: id });
  if (order) {
    //   console.log("order==="+order)
    // }
    let updatedorder = await Order.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).json(updatedorder);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
};
