const express = require("express");
const path = require("path");
const User = require("../model/User");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const router = express.Router();
const bcrypt = require("bcrypt");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/SendMail");
const sendToken = require("../utils/userToken");
const catchAsyncError = require("../middleware/catchAsyncError");
const { isAuthenticated } = require("../middleware/auth");

// Helper function to create activation token
const createActivationToken = (user) => {
  const payload = {
    id: user._id, // Change to user._id
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    password: user.password,
  };
  return jwt.sign(payload, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Route to create user
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    console.log("Create user route reached");

    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      if (req.file) {
        const filePath = path.join(__dirname, "../uploads", req.file.filename);
        fs.unlinkSync(filePath);
      }
      return next(
        new ErrorHandler("User already exists. Please sign in.", 400)
      );
    }

    if (!req.file) {
      return next(new ErrorHandler("Avatar file is required", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const avatar = fileUrl;

    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name: name,
      email: email,
      password: password,
      avatar: {
        public_id: `http://localhost:8000/${fileUrl}`,
        url: avatar,
      },
    });

    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}.
        This link is valid for five(5) minutes`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email (${user.email}) to activate your account.`,
      });
    } catch (error) {
      console.error("Error sending activation email:", error); // Log error
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    console.error("Error creating user:", error); // Log error
    return next(new ErrorHandler(error.message, 400));
  }
});

// Route to activate user
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      console.log("Activation route reached");

      const { activation_token } = req.body;

      const decodedToken = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!decodedToken) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      console.log(decodedToken);
      const { name, email, password, avatar } = decodedToken;
      const userEmail = await User.findOne({ email: email });

      if (userEmail) {
        if (req.file) {
          const filePath = path.join(
            __dirname,
            "../uploads",
            req.file.filename
          );
          fs.unlinkSync(filePath);
        }
        return next(
          new ErrorHandler("User already exists. Please sign in.", 400)
        );
      }

      let user = await User.findOne({ email });

      if (user) {
        return next(
          new ErrorHandler("User already exists. Please sign in.", 400)
        );
      }
      // const saltRounds = 10;
      // const hashedPassword = await bcrypt.hash(password, saltRounds);
      const createUser = new User({
        name: name,
        email: email,
        password: password,
        avatar: {
          public_id: avatar.public_id,
          url: avatar.url,
        },
      });

      //saves the user to the database
      await createUser.save();
      console.log("user saved to the database", createUser);
      //sends the token to the frontend
      sendToken(createUser, 201, res);
    } catch (error) {
      console.error("Error activating user:", error); // Log error
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//login the user
router.post(
  "/login-user",
  catchAsyncError(async (req, res, next) => {
    try {
      //gets the user detials from the  request body
      const { email, password } = req.body;
      //checks if the details is valid
      if (!(email || password)) {
        return next(new ErrorHandler("Please fill all fields!", 400));
      }
      //checks if the user exists in the database
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User doesn't exist!", 400));
      }
      //compares the password
      const isValidPassowrd = await user.comparePassword(password);
      if (!isValidPassowrd) {
        return next(
          new ErrorHandler("Please provide the correct email or password", 400)
        );
      }
      //sends the token to the frontend
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//load user
router.get(
  "/getuser",
  isAuthenticated, //checks if the user is authenticted then continues
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      //returns an error if no such user exits in the database
      if (!user) {
        return next(
          new ErrorHandler(
            "User does not exist in the database, create an account to continue",
            400
          )
        );
      }
      //sends to the frontend if the user exists
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//log out user
router.get(
  "/logout",
  catchAsyncError(async (req, res, next) => {
    try {
      res.cookie("user_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out Successfull!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
