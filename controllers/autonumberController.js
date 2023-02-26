const asyncHandler = require("express-async-handler");
const AutoNumber = require("../models/AutonumberModel");

// Create Prouct
const createAutonumber = asyncHandler(async (req, res) => {
  const { name, status } = req.body;
  console.log(req.body)
  //   Validation
  if (!name ) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Product
  const autocreate = await AutoNumber.create({

    name
  });
  console.log(autocreate)
  res.status(201).json(autocreate);
});

// Get all Products
const getAutonumber = asyncHandler(async (req, res) => {   
  const autoNumber = await AutoNumber.findOne({'status':'0'});
  const newautoNumber = Number(autoNumber.name)+1
  res.status(200).json(newautoNumber );
});


// Update Product
const updatedAutoNumber = asyncHandler(async (req, res) => {
    const autoNumber = await AutoNumber.findOne({'status':'0'});
    const newautoNumber = Number(autoNumber.name)+1
  
    AutoNumber.update({name:newautoNumber }, function (err, result) {
        if (err){
            console.log(err)
        }else{
           // console.log("Result :", result) 
            res.status(200).json("ok");
        }
    })
})


module.exports = {
    createAutonumber,
    getAutonumber,
    updatedAutoNumber,

};
