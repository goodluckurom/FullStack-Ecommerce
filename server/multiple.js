const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Folder to keep the uploaded files in
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    // Unique naming for files
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = file.originalname.split(".")[0];
    cb(null, fileName + "-" + uniqueSuffix + ".png");
  },
});

// Configure multer for handling multiple file uploads
const uploadMultiple = multer({ storage: storage }); // "images" is the field name for the files, 5 is the maximum number of files allowed

module.exports = { uploadMultiple };
