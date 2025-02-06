const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

const fileFilterFn = (req, file, cb) => {
  let filetypes = /pdf||docx/;
  let mimetype = filetypes.test(file.mimetype);
  let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb("Error :file upload only supports the following filetypes - " + filetypes);
};
const fileUpload = multer({ storage: storage, fileFilter: fileFilterFn });
module.exports = { fileUpload };
