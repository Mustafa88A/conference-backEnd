const express = require("express");
const router = express.Router();
const {
  getAllCategory,
  oneCategory,
  addCategory,
} = require("../controllers/category.Conterol");

router.get("/category", getAllCategory);
router.get("/category/:id", oneCategory);
router.post("/category", addCategory);

module.exports = router;
