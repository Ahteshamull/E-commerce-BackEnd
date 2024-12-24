const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const registrationController = async (req, res) => {
  let { name, email, password } = req.body;
  bcrypt.hash(password, 10, async function (err, hash) {
    if (err) {
      console.log(err);
    } else {
      const user = new userModel({
        name,
        email,
        password: hash,
      });
      await user.save();
      res.send(user);
    }
  });
};
const loginController = (req, res) => {
  res.send("login");
};
module.exports = { registrationController, loginController };
