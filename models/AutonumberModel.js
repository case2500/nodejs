const mongoose = require("mongoose");

const autonumber = mongoose.Schema({
  name: {
    type: Number,
    required: true,
    default:10000,
  },
  status: {
    type: String,
    // required: true,
    default: "1",
  }
},
{
  timestamps: true,
}
);

const Autonumber = mongoose.model("Autonumber", autonumber);
module.exports = Autonumber;
