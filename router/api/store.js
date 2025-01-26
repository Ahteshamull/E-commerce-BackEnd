const express = require("express");
const { storeController } = require("../../controllers/storeController");
const {
  errorCheck,
  upload,
} = require("../../middleware/imageControlMiddleware");
const router = express.Router();

router.post(
  "/productStore",
  errorCheck,
  upload.single("image"),
  storeController
);

module.exports = router;
//localhost:3000/api/v1/store/productStore
