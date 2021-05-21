const express = require("express")
const router = express.Router();
const bcrypt = require('bcryptjs')
const auth = require ('../../../../middleware/auth')
const School = require("../../../../models/admin/School")

const jwt = require("jsonwebtoken")
const config = require("config")

const { check, validationResult} = require('express-validator')

// @route Get api/school/auth/authSchool
// description Getting the logged in School user
// @access private
router.get("/", auth, async (req, res) => {
    try {
      const school = await School.findById(req.school.id).select("-password");
      
      res.json(school);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });



// @route POST api/school/auth/authSchool
// Login Users and get token
// @access public
router.post(
    "/",
    [
      check("email", "Please include a valid email").isEmail(),
      check('password', 'Password is required').isLength({ min: 6 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        let school = await School.findOne({ email });
  
        if (!school) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
  
        const isMatch = await bcrypt.compare(password, school.password);
  
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
  
        // Return  Jsonwentoken
  
        const payload = {
          school: {
            id: school.id,
          },
        };
  
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          {
            expiresIn: 360000000,
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  );
  
  module.exports = router;
  