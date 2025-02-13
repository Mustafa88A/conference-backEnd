const express = require("express");
const router = express.Router();
const {
  getAdmin,
  getUserM,
  signUpAdmin,
  loginAdmin,
} = require("../controllers/admin.Control");

// const { Token, authorizeRole } = require("../middleware/auth");
const { authenticateAdmin } = require("../middleware/auth");

router.get("/", getAdmin);
router.get("/user", getUserM);
router.post("/signup", signUpAdmin);
router.post("/login-admin", authenticateAdmin, loginAdmin);

module.exports = router;
