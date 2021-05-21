const mongoose = require('mongoose')

const SchoolSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    schoolName: {
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

      date: {
        type: Date,
        default: Date.now,
      },
})

module.exports = School = mongoose.model("school", SchoolSchema);