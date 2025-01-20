const cetagoryModel = require("../model/cetagoryModel");
const filePath = process.env.IMAGE_URL; 

const createCetagory = async (req, res) => {
  const { name,  description } = req.body;

  const category = new cetagoryModel({
    name,
    image: filePath +req.file.filename,
    description,
  });
  await category.save();
  return res.status(201).send({success:true,error:false,message:"Category created successfully",category});
};
module.exports = { createCetagory };
