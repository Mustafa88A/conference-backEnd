const express = require("express");
const router = express.Router();
const {
  getAllResearch,
  getResearchByCategory,
  pendingForms,
  createResearch,
  getOneResearch,
  statusResearch,
} = require("../controllers/research.Control");
const { fileUpload } = require("../middleware/uploads");
router.get("/", getAllResearch);
//get one research by id
router.get("/:id", getOneResearch);
//get all research by category
router.get("/category", getResearchByCategory);
//get all research status pending
router.get("/pending", pendingForms);

// router.post("/", createResearch);
router.post("/", fileUpload.single("file"), createResearch);

//updeted status to rej or app
router.patch("/form/:id", statusResearch);
module.exports = router;
