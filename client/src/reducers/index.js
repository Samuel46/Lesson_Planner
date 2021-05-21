import { combineReducers } from "redux";
import alert from "./alert";
import authSchool from "./auth/authSchool";
import authTeacher from "./auth/authTeacher";
import authTeacherSchool from "./auth/authTeacherSchool";
import calender from "./lessonPlanner/calender";

export default combineReducers({
  alert,
  authSchool,
  authTeacher,
  authTeacherSchool,
  calender,
});
