const storeModel = require("../model/storeModel");

const storeController = async (req, res) => {
  const { name, description, products, location, contact } = req.body;
  const { filename } = req.file;

  // const images = req.files.map((item)=> `${process.env.IMAGE_URL}  ${item.filename}`)

  try {
    const store = new storeModel({
      name,
      description,
      image: process.env.IMAGE_URL + filename,
      products,
      contact,
      location,
    });
    await store.save();
    return res.status(201).send({
      success: true,
      message: "store created successfully",
      store,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: error.message || error });
  }
};

module.exports = { storeController };
