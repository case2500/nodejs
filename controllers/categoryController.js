const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
// const cloudinary = require("cloudinary").v2;
 const cloudinary = require("../utils/cloudinary");
// Create Prouct
const createCategory = asyncHandler(async (req, res) => {
  const { name, status } = req.body;
  console.log(req.body)
  //   Validation
  if (!name ) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Product
  const categorycreate = await Category.create({

    name
  });
console.log(categorycreate)
  res.status(201).json(categorycreate);
});

// Get all Products
const getCategorys = (async (req, res) => {
  const categorys = await Category.find().sort("-createdAt");
  res.status(200).json(categorys);
});

// Get single product
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  console.log(category)
  // if product doesnt exist
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  // Match product to its user
  // if (category.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }
  res.status(200).json(category);
});

// Delete Product
const deletcategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  // console.log(product.image.cloudinary_id)
  // if product doesnt exist
  if (!category) {
    res.status(404);
    throw new Error("Product not found");
  }
  await category.remove();
  res.status(200).json({ message: "category deleted." });
});

// Update Product
const  updatCategory = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    const category = await Category.findOneAndUpdate(
      { _id: id },
      { name: name }
    );
    res.send(category);
  } catch (err) {
    res.status(500).send("Server Error!!");
  }

});

module.exports = {
  createCategory,
  getCategorys,
  getCategory,
  deletcategory,
  updatCategory
};
