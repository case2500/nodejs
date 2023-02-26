const mongoose = require("mongoose");

const category = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "1",
  }
},
{
  timestamps: true,
}
);

const Category = mongoose.model("Category", category);
module.exports = Category;
