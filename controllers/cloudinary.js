const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: `casenetwork`,
  api_key: `591125945131828`,
  api_secret: `CsoXWEkyt1J30tYQ4DrjYWxIFKo`,
});


// CLOUDINARY_API_KEY=591125945131828
// CLOUDINARY_API_SECRET=CsoXWEkyt1J30tYQ4DrjYWxIFKo
// CLOUDINARY_NAME=casenetwork


exports.createImage = async (req, res) => {
console.log(req.body.image)
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: Date.now(),
      // folder: "ecom",
      resource_type: "auto",
    });
    console.log(result)
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Upload Error!!!");
  }
};

exports.removeImage = async (req, res) => {
  try {
    let image_id = req.body.public_id;
    cloudinary.uploader.destroy(image_id, (result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Remove Error!!!");
  }
};
