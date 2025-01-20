const express = require("express");
const { createCetagory } = require("../../controllers/cetagoryController");
const router = express.Router();
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new error("Only jpeg, jpg,or png file allowed"));
    }
  },
});
function errorCheck(err, req, res, next) {
  if (err) {
    return res.status(500).send({message:err.message})
  }
  next()
}
//localhost:3000/api/v1/category/createCategory

router.post("/createCategory", upload.single("image"),errorCheck, createCetagory);

module.exports = router;
