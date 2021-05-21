import "./App.css";

// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import SchoolDash from "./components/schoolAccount/SchoolDash";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { Fragment, useEffect } from "react";
import AddTeacher from "./components/schoolAccount/AddTeacher";
import setSchoolToken from "./utils/setSchoolToken";
import { loadSchool } from "./actions/auth/authSchool";
import setTeacherToken from "./utils/setTeacherToken";
import { loadTeacherSchool } from "./actions/auth/authTeacherSchool";
import { loadTeacher } from "./actions/auth/authTeacher";
import EditTeacher from "./components/schoolAccount/editTeacher/EditTeacher";
import TeacherDash from "./components/teacherAccount/TeacherDash";
import LessonPlanner from "./components/teacherAccount/calender/LessonPlanner";
import Calender from "./components/teacherAccount/calender";
import AuthSchoolRoute from "./components/routing/AuthSchoolRoute";
import AuthTeacherRoute from "./components/routing/AuthTeacherRoute";
// import EditTeacher from "./components/schoolAccount/EditTeacherForm";
// import TeacherForm from "./components/schoolAccount/TeacherForm";

if (localStorage.token) {
  setSchoolToken(localStorage.token);
}
if (localStorage.token) {
  setTeacherToken(localStorage.token);
}

if (localStorage.token) {
  setTeacherToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadTeacher());
  }, []);
  useEffect(() => {
    store.dispatch(loadSchool());
  }, []);
  useEffect(() => {
    store.dispatch(loadTeacherSchool());
  }, []);

  

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/*  */}
          <Route exact path="/" component={Login} />

          <Switch>
            <Route exact path="/register" component={Register} />
            <AuthSchoolRoute exact path="/school-dash" component={SchoolDash} />
            <Route exact path="/edit-teacher/:id" component={EditTeacher} />
            <AuthTeacherRoute exact path="/teacher-dashboard" component={TeacherDash} />
            <AuthTeacherRoute exact path="/lesson-planner" component={Calender} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
