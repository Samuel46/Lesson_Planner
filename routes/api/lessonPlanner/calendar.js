const express = require("express");
const router = express.Router();
const authTeacher = require("../../../middleware/authTeacher");
const { check, validationResult } = require("express-validator");
const Calendar = require("../../../models/lessonPlanner/Calender");

// @route POST api/lessonPlanner/calendar
// @descri    Creating new lesson event
// @access private

router.post(
  "/",

  [
    authTeacher,
    [check("title", "The title is required").not().isEmpty()],
    [check("start", "The starting date is required").not().isEmpty()],
    [check("end", "The ending date is required").not().isEmpty()],
    [check("description", "Description is required").not().isEmpty()],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      
      title,
      start,
      end,
      allDay,
      calenderType,
      guests,
      description,
      id
      
    } = req.body;

    console.log(req.body)

    // Bulilding a lesson even object
    const lessonFields = {};
    // we much check if the teacher is linked to a specific school from there we can add the relavant ID school || teacher to the lesson object

    lessonFields.teacher = req.teacher.id;
    // if the teacher is linked to a specific school
    lessonFields.school = req.body.school;
   
    if (id) lessonFields.id = id

    if (title) lessonFields.title = title;
    if (start) lessonFields.start = start;
    if (end) lessonFields.end = end;
    if (allDay) lessonFields.allDay = allDay;
    if (description) lessonFields.description = description;
    if (calenderType) lessonFields.calenderType = calenderType;
    if (guests) lessonFields.guests = guests;
    


    try {
      // TO DO implemant the update functionality in this object
      // check weather the lesson exists
      let lesson = await Calendar.findOne({ title });

      if (lesson) {

        lesson = await Calendar.findOneAndUpdate({title}, 
          {$set: lessonFields},
          {new: true})
         
          return res.json(lesson)
          
     
      } else {
        //   create new lesson object
        lesson = new Calendar(lessonFields);
        // saving the new lesson even to the database
        await lesson.save();
        // return the new class object
        res.json({ lesson });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @Route Get   api/lessonPlanner/calender
// @Descri      fetch all lessonEvents
// @Access      Private
router.get("/", authTeacher, async (req, res, getState) => {
  try {
    const lessonEvents = await Calendar.find({teacher: req.teacher.id}).populate("teacher", [
      "surname",
      "email",
    ]);

 

    res.json(lessonEvents);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// // @Route Get   api/lessonPlanner/calender
// @Descri         Get LessonEvent by ID
// @Access         Private
router.get("/:id", authTeacher, async (req, res) => {
  try {
    const lessonPlannerId = await Calendar.findById(req.params.id).populate(
      "teacher",
      ["surname", "email"]
    );
    if (!lessonPlannerId) {
      return res.status(404).json({ msg: "Lesson not found" });
    }

    res.json(lessonPlannerId);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Lesson not found *" });
    }
    res.status(500).send("Server Error");
  }
});

// @route Delete api/lessonPlanner/calendar/:id
// description: Delete lesson events by ID
// @access private

router.delete("/:id", authTeacher, async (req, res) => {
  try {
      const deleteLesson = await Calendar.findById(req.params.id);
      if (!deleteLesson) {
          return res.status(404).json({ msg: "Lesson not found" });
      }
      await deleteLesson.remove();
      res.json({ msg: "Lesson removed" });
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});




module.exports = router;
