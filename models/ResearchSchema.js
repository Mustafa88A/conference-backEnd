const { model, Schema } = require("mongoose");
const category = require("./Category");

const Research = new Schema({
  title: {
    type: String,
    require: true,
  },
  nameOfResearch: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    match: /^\S+@\S+\.\S+$/,
    unique: true,
  },
  phone: {
    type: String,
    require: true,
    min: 11,
    unique: true,
  },
  city: {
    type: String,
  },
  university: {
    type: String,
  },
  college: {
    type: String,
  },
  summary: {
    type: String,
  },
  file: {
    type: String,
  },
  // the Researchs
  participant: [
    {
      username: {
        type: String,
      },

      coaction: {
        type: String,
        validate: {
          validator: function (value) {
            // تحقق إذا كان إما بريد إلكتروني أو رقم هاتف
            const emailRegex = /^\S+@\S+\.\S+$/;
            const phoneRegex = /^\d{11}$/; // رقم هاتف مكون من 11 رقمًا
            return emailRegex.test(value) || phoneRegex.test(value);
          },
          message: "coaction must be a valid email or phone number",
        },
      },
      cityParticipant: {
        type: String,
      },
      universityParticipant: {
        type: String,
      },
    },
  ],
  status: {
    type: String,
    default: "pending",
    //"approved", "rejected"
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    require: true,
  },
});

const research = model("research", Research);
module.exports = research;
