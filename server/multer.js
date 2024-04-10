const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    //foldelr to keep the uploaded files in
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    //unique naming for files
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = file.originalname.split(".")[0];
    cb(null, fileName + "-" + uniqueSuffix + ".png");
  },
});

exports.upload = multer({ storage: storage });
