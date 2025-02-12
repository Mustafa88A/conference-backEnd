const { model, Schema } = require("mongoose");

const Admin = new Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    match: /^\S+@\S+\.\S+$/,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    require: true,
    min: 4,
    mix: 12,
  },
  type: {
    type: String,
    enum: ["superAdmin", "resident"],
  },
});

const admin = model("admin", Admin);
module.exports = admin;
