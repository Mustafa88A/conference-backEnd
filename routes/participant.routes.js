const express = require("express");
const router = express.Router();
const {
  getAllParticipant,
  getOneParticipant,
  addParticipant,
} = require("../controllers/participant.Control");

router.get("/", getAllParticipant);
router.get("/:id", getOneParticipant);
router.post("/", addParticipant);
module.exports = router;
