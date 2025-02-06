const participant = require("../models/participant");
//التحقق من الاضافه
async function getAllParticipant(req, res, next) {
  try {
    const getParticipant = await participant.find();
    res.status(201).json(getParticipant);
  } catch (error) {
    next(error);
  }
}

async function getOneParticipant(req, res, next) {
  try {
    const id = req.params.id;
    const oneParticipant = await participant.findById(id);
    res.status(201).json(oneParticipant);
  } catch (error) {
    next(error);
  }
}

async function addParticipant(req, res, next) {
  try {
    const { users } = req.body; // نتوقع مصفوفة من الكائنات

    const addUser = await participant.insertMany(users);
    res.status(201).json(addUser);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllParticipant,
  getOneParticipant,
  addParticipant,
};
