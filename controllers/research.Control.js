const research = require("../models/ResearchSchema");
const category = require("../models/Category");

const getResearchChart = async (req, res, next) => {
  try {
    const totalCount = await research.countDocuments();

    // الحصول على الأبحاث حسب الفئات من جدول الفئات
    const medicalCategory = await category.findOne({ name: "Medicine" });
    const medicalTechniquesCategory = await category.findOne({
      name: "Medical_techniques",
    });
    const computerTechnologiesCategory = await category.findOne({
      name: "Computer_technologies",
    });

    console.log("Medical Category:", medicalCategory);
    console.log("Medical Techniques Category:", medicalTechniquesCategory);
    console.log(
      "Computer Technologies Category:",
      computerTechnologiesCategory
    );

    // حساب الأبحاث بناءً على الفئات باستخدام _id الصحيح
    const medicalCount = medicalCategory
      ? await research.countDocuments({ category: medicalCategory._id })
      : 0;

    const medicalTechniquesCount = medicalTechniquesCategory
      ? await research.countDocuments({
          category: medicalTechniquesCategory._id,
        })
      : 0;

    const computerTechnologiesCount = computerTechnologiesCategory
      ? await research.countDocuments({
          category: computerTechnologiesCategory._id,
        })
      : 0;

    res.status(200).json({
      total_Research: totalCount,
      medical_Research: medicalCount,
      medical_Techniques_Research: medicalTechniquesCount,
      computer_Technologies_Research: computerTechnologiesCount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getResearchChart;

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
    if (!req.file) {
      return next(new Error("File not found")); // Use return to stop execution
    }

    const fileUrl = "uploads/" + req.file.filename;
    const participantData = JSON.parse(req.body.participant);
    const newResearch = await research.create({
      ...req.body,
      file: fileUrl,
      participant: participantData,
    });

    console.log("New research created:", newResearch);
    res.status(201).json(newResearch);
  } catch (error) {
    next(error);
  }
}

async function statusResearch(req, res, next) {
  try {
    const id = req.params.id;
    console.log("id", id);

    const state = req.body["state"];
    console.log("state", state);

    const form = await research.findByIdAndUpdate(
      id,
      { status: state },
      { new: true }
    );
    console.log("form", form);

    res.status(200).json(form);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  getAllResearch,
  getOneResearch,
  getResearchChart,
  pendingForms,
  getResearchByCategory,
  createResearch,
  statusResearch,
};
