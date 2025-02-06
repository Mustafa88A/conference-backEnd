const category = require("../models/Category");
// اضافه كونترول لاضافه فئة جديدة
async function getAllCategory(req, res, next) {
  try {
    const allCategory = await category.find();
    res.status(201).json(allCategory);
  } catch (error) {
    next(error);
  }
}

async function oneCategory(req, res, next) {
  try {
    const id = req.params.id;
    const oneCat = await category.findById(id);
    res.status(201).json(oneCat);
  } catch (error) {
    next(error);
  }
}

async function addCategory(req, res, next) {
  try {
    const newCategory = await category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllCategory,
  oneCategory,
  addCategory,
};
