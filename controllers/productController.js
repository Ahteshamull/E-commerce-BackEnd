const productsModel = require("../model/productsModel");

const productController = async (req, res) => {
  const {
    name,
    description,
    cetagory,
    sellingPrice,
    discountPrice,
    stock,
    store,
  } = req.body;
 const images = req.files.map(
   (item) => `${process.env.IMAGE_URL}  ${item.filename}`
 );
  try {
    const product = new productsModel({
      name,
      description,
      image: images,
      cetagory,
      sellingPrice,
      discountPrice,
      stock,
      store,
    });
    await product.save();
    return res.status(201).send({
      success: true,
      message: "product created successfully",
      product,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: error.message || error });
  }
};

module.exports = { productController };
