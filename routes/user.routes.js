const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getOneUser,
  signUp,
  login,
} = require("../controllers/user.Control");
// const { Token } = require("../middleware/auth");

router.get("/", getAllUser);
router.get("/:id", getOneUser);

router.post("/signup", signUp);
router.post("/login", login);

module.exports = router;
