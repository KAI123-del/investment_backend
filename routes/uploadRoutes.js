import express from "express";
import path from "path";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const checkFileType = (file, cb) => {
  const fileTypes = /jpg|jpeg|png|webp/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("images only!");
  }
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("request", req.file.path);

    if (req.file.path) {
      req.user.image = `${process.env.PORT}/${req.file.path}`;
      await req.user.save();
      res.status(200).json({
        message: "User profile image updated successfully !!!",
        image: `${process.env.PORT}/${req.file.path}`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
