const app = require("./app.js");
const connectDatabse = require("./db/Database.js");

//handling uncaught exception
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Shutting  down server for handling uncaught execption");
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

//connect db
connectDatabse();

//create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (error) => {
  console.log(`Shutting down the server for ${error.message}`);
  console.log(`Shutting down the server for unhandled promise rejection`);

  //close the server
  server.close(() => {
    process.exit(1);
  });
});
