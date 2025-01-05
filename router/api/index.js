const express = require("express");
const router = express.Router();
const auth = require("./auth");
//localhost:3000/api/v1/auth/
http: router.use("/auth", auth);
module.exports = router;
