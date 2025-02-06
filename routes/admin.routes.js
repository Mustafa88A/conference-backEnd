const express = require("express");
const router = express.Router();
const {
  getAdmin,
  signUpAdmin,
  loginAdmin,
} = require("../controllers/admin.Control");

// const { Token, authorizeRole } = require("../middleware/auth");
const { authenticateAdmin } = require("../middleware/auth");

router.get("/", getAdmin);
router.post("/signup", signUpAdmin);
router.post("/login-admin", authenticateAdmin, loginAdmin);

module.exports = router;
