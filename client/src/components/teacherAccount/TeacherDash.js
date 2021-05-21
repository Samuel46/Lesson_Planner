import React, { Fragment, useEffect, useState } from "react";
import {
  Book,
  BookOpen,
  Calendar,
  Home,
 
  Power,
  Smile,
  User,
} from "react-feather";
import { Link } from "react-router-dom";
import Alert from "../layouts/Alert";
import {connect}  from 'react-redux'
import PropTypes from "prop-types"
import { fetchLessons , deleteLesson } from "../../actions/lessonPlanner/calender";
import LessonEvents from "./LessonEvents";

import { loadTeacher, logoutTeacher } from "../../actions/auth/authTeacher";



function TeacherDash({authTeacher: {teacher, loading}, calender:{lessonEvents}, logoutTeacher, deleteLesson,  loadTeacher, fetchLessons}) {
  useEffect(() => {
    loadTeacher();
  }, []);
  useEffect(() => {
    fetchLessons(teacher)
  }, [teacher])

  return (
    <Fragment>
      <div
        className="vertical-layout vertical-menu-modern  navbar-floating footer-static  "
        data-open="click"
        data-menu="vertical-menu-modern"
        data-col=""
      >
        {/* BEGIN: Header*/}
        <nav className="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow mt-2">
          <div className="navbar-container d-flex content">
            <div className="bookmark-wrapper d-flex align-items-center">
              <ul className="nav navbar-nav d-xl-none">
                <Link className="nav-item " to="/teacher-dashboard">
                  <a
                    className="nav-link"
                    href="app-email.html"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Teacher Dashboard"
                  >
                    <Home />
                  </a>
                </Link>

                <Link className="nav-item ml-4 " to="/lesson-planner">
                  <a
                    className="nav-link"
                    href="app-email.html"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Lesson Planner"
                  >
                    <Calendar />
                  </a>
                </Link>
              </ul>
              <ul className="nav navbar-nav bookmark-icons"></ul>
              <ul className="nav navbar-nav">
                <li className="nav-item d-none d-lg-block">
                  <a className="nav-link bookmark-star">
                    <i className="ficon text-warning" data-feather="star" />
                  </a>
                  <div className="bookmark-input search-input">
                    <div className="bookmark-input-icon">
                      <i data-feather="search" />
                    </div>
                    <input
                      className="form-control input"
                      type="text"
                      placeholder="Bookmark"
                      tabIndex={0}
                      data-search="search"
                    />
                    <ul className="search-list search-list-bookmark" />
                  </div>
                </li>
              </ul>
            </div>
            <ul className="nav navbar-nav align-items-center ml-auto">
              <li className="nav-item dropdown dropdown-language">
                <a
                  className="nav-link dropdown-toggle"
                  id="dropdown-flag"
                  href="javascript:void(0);"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="flag-icon flag-icon-us" />
                  <span className="selected-language">English</span>
                </a>
              </li>
              <li class="nav-item d-none d-lg-block">
                <a class="nav-link nav-link-style">🌛</a>
              </li>
              <li className="nav-item dropdown dropdown-user">
                <a
                  className="nav-link dropdown-toggle dropdown-user-link"
                  id="dropdown-user"
                  href="javascript:void(0);"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="user-nav d-sm-flex d-none">
                    <span className="user-name font-weight-bolder">
                      { teacher && teacher.surname}
                    </span>
                    <span className="user-status">Teacher</span>
                  </div>
                  <span>
                
              
                
                    
                    <span className="avatar-status-online" />
                  </span>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdown-user"
                >
                  <Link className="dropdown-item" to="#!">
                    <User /> Profile
                  </Link>
                  <Link
                    className="dropdown-item"
                      onClick={() => logoutTeacher()}
                    to="/"
                  >
                    <Power /> Logout
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        {/* END: Header*/}

        {/* BEGIN: Main Menu*/}
        <div
          className="main-menu menu-fixed menu-light menu-accordion menu-shadow"
          data-scroll-to-active="true"
        >
          <div className="navbar-header">
            <ul className="nav navbar-nav flex-row">
              <li className="nav-item mr-auto">
                <a className="navbar-brand">
                  <span className="brand-logo"></span>
                  <h2 className="brand-text">Lesson Planner</h2>
                </a>
              </li>
            </ul>
          </div>
          <div className="shadow-bottom" />
          <div className="main-menu-content">
            <ul
              className="navigation navigation-main"
              id="main-menu-navigation"
              data-menu="menu-navigation"
              s
            >
              <li className=" nav-item">
                <Link
                  className="d-flex align-items-center"
                  to="/teacher-dashboard"
                >
                  <Home />
                  <span
                    className="menu-title text-truncate"
                    data-i18n="Dashboards"
                  >
                    {" "}
                    Teacher Dashboard
                  </span>
                </Link>
              </li>

              <li className=" nav-item">
                <Link
                  className="d-flex align-items-center"
                  to="/lesson-planner"
                >
                  <User />
                  <span
                    className="menu-title text-truncate"
                    data-i18n="Dashboards"
                  >
                    {" "}
                    Lesson Planner
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* END: Main Menu*/}

        {/* BEGIN: Content*/}
        <div className="app-content content ">
          <div className="content-overlay" />
          <div className="header-navbar-shadow" />
          <div className="content-wrapper">
            <div className="content-header row"></div>
            <div className="content-body">
              <Alert />
              {/* Dashboard School Starts */}
              <section id="dashboard-ecommerce">
                <div className="row match-height">
                  {/* Statistics Card */}
                  <div className="col-xl-12 col-md-12 col-12">
                    <div className="card card-statistics">
                      <div className="card-header">
                        <h4 className="card-title">Statistics</h4>
                        <div className="d-flex align-items-center">
                          <p className="card-text font-small-2 mr-25 mb-0">
                            Updated 1 minute ago
                          </p>
                        </div>
                      </div>
                      <div className="card-body statistics-body">
                        <div className="row">
                          <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                            <div className="media">
                              <div className="avatar bg-light-primary mr-2">
                                <div className="avatar-content">
                                  <Smile />
                                </div>
                              </div>
                              <div className="media-body my-auto">
                                <h4 className="font-weight-bolder mb-0">0</h4>
                                <p className="card-text font-small-3 mb-0">
                                  Shared Lessons
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                            <div className="media">
                              <div className="avatar bg-light-info mr-2">
                                <div className="avatar-content">
                                  <Book />
                                </div>
                              </div>
                              <div className="media-body my-auto">
                                <h4 className="font-weight-bolder mb-0">{lessonEvents && lessonEvents.length}</h4>
                                <p className="card-text font-small-3 mb-0">
                                  Lessons
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                            <div className="media">
                              <div className="avatar bg-light-danger mr-2">
                                <div className="avatar-content">
                                  <User />
                                </div>
                              </div>
                              <div className="media-body my-auto">
                                <h4 className="font-weight-bolder mb-0">0</h4>
                                <p className="card-text font-small-3 mb-0">
                                  Classes
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-sm-6 col-12">
                            <div className="media">
                              <div className="avatar bg-light-success mr-2">
                                <div className="avatar-content">
                                  <BookOpen />
                                </div>
                              </div>
                              <div className="media-body my-auto">
                                <h4 className="font-weight-bolder mb-0">0</h4>
                                <p className="card-text font-small-3 mb-0">
                                  Timetable
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*/ Statistics Card */}
                </div>
                <div className="row match-height">
                  {/* Add teacher table */}
                  <div className="col-12">
                    <div className="card">
                      {/* <Alert/> */}
                      <div className="card-header">
                        <h4 className="card-title">Lesson List</h4>
                        <Link to="/lesson-planner" className="btn btn-primary " outline >
          Add Lesson
        </Link>
                      </div>

                      <LessonEvents  lessonEvents={lessonEvents} deleteLesson={deleteLesson}/>
                    </div>
                  </div>
                </div>
              </section>
           
            </div>
          </div>
        </div>
        {/* END: Content*/}
      </div>
    </Fragment>
  );
}

TeacherDash.propTypes = {
  authTeacher: PropTypes.object.isRequired,
  calender: PropTypes.object.isRequired,
  fetchLessons: PropTypes.func.isRequired,
  loadTeacher: PropTypes.func.isRequired,
  logoutTeacher: PropTypes.func.isRequired,
  deleteLesson: PropTypes.func.isRequired,

}
  const mapStateToProps = state => ({
    authTeacher: state.authTeacher,
    calender: state.calender,
   
    
  })


export default connect(mapStateToProps, {fetchLessons, loadTeacher, deleteLesson, logoutTeacher}) (TeacherDash);
