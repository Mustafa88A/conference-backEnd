const { default: mongoose } = require("mongoose");
const research = require("../models/ResearchSchema");
// const category = require("../models/Category");

async function getAllResearch(req, res, next) {
  try {
    const getResearch = await research.find().populate("category", "name");
    res.status(201).json(getResearch);
  } catch (error) {
    next(error);
  }
}

async function getOneResearch(req, res, next) {
  try {
    const id = req.params.id;
    const oneResearch = await research.findById({ id });
    res.status(201).json(oneResearch);
  } catch (error) {
    next(error);
  }
}

async function pendingForms(req, res, next) {
  try {
    // استخراج الحالة من معلمات الاستعلام أو تعيين قيمة افتراضية
    const { status } = req.query;
    const query = status ? { status } : { status: "pending" };

    // تنفيذ الاستعلام
    const pForm = await research.find(query);
    res.status(200).json(pForm);
  } catch (error) {
    console.error("Error fetching pending forms:", error.message);
    next(error);
  }
}

async function getResearchByCategory(req, res, next) {
  try {
    const id = req.body.id;
    const byCategory = await research.find({ category: id });
    res.status(201).json(byCategory);
  } catch (error) {
    next(error);
  }
}

async function createResearch(req, res, next) {
  try {
    const fileUpload = req.file;
    if (!fileUpload) {
      throw new Error("file not found");
    }
    const fileUrl = "uploads/" + fileUpload.filename;
    const newFile = await research.create({
      ...req.body,
      file: fileUrl,
    });
    console.log("new file", newFile);

    res.status(201).json(newFile);
  } catch (error) {
    next(error);
  }
}

async function statusResearch(req, res, next) {
  try {
    const id = req.params.id;
    console.log("id", id);

    const state = req.body;
    console.log("state", state);

    const form = await research.findByIdAndUpdate(id, state, { new: true });
    console.log("form", form);

    res.status(201).json(form);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  getAllResearch,
  getOneResearch,
  pendingForms,
  getResearchByCategory,
  createResearch,
  statusResearch,
};
