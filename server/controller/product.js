const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/Shop");
const Product = require("../model/Product");

// Create product
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncError(async (req, res, next) => {
    try {
      console.log("create product route reached");
      const shopId = req.body.shop;
      const shop = await Shop.findOne({ shopId });
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid", 400));
      } else {
        console.log("files:>>>", req.files);

        const files = req.files; // To receive the files from the front end in form of an array
        const imageUrls = files.map((file) => `${file.filename}`); // Creating filename by mapping over the array of files
        const productData = req.body;
        productData.images = imageUrls; // Sends the images into the product data
        productData.shop = shop; // Sends the shop into the product data

        const product = await Product.create(productData);

        res.status(201).json({
          success: true,
          product, // Sends to frontend on request
        });

        console.log("product created");
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
