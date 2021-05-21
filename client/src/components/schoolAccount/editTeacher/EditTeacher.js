import React, { useState, useEffect, Fragment } from 'react'
import { useParams, Link } from 'react-router-dom'
// ** Third Party Components
import { User, Info, Share2, Menu, Moon, Power, Home, X, Disc, Circle } from 'react-feather'
import { Card, CardBody, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Alert } from 'reactstrap'


import { getTeacherById } from '../../../actions/auth/authTeacherSchool'
import EditTeacherForm from '../EditTeacherForm'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { logoutSchool } from '../../../actions/auth/authSchool'
import TeacherForm from '../TeacherForm'

function EditTeacher({getTeacherById, authTeacherSchool: { selectedTeacher, loading}, match}) {
    const [activeTab, setActiveTab] = useState('1')
   
  
     
    

       // ** Function to toggle tabs
  const toggle = tab => setActiveTab(tab)

//   function to get user on mount
useEffect(() => {
  getTeacherById(match.params.id)
}, [ getTeacherById, match.params.id])

    return   selectedTeacher !== null && selectedTeacher !== undefined ? (
       


      
        
        <Row className='app-user-edit py-5 mr-5 ml-5'>
        <Col sm='12'>
          <Card>
            <CardBody className='pt-2'>
              <Nav pills>
                <NavItem>
                  <NavLink active={activeTab === '1'} onClick={() => toggle('1')}>
                    <User size={14} />
                    <span className='align-middle d-none d-sm-block'>Account</span>
                  </NavLink>
                </NavItem>
                {/* <NavItem> */}
                {/* <NavLink active={activeTab === '2'} onClick={() => toggle('2')}>
                  <Info size={14} />
                  <span className='align-middle d-none d-sm-block'>Information</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activeTab === '3'} onClick={() => toggle('3')}>
                  <Share2 size={14} />
                  <span className='align-middle d-none d-sm-block'>Social</span>
                </NavLink>
              </NavItem> */}
              </Nav>

              <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                  <EditTeacherForm selectedTeacher={selectedTeacher} loading={loading} />
                </TabPane>
              </TabContent>
              
            </CardBody>
          </Card>
        </Col>
      </Row>

      
      
       
      ): (
        <Alert color='danger'>
        <h4 className='alert-heading'>Teacher not found</h4>
        <div className='alert-body'>
          Teacher with id: {match.params.id} doesn't exist. Check list of all Teacher: <Link to='/school-dash'>Teacher List</Link>
        </div>
      </Alert>
      )
 
    
}

EditTeacher.propTypes = {
    authTeacherSchool: PropTypes.object.isRequired,
    getTeacherById: PropTypes.func.isRequired,
    logoutSchool: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    authTeacherSchool: state.authTeacherSchool
})
export default connect(mapStateToProps, {getTeacherById, logoutSchool}) (EditTeacher)
