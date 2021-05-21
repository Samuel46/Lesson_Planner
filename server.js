const express = require("express");
const connectDB = require("./config/db");
const path = require('path')
// Initialize the application
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Define app routes
// @@@ school registration routes
app.use("/api/school/school", require("./routes/api/school/school"));

// teacher registration by the school
app.use("/api/school/teacher", require("./routes/api/school/teacher"));
// login
app.use(
  "/api/school/auth/authSchool",
  require("./routes/api/school/auth/authSchool")
);
// to the the teacher linked to a particuler school
app.use(
  "/api/school/auth/authTeacher",
  require("./routes/api/school/auth/authTeacher")
);

// getTeacher by Id
// app.use("/api/school/auth/authTeacher"), require('./routes/api/school/auth/authTeacher')

// @@@ teacher registation route

app.use("/api/teacher/teacher", require("./routes/api/teacher/teacher"));
// login for both schopl teachers and individual teachers
app.use(
  "/api/teacher/authTeacher",
  require("./routes/api/teacher/authTeacher")
);

// creating a new lessson event using the calendar module

app.use(
  "/api/lessonPlanner/calendar",
  require("./routes/api/lessonPlanner/calendar")
);

//  Server static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


// Listerner
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
