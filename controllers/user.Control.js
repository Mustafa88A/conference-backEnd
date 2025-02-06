const user = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generatedToken(user) {
  const payload = {
    id: user._id,
    username: user.username,
    scientificTitle: user.scientificTitle,
    email: user.email,
    phone: user.phone,
  };
  console.log("payload", payload);

  const token = jwt.sign(payload, process.env.SECRET_KEY);
  console.log("token", token);

  return token;
}

async function getAllUser(req, res, next) {
  try {
    const AllUser = await user.find();
    res.status(201).json(AllUser);
  } catch (error) {
    next(error);
  }
}

async function getOneUser(req, res, next) {
  try {
    const id = req.params;
    const oneUser = await user.findById(id);
    req.status(201).json(oneUser);
  } catch (error) {
    next(error);
  }
}

async function signUp(req, res, next) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const newUserData = {
      ...req.body,
    };

    const addUser = await user.create(newUserData);

    const generateToken = generatedToken(addUser, "user");
    console.log("add user", addUser);

    res.status(201).json({ generateToken });
    console.log("token", generateToken);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const user = req.body;
    const generateToken = generatedToken(user);
    res.status(201).json({ generateToken });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUser,
  getOneUser,
  signUp,
  login,
};
