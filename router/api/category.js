const express = require("express");
const { createCetagory } = require("../../controllers/cetagoryController");
const router = express.Router();
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
      const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const imageExtension = file.originalname.split(".")

    cb(
      null,
      file.fieldname +
        "-" +
        uniqueName +
        `.${imageExtension[imageExtension.length -1]}`
    );
  },
});
const upload = multer({ storage: storage });

//localhost:3000/api/v1/category/createCategory

router.post("/createCategory", upload.single("image"), createCetagory);

module.exports = router;
