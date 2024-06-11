import multer from "multer";

// The disk storage engine gives you full control on storing files to disk.
// note :donot use the following function as global middlewares
// we will get files in req.files in another controller that pass this middleware

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // file will be stored in public folder
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadFileUsingMulter = multer({ storage: storage });
export { uploadFileUsingMulter };
