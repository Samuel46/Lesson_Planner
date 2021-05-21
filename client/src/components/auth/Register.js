import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { registerSchool } from "../../actions/auth/authSchool";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../layouts/Alert";
import TeacherRegister from "./TeacherRegister";
import { Home, Smile } from "react-feather";

function Register({ setAlert, registerSchool, isAuthenticated }) {
  const [formData, setFormData] = useState({
    schoolName: "",
    email: "",
    name: "",
    password: "",
    password2: "",
  });

  const { schoolName, email, name, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // onSubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password do not match", "danger");
    } else {
      registerSchool({
        schoolName,
        email,
        name,
        password,
      });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/school-dash" />;
  }
  return (
    <div
      className="vertical-layout vertical-menu-modern blank-page navbar-floating footer-static  "
      data-open="click"
      data-menu="vertical-menu-modern"
      data-col="blank-page"
    >
      {/* BEGIN: Content*/}
      <div className="app-content content ">
        <div className="content-overlay" />
        <div className="header-navbar-shadow" />
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <div className="auth-wrapper auth-v2">
              <div className="auth-inner row m-0">
                {/* Brand logo*/}
                <a className="brand-logo" href="javascript:void(0);">
                  <h2 className="brand-text text-primary ml-1">
                    Lesson Planner
                  </h2>
                </a>
                {/* /Brand logo*/}
                {/* Left Text*/}
                <div className="d-none d-lg-flex col-lg-8 align-items-center p-5">
                  <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
                    <img
                      className="img-fluid"
                      src="../../../app-assets/images/pages/register-v2.svg"
                      alt="Register V2"
                    />
                  </div>
                </div>
                {/* /Left Text*/}
                {/* Register*/}
                <div className="card d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5 full__width py-4 ">
                  <h2 className="card-title font-weight-bold mb-1 d-none d-lg-flex">
                    {" "}
                    Your Adventure starts here 🚀
                  </h2>

                  <div className="card-body">
                    <Alert />
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="homeIcon-tab"
                          data-toggle="tab"
                          href="#homeIcon"
                          aria-controls="home"
                          role="tab"
                          aria-selected="true"
                        >
                          <Home />
                          I'm aSchool
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="profileIcon-tab"
                          data-toggle="tab"
                          href="#profileIcon"
                          aria-controls="profile"
                          role="tab"
                          aria-selected="false"
                        >
                          <Smile />
                          I'm a Teacher
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content ">
                      {/* Register school */}
                      <div
                        className="tab-pane active tab__width"
                        id="homeIcon"
                        aria-labelledby="homeIcon-tab"
                        role="tabpanel"
                      >
                        <p className="card-text mb-2">
                          For admins that want their teachers to collaborate.💒
                        </p>
                        <form
                          onSubmit={(e) => onSubmit(e)}
                          method="POST"
                          className="auth-register-form mt-2"
                        >
                          <div className="form-group">
                            <label
                              className="form-label"
                              htmlFor="register-schoolName"
                            >
                              School Name
                            </label>
                            <input
                              className="form-control"
                              id="register-schoolName"
                              type="text"
                              name="schoolName"
                              value={schoolName}
                              onChange={(e) => onChange(e)}
                              placeholder="John Wantomy"
                              aria-describedby="register-schoolName"
                              autofocus
                              tabIndex={1}
                            />
                          </div>
                          <div className="form-group">
                            <label
                              className="form-label"
                              htmlFor="register-username"
                            >
                              Username
                            </label>
                            <input
                              className="form-control"
                              id="register-username"
                              type="text"
                              name="name"
                              value={name}
                              onChange={(e) => onChange(e)}
                              placeholder="johndoe"
                              aria-describedby="register-username"
                              autofocus
                              tabIndex={1}
                            />
                          </div>
                          <div className="form-group">
                            <label
                              className="form-label"
                              htmlFor="register-email"
                            >
                              Email
                            </label>
                            <input
                              className="form-control"
                              id="register-email"
                              type="text"
                              name="email"
                              value={email}
                              onChange={(e) => onChange(e)}
                              placeholder="john@example.com"
                              aria-describedby="register-email"
                              tabIndex={2}
                            />
                          </div>
                          <div className="form-group">
                            <label
                              className="form-label"
                              htmlFor="register-password"
                            >
                              Password
                            </label>
                            <div className="input-group input-group-merge form-password-toggle">
                              <input
                                className="form-control form-control-merge"
                                id="register-password"
                                type="password"
                                name="password"
                                onChange={(e) => onChange(e)}
                                value={password}
                                placeholder="············"
                                aria-describedby="register-password"
                                tabIndex={3}
                              />
                              <div className="input-group-append">
                                <span className="input-group-text cursor-pointer">
                                  <i data-feather="eye" />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              className="form-label"
                              htmlFor="register-password2"
                            >
                              Repeat Password
                            </label>
                            <div className="input-group input-group-merge form-password-toggle">
                              <input
                                className="form-control form-control-merge"
                                id="register-password2"
                                type="password"
                                name="password2"
                                value={password2}
                                onChange={(e) => onChange(e)}
                                placeholder="············"
                                aria-describedby="register-password"
                                tabIndex={3}
                              />
                              <div className="input-group-append">
                                <span className="input-group-text cursor-pointer">
                                  <i data-feather="eye" />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="form-group mt-3"></div>
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            tabIndex={5}
                          >
                            Sign up
                          </button>
                        </form>
                        <div className="divider my-2">
                          <div className="divider-text">or</div>
                        </div>
                        <p className="text-center mt-2">
                          <span>Already have an account?</span>
                          <Link to="/">
                            <span>&nbsp;Sign in instead</span>
                          </Link>
                        </p>
                        {/* End register school */}
                      </div>
                      {/* register teachers  */}
                      <div
                        className="tab-pane tab__width"
                        id="profileIcon"
                        aria-labelledby="profileIcon-tab"
                        role="tabpanel"
                      >
                        <TeacherRegister />
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Register*/}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END: Content*/}
    </div>
  );
}
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerSchool: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authSchool.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, registerSchool })(Register);
