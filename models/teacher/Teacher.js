const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "school",
  },
  firstName: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: { type: String },

  role: {
    type: String,
  },
  status: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Teacher = mongoose.model("teacher", TeacherSchema);
