const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
// const cloudinary = require("cloudinary").v2;
const cloudinary = require("../utils/cloudinary");
// Create Prouct
const createProduct = asyncHandler(async (req, res) => {
console.log(req.body);
  try {
    console.log(req.body);
    // const { name } = req.body;
    const product = await new Product(req.body).save();
    res.send(product);
  } catch (err) {
    res.status(500).send("Create Product Error!!");
  }

  });

// Get all Products
const getProducts = asyncHandler(async (req, res) => {
  console.log(req.body);
  const products = await Product.find(req.body).sort("-createdAt");
  res.status(200).json(products);
});

// Get single product
const getProduct = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  // if (product.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }
  console.log(JSON.stringify(product));
  res.status(200).json(product);
});

// Get category product
const getProductCategory = (async (req, res) => {
  const query = req.params.query;
  console.log("query=> " + query);
  const products = await Product.find({ category: query }).sort("-createdAt");
  console.log("products=> " + products);
  res.status(200).json(products);
});

// Get คันหาproduct ชื่อกับcategoryคล้ายกับ (req.params)
const getProductSearch = asyncHandler(async (req, res) => {
  // console.log(req.params.keyword);
  const con = req.params.keyword;

  const query = {
    $or: [
      { category: { $regex: "(?i)" + `${con}` + "(?-i)" } },
      { name: { $regex: "(?i)" + `${con}` + "(?-i)" } },
    ],
  };
  // console.log(query);
  const products = await Product.find(query).sort("-createdAt");
  console.log(products);

  res.status(200).json(products);
});

// Delete Product
const deleteProduct = (async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log(product);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  // if (product.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }

  // await cloudinary.uploader.destroy(product.cloudinary_id, {
  //   upload_preset: "PinventApp",
  // });
  await product.remove();
  res.status(200).json({ message: "Product deleted." });
});

// Update Product
const updateProduct = (async (req, res) => {
  try {
    console.log(req.body)
    //code
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.send(product);
  } catch (err) {
    //err
    res.status(500).send("Update Product Error!!");
  }
   
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductCategory,
  getProductSearch,
};
