const Admin = require("../models/AdminSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function generatedToken(admin) {
  const payload = {
    id: admin._id,
    username: admin.username,
    email: admin.email,
    phone: admin.phone,
    // isAdmin: admin.isAdmin,
  };
  console.log("payload for Admin", payload);

  const token = jwt.sign(payload, process.env.SECRET_KEY);
  return token;
}

async function getAdmin(req, res, next) {
  try {
    const allAdmin = await Admin.find();
    res.status(201).json(allAdmin);
  } catch (error) {
    next(error);
  }
}

async function signUpAdmin(req, res, next) {
  try {
    const { password, username, email, phone } = req.body;

    if (!password || !username || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    const addAdmin = await Admin.create(req.body);
    const generateToken = generatedToken(addAdmin);
    res.status(201).json({ generateToken });
  } catch (error) {
    next(error);
  }
}

async function loginAdmin(req, res, next) {
  try {
    const user = req.admin;
    const generateToken = generatedToken(user);
    res.status(201).json({ generateToken });
    // console.log("log", generateToken);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAdmin,
  signUpAdmin,
  loginAdmin,
};
