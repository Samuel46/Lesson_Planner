import React from 'react'
import { MoreVertical, Trash } from 'react-feather'
import Moment from 'react-moment'
import {Link } from 'react-router-dom'

function LessonEvents({lessonEvents, deleteLesson}) {
    const lessons = lessonEvents.map(event => (

        <tr key={event._id}>
                                  <td>
                                     
                                      <span className="font-weight-bold">{ event && event.title}</span>
                                  </td>
                                  <td><Moment format='YYYY/MM/DD' >{ event && event.start}</Moment></td>
                                  <td><Moment format='YYYY/MM/DD' >{ event && event.end}</Moment></td>
                                 
                                  <td>{ event && event.calenderType}</td>
                                   <td> 
                                       <div className="dropdown">
                                          <button type="button" className="btn btn-sm dropdown-toggle hide-arrow" data-toggle="dropdown">
                                              <i data-feather="more-vertical"></i>
                                              <MoreVertical/>
                                          </button> 
                                           <div className="dropdown-menu">
                                             
                                              <Link  onClick={() => deleteLesson(event && event._id)} className="dropdown-item" href="javascript:void(0);">
                                                 
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
              <th>Title</th>
              <th>Start date</th>
             
              <th>Due date</th>
              <th>Lesson Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
             {lessons}
                              
          </tbody>
        </table>
      </div>
    )
}

export default LessonEvents
