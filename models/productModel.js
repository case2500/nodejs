const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      text:true
    },
    description: {
      type: String,
    },
    brand: {
      type: String,
      default:"-"
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },
    price: {
      type: Number,
    },
    sold:{
      type:Number,
      default:0
    },
    quantity: Number,
    images: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
