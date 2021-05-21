import React, { useState } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { loginTeachers } from '../../actions/auth/authTeacher'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

 

function LoginTeacher({loginTeachers, isAuthenticated}) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  
  })

  const {
    email,
    password
  }  = formData

  const onChange  = e => 
      setFormData({ ...formData, [e.target.name] : e.target.value})

      const onSubmit = e => {
        e.preventDefault();
        loginTeachers(email, password);
    };

    if (isAuthenticated) {
        return <Redirect to="/teacher-dashboard" />
    }


    return (
        <div>
                 <p className="card-text mb-2">
                          Make your lesson management easy and fun!😃
                        </p>

                        <form
                          className="auth-register-form mt-2"
                          onSubmit={onSubmit}
                          method="POST"
                        >
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
                              onChange={onChange}
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
                                value={password}
                                onChange={onChange}
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
                          <div className="form-group mt-4"></div>
                          <button type="submit"
                            className="btn btn-primary btn-block"
                            tabIndex={5}
                          >
                            Sign in
                          </button>
                        </form>
                        <div className="divider my-2">
                          <div className="divider-text">or</div>
                        </div>
                        <p className="text-center mt-2">
                          <span>Already have an account?</span>
                          <Link to="/register">
                            <span>&nbsp;Sign up instead</span>
                          </Link>
                        </p>
        </div>
    )
}

LoginTeacher.propTypes = {
  isAuthenticated: PropTypes.bool,
  loginTeachers : PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.authTeacher.isAuthenticated
})

export default connect(mapStateToProps, {loginTeachers}) (LoginTeacher)
