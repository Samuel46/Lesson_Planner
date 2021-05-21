const express = require('express');
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const auth = require("../../../middleware/auth")
// import  the teacher model
const Teacher = require('../../../models/teacher/Teacher')


// @Route   Post api/teacher/teacher
// @Desc    Registaration of teachers by the school
// Access   @@ Public

router.post('/', [auth ,[
    check('firstName', 'fisrtName is required!').not().isEmpty(),
    check('email', 'Email is required!').isEmail(),
    check('password', 'Password is required!').isLength({ min: 6 }),
    check('surname', 'Surname is required!').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })

    }

    const { firstName, email, password, surname, avatar} = req.body
 
    // Bulilding teacher object
    const teacherFields = {}
    teacherFields.school = req.school.id
    if (firstName) teacherFields.firstName = firstName;
    if (email) teacherFields.email = email;
    if (password) teacherFields.password = password;
    if (surname) teacherFields.surname = surname;
    if (avatar) teacherFields.avatar = avatar;
    

    try {
    
        // See if teacer exists
        let teacher = await Teacher.findOne({ email });

        if (teacher) {
             // update the teacher by the school
             teacher = await Teacher.findOneAndUpdate({email}, 
                {$set: teacherFields},
                {new: true})
                return res.json(teacher)
        }
        else {
            // Create the new teacher by the school
            teacher = new Teacher(teacherFields)
            // @@@@@to-do Encrypt password
            const saltt = await bcrypt.genSalt(10);
            teacher.password = await bcrypt.hash(password, saltt);
            //   Save the teacher to the database
            await teacher.save();

            // Return jsonwebtoken
            const payload = {
                teacher: {
                    id: teacher.id
                }
            }

            jwt.sign(payload, config.get('jwtTeacherSecret'), { expiresIn: 36000, }, (err, token) => {
                if (err) console.log(err, 'samuel testing');
                res.json({ token })
            })
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever error")
    }
})



module.exports = router;
