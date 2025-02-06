const { model, Schema } = require("mongoose");
const Participant = new Schema({
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
});

const participant = model("participant", Participant);
module.exports = participant;
