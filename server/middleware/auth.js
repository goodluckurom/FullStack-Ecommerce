const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Shop = require("../model/Shop");

const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { user_token } = req.cookies;

  if (!user_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(user_token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});

//seller authentication
exports.isSeller = catchAsyncError(async (req, res, next) => {
  const { shop_token } = req.cookies;
  if (!shop_token) {
    return next(new ErrorHandler("please login your shop to continue", 401));
  }
  const decoded = jwt.verify(shop_token, process.env.JWT_SECRET_KEY);
  req.seller = await Shop.findById(decoded.id);

  next();
});
