import React, { useEffect } from 'react'
import { Edit2, MoreVertical, Trash } from 'react-feather'
import {Link, withRouter } from 'react-router-dom'
import { deleteTeacherById, getTeacherById } from '../../actions/auth/authTeacherSchool'
 import {connect}  from 'react-redux'
 import PropTypes from 'prop-types'
import Alert  from '../layouts/Alert'
 
function TeacherTable({teachers, deleteTeacherById, history }) {

    

    const teacherList = teachers.map(teacher => (
        <tr key={teacher._id}>
                                  <td>
                                     
                                      <span className="font-weight-bold">{ teacher && teacher.surname}</span>
                                  </td>
                                  <td>{ teacher && teacher.email}</td>
                                 
                                  <td><span className="badge badge-pill badge-light-primary mr-1">Active</span></td>
                                  <td>
                                      <div className="dropdown">
                                          <button type="button" className="btn btn-sm dropdown-toggle hide-arrow" data-toggle="dropdown">
                                              <i data-feather="more-vertical"></i>
                                              <MoreVertical/>
                                          </button>
                                          <div className="dropdown-menu">
                                              <Link to={`/edit-teacher/${teacher && teacher._id}`}   className="dropdown-item" >
                                           
                                                  <Edit2 className="mr-50" />
                                                  <span>Edit</span>
                                              </Link>
                                              <Link  onClick={() => deleteTeacherById(teacher._id, history)} className="dropdown-item" href="javascript:void(0);">
                                                 
                                                  <Trash  className="mr-50" />
                                                  <span>Delete</span>
                                              </Link>
                                          </div>
                                      </div>
                                  </td>
                              </tr>

    ))
    return (
        <div className="table-responsive">
        <table className="table">
            
          <thead>
            <tr>
              <th>Teacher's Name</th>
              <th>Email</th>
             
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
             {teacherList}
                              
          </tbody>
        </table>
      </div>

    )
}

TeacherTable.propTypes = {
    getTeacherById: PropTypes.func.isRequired,
    deleteTeacherById: PropTypes.func.isRequired,
}

export default connect(null, {getTeacherById, deleteTeacherById}) (withRouter (TeacherTable))
