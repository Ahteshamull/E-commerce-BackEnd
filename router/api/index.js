const express = require("express");
const router = express.Router();
const auth = require("./auth");
const category = require("./category");

//localhost:3000/api/v1/auth/
http: router.use("/auth", auth);
//localhost:3000/api/v1/category/
http: router.use("/category", category);
module.exports = router;
