import React, { Fragment, useEffect, useState } from "react";
import {
  Book,
  BookOpen,
  Box,
  Calendar,
  Circle,
  Disc,
  DollarSign,
  Home,
  Mail,
  Menu,
  MessageSquare,
  Moon,
  Power,
  Smile,
  Star,
  StopCircle,
  TrendingUp,
  User,
  X,
} from "react-feather";
 
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutSchool } from "../../actions/auth/authSchool";
import { Link } from "react-router-dom";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import TeacherForm from "./TeacherForm";
import { getTeachers } from "../../actions/auth/authTeacherSchool";
import TeacherTable from "./TeacherTable";

import Alert  from '../layouts/Alert'
import Avatar from "../../@core/components/avatar";

function SchoolDash({ logoutSchool , getTeachers, teachers, authSchool:{school}}) {
  const [img, setImg] = useState(null)
  
  // fetch all the register teachers
  useEffect(() => {
     getTeachers()
     
  }, [getTeachers])

  const [basicModal, setBasicModal] = useState(false)
  const [editTeacherModal, setEditTeacherModal] = useState(false)

   // edit teacher
   const onClick = (e) => {
    e.preventDefault();
    setEditTeacherModal(!editTeacherModal)
  };

  const renderUserAvatar = () => {
    if (img === null) {
      const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
          className='rounded mr-1'
        //   content={.fullName}
          content={school.name}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(36px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '55px',
            width: '60px'
          }}
        />
      )
    } else {
      return (
        <img
          className='user-avatar rounded mr-2 my-25 cursor-pointer'
          src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
          // scr={img}
          alt='user profile avatar'
          height='90'
          width='90'
        />
      )
    }
  }

  return (
    <Fragment>
      {/*  add teacher model */}
      <div className='vertically-centered-modal'>
       <Modal isOpen={basicModal} toggle={() => setBasicModal(!basicModal)}>
          <ModalHeader toggle={() => setBasicModal(!basicModal)}>Add Teacher</ModalHeader>
          <ModalBody>
           <TeacherForm/>
          </ModalBody>
         
        </Modal>
        </div>

    


      
    <div
      className="vertical-layout vertical-menu-modern  navbar-floating footer-static  "
      data-open="click"
      data-menu="vertical-menu-modern"
      data-col=""
    >
      {/* BEGIN: Header*/}
      <nav className="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow mb-5">
        <div className="navbar-container d-flex content">
        <div className="bookmark-wrapper d-flex align-items-center">
        <ul className="nav navbar-nav d-xl-none">
          
          <li className="nav-item "><Link className="nav-link" to="/school-dash" data-toggle="tooltip" data-placement="top" title="Dashboard"><Home/></Link></li>


          
        </ul>
      
        <ul className="nav navbar-nav">
          <li className="nav-item d-none d-lg-block"><a className="nav-link bookmark-star"><i className="ficon text-warning" data-feather="star" /></a>
       
        
            
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
            <li class="nav-item d-none d-lg-block"><a class="nav-link nav-link-style">🌛</a></li>
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
                  <span className="user-name font-weight-bolder">{school.name}</span>
                  <span className="user-status">Admin</span>
                </div>
                <span >
                 {renderUserAvatar()}
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
                  onClick={() => logoutSchool()}
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
                <h2 className="brand-text">Dashboard</h2>
              </a>
            </li>
           
          </ul>
        </div>
        <div className="shadow-bottom" />
        <div className="main-menu-content">
          <ul
            className="navigation navigation-main"
            id="main-menu-navigation"
            data-menu="menu-navigation"s
          >
            <li className=" nav-item">
              <Link className="d-flex align-items-center" to="#!">
                <Home />
                <span
                  className="menu-title text-truncate"
                  data-i18n="Dashboards"
                >
                  {" "}
                  Home 🏩
                </span>
              </Link>
              
            </li>

            {/* <li className=" nav-item">
              <Link className="d-flex align-items-center" to="#!">
                <User />
                <span
                  className="menu-title text-truncate"
                  data-i18n="Dashboards"
                >
                  {" "}
                  Teacher 😀
                </span>
              </Link>
              
            </li> */}
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
          <Alert/>
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
                              <h4 className="font-weight-bolder mb-0">{teachers.length}</h4>
                              <p className="card-text font-small-3 mb-0">
                                Teachers
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
                              <h4 className="font-weight-bolder mb-0">0</h4>
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
                                Report
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
                      <h4 className="card-title">Teacher List</h4>
                      <Button className="btn btn-primary " outline onClick={() => setBasicModal(!basicModal)}>
          Add Teacher
        </Button>
                    </div>
                    
                    <TeacherTable teachers={teachers}     />

                   

                  </div>
                </div>
              </div>
            </section>
            {/* Dashboard Ecommerce ends */}
          </div>
        </div>
      </div>
      {/* END: Content*/}
    </div>


    </Fragment>
  );
  
}

 

SchoolDash.propTypes = {
  logoutSchool: PropTypes.func.isRequired,
  getTeachers: PropTypes.func.isRequired,
  teachers: PropTypes.object.isRequired,
  authSchool: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  teachers : state.authTeacherSchool.teachers,
  authSchool: state.authSchool
})


export default connect(mapStateToProps, { logoutSchool, getTeachers })(SchoolDash);
