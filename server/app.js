const express = require("express");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors"); //to allow our app to accept any request

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    //to receive the credentials sent from the frontend
    //the frontend url for which the cookies will be stored
    origin: "http://localhost:5173",
    credentials: true,
  })
); // allows us to make a request to our api from anywhere in the world.
//to access the folder globally for our file uploads,
//express.static means anyone can access this folder
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}
//import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);

//for error handling
app.use(ErrorHandler);
module.exports = app;
