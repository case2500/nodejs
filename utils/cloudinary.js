const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'casenetwork',
  api_key: '591125945131828',
  api_secret: 'CsoXWEkyt1J30tYQ4DrjYWxIFKo',
});

module.exports = cloudinary;

// CLOUDINARY_API_KEY=591125945131828
// CLOUDINARY_API_SECRET=CsoXWEkyt1J30tYQ4DrjYWxIFKo
// CLOUDINARY_NAME=casenetwork
