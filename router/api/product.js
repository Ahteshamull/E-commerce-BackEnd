const express = require("express");
const { productController } = require("../../controllers/productController");
const router = express.Router();
const { errorCheck, upload } = require("../../middleware/imageControlMiddleware");



router.post(
  "/createProduct",
  errorCheck,
  upload.array("image"),
  productController
);
module.exports = router;
//localhost:3000/api/v1/product/createProduct
