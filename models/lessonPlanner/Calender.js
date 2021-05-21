const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId
const CalendarSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "school",
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
  },
  id:{
    type: String
   
   
  
  },

  date: {
    type: Date,
    default: Date.now,
  },

  url: {
    type: String,
  },
  title: {
    type: String,
  },
  start: {
    type: Date,
    require: true,
  },
  end: {
    type: Date,
    require: true,
  },
  allDay: {
    type: Boolean,
  },
  description: {
    type: String,
    require: true,
  },

  calenderType: {
    type: String,
  },
  guests: {
    type: [String],
  },
});

module.exports = Calendar = mongoose.model("calendar", CalendarSchema);
