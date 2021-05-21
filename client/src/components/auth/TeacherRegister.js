import { connect } from 'react-redux'
import React, { Fragment, useState } from 'react'
import { Alert } from 'reactstrap'
import { registerTeacher } from '../../actions/auth/authTeacher'
import PropTypes from 'prop-types'
import { setAlert } from '../../actions/alert'
import { Redirect } from 'react-router'
import {  Link } from "react-router-dom";

// registerTeacher

function TeacherRegister({registerTeacher, setAlert, isAuthenticated}) {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    password2: ""
  })

  const {
     firstName,
     surname,
     email,
     password,
     password2
  } =  formData;
  const onChange = e => setFormData({
    ...formData, [e.target.name] : e.target.value
  })
  // when the form is submited
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger')
    } else {
      registerTeacher({ firstName, surname, email, password })
    }
  }


  if (isAuthenticated) {
    return <Redirect to="/teacher-dashboard" />;
  }


    return (
        <Fragment>
            <p className="card-text mb-2">Make your lesson management easy and fun!😃</p>
                        <form className="auth-register-form mt-2" 
                        onSubmit={e => onSubmit(e)}
                        method="POST">
                          <div className="form-group">
                            <label className="form-label" htmlFor="register-firstName">First Name</label>
                            <input className="form-control" id="register-firstName" type="text" name="firstName" value={firstName}
                            onChange= { e => onChange(e)} 
                            placeholder="John" aria-describedby="register-firstName" autofocus tabIndex={1} />
                          </div>
                          <div className="form-group">
                            <label className="form-label" htmlFor="register-username">Surname</label>
                            <input className="form-control" id="register-username" type="text" name="surname" value={surname} 
onChange= { e => onChange(e)} 
                            placeholder="Mr. John" aria-describedby="register-username" autofocus tabIndex={1} />
                          </div>
                          <div className="form-group">
                            <label className="form-label" htmlFor="register-email">Email</label>
                            <input className="form-control" id="register-email" type="text" name="email" 
                            value={email}
                            onChange= { e => onChange(e)} 
                            placeholder="john@example.com" aria-describedby="register-email" tabIndex={2} />
                          </div>
                          <div className="form-group">
                            <label className="form-label" htmlFor="register-password">Password</label>
                            <div className="input-group input-group-merge form-password-toggle">
                              <input className="form-control form-control-merge" id="register-password" type="password" name="password" 
                              value={password}
                              onChange= { e => onChange(e)} 
                              placeholder="············" aria-describedby="register-password" tabIndex={3} />
                              <div className="input-group-append"><span className="input-group-text cursor-pointer"><i data-feather="eye" /></span></div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="form-label" htmlFor="register-password2">Repeat Password</label>
                            <div className="input-group input-group-merge form-password-toggle">
                              <input className="form-control form-control-merge" id="register-password2" type="password" 
                              name="password2" 
                              value={password2}
                              onChange= { e => onChange(e)} 
                              placeholder="············" aria-describedby="register-password" tabIndex={3} />
                              <div className="input-group-append"><span className="input-group-text cursor-pointer"><i data-feather="eye" /></span></div>
                            </div>
                          </div>
                          <div className="form-group mt-3">
                           
                          </div>
                          <button type="submit" className="btn btn-primary btn-block" tabIndex={5}>Sign up</button>
                        </form>
                        <div className="divider my-2">
                          <div className="divider-text">or</div>
                        </div>
                        <p className="text-center mt-2"><span>Already have an account?</span><Link to="/"><span>&nbsp;Sign in instead</span></Link></p>

            
        </Fragment>
    )
}

TeacherRegister.propTypes = {
  registerTeacher: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
  isAuthenticated: state.authTeacher.isAuthenticated
})

export default connect(mapStateToProps, {registerTeacher, setAlert}) (TeacherRegister)
