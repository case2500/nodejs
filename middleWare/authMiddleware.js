const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

exports.auth = (req, res, next) => {
  try {
    const token = req.headers["authtoken"];
    console.log("token==>", token);
    if (!token) {
      return res.status(401).send("no token , authorization denied");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("middleware==>", decoded);
    req.user  = decoded.user
    next()

  } catch (err) {
    console.log(err);
    res.status(401).send("Token Invavid!!");
  }
};
