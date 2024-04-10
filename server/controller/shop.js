const express = require("express");
const path = require("path");
const Shop = require("../model/Shop");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const router = express.Router();
const bcrypt = require("bcrypt");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/SendMail");
const catchAsyncError = require("../middleware/catchAsyncError");
const { isSeller } = require("../middleware/auth");
const sendShopToken = require("../utils/shopToken");

const createActivationToken = (shop) => {
  const payload = {
    id: shop._id,
    email: shop.email,
    name: shop.name,
    avatar: shop.avatar,
    password: shop.password,
    shop_name: shop.shop_name,
    shop_email: shop.shop_email,
    address: shop.address,
    phoneNumber: shop.phoneNumber,
    zipCode: shop.zipCode,
  };
  return jwt.sign(payload, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//Route to create usuer
router.post("/shop-create", upload.single("file"), async (req, res, next) => {
  try {
    console.log("create shop route reached");
    const { name, email, password, address, phoneNumber, zipCode } = req.body;
    const ShopEmail = await Shop.findOne({ shop_email: email });

    //cheks the database if the email alrealdy exits
    if (ShopEmail) {
      //to delete the uploaded file
      if (req.file) {
        const filePath = path.join(__dirname, "../uploads", req.file.filename);
        fs.unlinkSync(filePath);
      }
      return next(new ErrorHandler("Shop already exits, Login..."));
    }
    //if there is no avatar upload
    if (!req.file) {
      return next(new ErrorHandler("Avatar file is required to continue", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const avatar = fileUrl;

    // hash the password before storing it in the shop object
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(password, salt);

    //to create a new shop
    const shop = new Shop({
      shop_name: name,
      shop_email: email,
      password: password,
      avatar: {
        public_id: avatar,
        url: `http://localhost:8000/${fileUrl}`,
      },
      address: address,
      phoneNumber: phoneNumber,
      zipCode: zipCode,
    });
    // delete shop.password;
    //to generte activation token
    const activationToken = createActivationToken(shop);
    const activation_Url = `http://localhost:5173/shop-activation/${activationToken}`;

    try {
      await sendMail({
        email: shop.shop_email,
        subject: "Activate your shop",
        message: ` Hello ${shop.shop_name}, please click the link to activate your shop: ${activation_Url}.
        This link is only valid for 5 minutes`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email (${shop.shop_email}) to activate your shop`,
      });
    } catch (error) {
      console.error("Error sending activation email", error);
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    console.log("Error creating shop:", error); //log the error to the console
    return next(new ErrorHandler(error.message, 400));
  }
});

//Route to activate the shop
router.post(
  "/shop-activation",
  catchAsyncError(async (req, res, next) => {
    try {
      console.log("Activation route reaced");
      //gets the token from the request body coming from the frontend
      const { activation_token } = req.body;

      //to verify the token coming  from the frontend
      const decodedToken = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!decodedToken) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      console.log(decodedToken);
      const {
        shop_name,
        shop_email,
        password,
        avatar,
        address,
        phoneNumber,
        zipCode,
      } = decodedToken;
      const shop = await Shop.findOne({ email: shop_email });

      //to delete the already uploaded file from the storage
      if (shop) {
        if (req.file) {
          const filePath = path.join(
            __dirname,
            "../uploads",
            req.file.filename
          );
          fs.unlinkSync(filePath);
        }
        return next(
          new ErrorHandler(
            "Shop already exits in the database, Please log in to continue",
            400
          )
        );
      }

      //if doesn't exit in the database, proceed to creating a new shop
      const newShop = new Shop({
        shop_name: shop_name,
        shop_email: shop_email,
        password: password,
        avatar: {
          public_id: avatar.public_id,
          url: avatar.url,
        },
        address: address,
        phoneNumber: phoneNumber,
        zipCode: zipCode,
      });
      //save the shop to the database
      await newShop.save();
      console.log("shop saved to the database", newShop);
      //sending th token to the frontend to store it as cookie
      sendShopToken(newShop, 201, res);
    } catch (error) {
      console.log("Error activating shop:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.post(
  "/shop-login",
  catchAsyncError(async (req, res, next) => {
    try {
      //gets the shop details from the request body
      const { email, password } = req.body;
      if (!(email || password)) {
        return next(new ErrorHandler("Please fill all the fields!", 400));
      }
      //check the database if the shop exits
      const shop = await Shop.findOne({ shop_email: email }).select(
        "+password"
      );
      if (!shop) {
        return next(new ErrorHandler("Shop doesn't exist!", 400));
      }

      //compares the password
      const isValidPassowrd = await shop.comparePassword(password);
      if (!isValidPassowrd) {
        return next(
          new ErrorHandler("Please provide the correct email or password", 400)
        );
      }
      //sends the shop token to the frontend
      sendShopToken(shop, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//load shop
router.get(
  "/getSeller",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller.id);
      if (!seller) {
        return next(new ErrorHandler("Shop doesn't exist", 400));
      }
      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//log out shop
router.get(
  "/logout",
  catchAsyncError(async (req, res, next) => {
    try {
      console.log("seller logout route reached");
      res.cookie("shop_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        samesite: " none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
