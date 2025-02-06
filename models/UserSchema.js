const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  scientificTitle: {
    type: String,
  },
  email: {
    type: String,
    require: true,
    match: /^\S+@\S+\.\S+$/,
  },
  phone: {
    type: String,
    min: 11,
    mix: 11,
    require: true,
  },
  password: {
    type: String,
    require: true,
    min: 4,
    mix: 10,
  },
});

const user = model("user", UserSchema);
module.exports = user;
