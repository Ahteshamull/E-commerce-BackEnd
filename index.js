const express = require("express");
require("dotenv").config();
const router = require("./router");
const dbConnect = require("./config/databaseConnect");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();
app.use(router);
//http://localhost:3000

app.use((req, res) => {
  return res.status(404).send("404 Not Found");
});
app.listen(process.env.SERVER_PORT || 8080, () => {
  console.log("Server Is Running");
});
