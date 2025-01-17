const express = require("express");
require("dotenv").config();
const path = require("path");
const router = require("./router");
const dbConnect = require("./config/databaseConnect");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
dbConnect();
app.use(router);
//http://localhost:3000
app.use("/images", express.static("uploads"));
//http://localhost:3000/images/
app.get("/images", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "uploads"));
});
app.use((req, res) => {
  return res.status(404).send("404 Not Found");
});
app.listen(process.env.SERVER_PORT || 8080, () => {
  console.log("Server Is Running");
});


//info://localhost:3000/api/v1/auth/