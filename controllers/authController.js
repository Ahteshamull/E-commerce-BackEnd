const EmailValidateCheck = require("../helpers/emailValidate");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registrationController = async (req, res) => {
  let { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(404).send({ error: "Field Is Required" });
  }

  if (!EmailValidateCheck(email)) {
    return res.status(404).send({ error: "Invalid Email" });
  }
  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(404).send({ error: "Email Already In Use" });
  }

  try {
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        console.log(err);
      } else {
        const user = new userModel({
          name,
          email,
          password: hash,
          role,
        });
        await user.save();
        res.send(user);
      }
    });
  } catch (error) {
    return res.status(404).send({ error });
  }
};
const loginController = async (req, res) => {
  let { email, password } = req.body;
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    bcrypt.compare(password, existingUser.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          { email: existingUser.email, role: existingUser.role },
          process.env.PRV_TOKEN,
          {
            expiresIn: "1h",
          }
        );
        return res
          .status(200)
          .send({
            success: "Login Successfully",
            existingUser: {
              name: existingUser.name,
              email: existingUser.email,
              role: existingUser.role,
            },
            token,
          });
      } else {
        return res.status(404).send({ err: "Invalid Password" });
      }
    });
  } else {
    return res.status(404).send({ error: "You Have Don't Any Account" });
  }
};
module.exports = { registrationController, loginController };
