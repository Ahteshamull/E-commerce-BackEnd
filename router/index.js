const express = require("express");
const router = express.Router()
const baseurl = process.env.BASE_URL
const api = require("./api")
//localhost:3000/api/v1/
http: router.use(baseurl, api);
module.exports = router