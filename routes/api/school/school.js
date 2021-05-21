// Registering the school
const express = require("express")
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config')

const {check, validationResult} = require("express-validator")
const School = require("../../../models/admin/School")

// @ Route Post  api/school/school
// Registering the school into our app
// @ access public- anyone whose willing to use the app
router.post(
    "/",
    [
      check("schoolName", "School name is required!").not().isEmpty(),
      check("name", "Username is required").not().isEmpty(),
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { schoolName, email, name, password } = req.body;
  
      try {
        // see if user exists
        let school = await School.findOne({ schoolName });
  
        if (school) {
            
          return res
            .status(400)
            .json({ errors: [{ msg: "School already exists" }] });
        }
  
        school = new School({
          schoolName,
          email,
          name,
          password,
        });
        // encrpt the password
        const salt = await bcrypt.genSalt(10);
  
        school.password = await bcrypt.hash(password, salt);
        await school.save(); 
  
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
            expiresIn: 36000,
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
  