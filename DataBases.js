const mongoose = require("mongoose");
const DataBases = async () => {
  try {
    const db = await mongoose.connect(`${process.env.Conference}`);
    console.log(`db is connected on port 7800 ${db.connection.host}`);
  } catch (error) {
    console.log("something", error);
  }
};
module.exports = DataBases;
//secret key      "ZzAaQq4545ZzAaQq"
