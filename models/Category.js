const { model, Schema } = require("mongoose");

const Category = new Schema({
  name: {
    type: String,
    require: true,
  },
});

const category = model("category", Category);
module.exports = category;
