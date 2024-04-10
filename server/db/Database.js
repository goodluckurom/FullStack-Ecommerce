const mongoose = require("mongoose");

const connectDatabse = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDB Connected... with server ${data.connection.host}`);
    });
};

module.exports = connectDatabse;
