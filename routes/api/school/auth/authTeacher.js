const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// import the teacher model

const Teacher = require("../../../../models/teacher/Teacher");

// @Route Get   api/school/auth/authTeacher
// @Descri      Get auth teacher@@@ who's linked to a certain school
// @Access      Private
router.get("/", auth, async (req, res) => {
  try {
    const teacher = await Teacher.find({ school: req.school.id }).select(
      "-password"
    ).populate("school", ["name", "schoolName"]);
    
    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});




// @Route   Post api/school/auth/authTeacher
// @Desc    Login in the the liked teacher from thschool account
// Access   Private

router.post(
  "/",
  [
    check("email", "Email is required Teacher").isEmail(),
    check("password", "Password is required teacher").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // See if user exists
      let teacher = await Teacher.findOne({ email });

      if (!teacher)
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      const isMatch = await bcrypt.compare(password, teacher.password);

      if (!isMatch)
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

      // Return jsonwebtoken
      const payload = {
        teacher: {
          id: teacher.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtTeacherSecret"),
        { expiresIn: 36000000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Sever error");
    }
  }
);

// get teacher via ID

// @Route Get   api/school/auth/authTeacher
// @Descri      Get teacher by Id @@school level
// @Access      Private
router.get('/:id', auth , async (req, res) => {

  try {

      const getTeaherById = await Teacher.findById(req.params.id).populate("school", ["schoolName", "name"]);
      if (!getTeaherById) {
          return res.status(404).json({ msg: "Teacher not found" });
      }

      res.json(getTeaherById)
  } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
          return res.status(404).json({ msg: "Teacher not available" });
      }
      res.status(500).send('Server Error');
  }
})

// delete teacher

// @route Delete api/school/auth/authTeacher
// description: Delete teacher by ID
// @access private

router.delete("/:id", auth, async (req, res) => {
  try {
      const deleteTeacher = await Teacher.findById(req.params.id);
      if (!deleteTeacher) {
          return res.status(404).json({ msg: "Teacher not found" });
      }
      await deleteTeacher.remove();
      res.json({ msg: "Teacher Deleted" });
  } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
          return res.status(404).json({ msg: "Teacher not available" });
      }
      res.status(500).send("Server Error");
  }
});


module.exports = router;