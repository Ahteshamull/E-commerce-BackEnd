const productsModel = require("../model/productsModel");
const cetagoryModel = require("../model/cetagoryModel");
const storeModel = require("../model/storeModel");

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
    const createProduct = new productsModel({
      name,
      description,
      image: images,
      cetagory,
      sellingPrice,
      discountPrice,
      stock,
      store,
    });
    await createProduct.save();
    await cetagoryModel.findOneAndUpdate(
      { _id: cetagory },
      { $push: { products: createProduct._id } },
      { new: true }
    );
    await storeModel.findOneAndUpdate(
      { _id: store },
      { $push: { products: createProduct._id } },
      { new: true }
    );
    return res.status(201).send({
      success: true,
      message: "product created successfully",
      createProduct,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: error.message || error });
  }
};

module.exports = { productController };
