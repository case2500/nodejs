const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const categoryRoute = require("./routes/categoryRoute");
const autonumberRoute = require("./routes/autonumberRoute");
const orderRoutes = require("./routes/orderRoutes.js")
const imagesRoutes = require("./routes/imagesRoutes.js")

const {errorHandler} = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");
// const httpServer = http.createServer(app);

const app = express();

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);
app.use("/api/category", categoryRoute);
app.use("/api/autonumber", autonumberRoute);
app.use('/api/orders', orderRoutes)
app.use('/api/images', imagesRoutes)
// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);
// Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`ecom Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
