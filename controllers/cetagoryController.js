const cetagoryModel = require("../model/cetagoryModel");

const createCetagory = async (req, res) => {
  const { name, image, description } = req.body;
  console.log(req.file)
  res.send(req.body);
};
module.exports = { createCetagory };
