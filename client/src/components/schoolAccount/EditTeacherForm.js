import React, { useState, useEffect } from 'react'
// ** Custom Components
import Avatar from '../../@core/components/avatar'
import { Lock, Edit, Trash2 } from 'react-feather'
import { Media, Row, Col, Button, Form, Input, Label, FormGroup, Table, CustomInput } from 'reactstrap'
import {Link, withRouter} from 'react-router-dom'
 import {connect} from 'react-redux'
 import PropTypes from 'prop-types'
import { getTeacherById, updateTeacherSchool } from '../../actions/auth/authTeacherSchool'

 
 import Alert from '../layouts/Alert'
 


function EditTeacherForm({selectedTeacher,  updateTeacherSchool,  loading, history}) {
const [img, setImg] = useState(null)
    
    // const [userData, setUserData] = useState(null)

    const [formData, setFormData] = useState({
      firstName: "",
      surname: "",
      email: "",
      password: "",
     
    })

    useEffect(() => {
        
         setFormData({
            firstName: loading || !selectedTeacher.firstName ? '' : selectedTeacher.firstName,
            surname: loading ||  !selectedTeacher.surname ? '' : selectedTeacher.surname,
            email: loading || !selectedTeacher.email ? '' : selectedTeacher.email,
            password: loading || ! selectedTeacher.password ? '' : selectedTeacher.password
         })


    }, [selectedTeacher.surname])

    const {
      firstName,
      surname,
      email,
      password,
    
   } =  formData;
   const onChange = e => setFormData({
     ...formData, [e.target.name] : e.target.value
   })
   // when the form is submited
   const onSubmit = async e => {
       e.preventDefault();
       updateTeacherSchool(formData,  history, true)

   }


  // ** Function to change teacher image
  // const onChange = e => {
  //   const reader = new FileReader(),
  //     files = e.target.files
  //   reader.onload = function () {
  //     setImg(reader.result)
  //   }
  //   reader.readAsDataURL(files[0])
  // }

 // ** Update teacher image on mount or change
//  useEffect(() => {
//   if (selectedTeacher !== null || (selectedTeacher !== null && userData !== null && selectedTeacher._id !== userData.id)) {
//     setUserData(selectedTeacher)
//     if (selectedTeacher.avatar.length) {
//       return setImg(selectedTeacher.avatar)
//     } else {
//       return setImg(null)
//     }
//   }
// }, [selectedTeacher])

    // ** Renders Teacher 
  const renderUserAvatar = () => {
    if (img === null) {
      const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
          className='rounded mr-2 my-25'
        //   content={.fullName}
          content={selectedTeacher.surname}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(36px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '90px',
            width: '90px'
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
        <div className="container app-user-edit ">
 <Row>
        <Col sm='12'>
          <Media className='mb-2'>
            {renderUserAvatar()}
            <Media className='pt-4' body>
              <h4>{selectedTeacher.surname}</h4>
              
            </Media>
          </Media>
        </Col>
        <Col sm='12'>
          <Alert/>
          <Form  onSubmit={e => onSubmit(e)}>
            <Row>
              <Col md='4' sm='12'>
                <FormGroup>
                  <Label for='username'>First Name</Label>
                  <Input type='text' id='username'  name="firstName"  value={firstName}   placeholder='First Name' onChange= { e => onChange(e)}   />
                </FormGroup>
              </Col>
              <Col md='4' sm='12'>
                <FormGroup>
                  <Label for='name'>Surname</Label>
                  <Input type='text'  id='name' placeholder='Surname'  onChange= { e => onChange(e)} name="surname"  value={surname} />
                </FormGroup>
              </Col>
              <Col md='4' sm='12'>
                <FormGroup>
                  <Label for='email'>Email</Label>
                  <Input type='text' id='email' name="email"   value={email} onChange= { e => onChange(e)}  placeholder='Email'  />
                </FormGroup>
              </Col>

              <Col md='4' sm='12'>
                <FormGroup>
                  <Label for='email'>Password</Label>
                  <Input onChange= { e => onChange(e)} name="password"  value={password} type='password' id='password' placeholder='Password' name="password"   defaultValue='........'  />
                </FormGroup>
              </Col>
              <Col md='4' sm='12'>
                <FormGroup>
                  <Label for='status'>Status</Label>
                  <Input type='select' name='status' id='status' >
                    <option value='pending'>Pending</option>
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md='4' sm='12'>
                <FormGroup>
                  <Label for='role'>Role</Label>
                  <Input type='select' name='role' id='role' >
                    <option value='admin'>Teacher</option>
                    <option value='author'>Head Teacher</option>
                    {/* <option value='editor'>Editor</option>
                    <option value='maintainer'>Maintainer</option>
                    <option value='subscriber'>Subscriber</option> */}
                  </Input>
                </FormGroup>
              </Col>
             
              <Col sm='12'>
                <div className='permissions border mt-1'>
                  <h6 className='py-1 mx-1 mb-0 font-medium-2'>
                    <Lock size={18} className='mr-25' />
                    <span className='align-middle'>Permissions</span>
                  </h6>
                  <Table borderless striped responsive>
                    <thead className='thead-light'>
                      <tr>
                        <th>Module</th>
                        <th>Read</th>
                        <th>Write</th>
                        <th>Create</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                   
                      
                       
                      <tr>
                        <td>Teacher</td>
                        <td>
                          <CustomInput type='checkbox' id='contributor-1' label='' />
                        </td>
                        <td>
                          <CustomInput type='checkbox' id='contributor-2' label='' />
                        </td>
                        <td>
                          <CustomInput type='checkbox' id='contributor-3' label='' />
                        </td>
                        <td>
                          <CustomInput type='checkbox' id='contributor-4' label='' />
                        </td>
                      </tr>
                      <tr>
                        <td>HeadTeacher</td>
                        <td>
                          <CustomInput type='checkbox' id='user-1' label='' />
                        </td>
                        <td>
                          <CustomInput type='checkbox' id='user-2' label='' />
                        </td>
                        <td>
                          <CustomInput type='checkbox' id='user-3' label='' />
                        </td>
                        <td>
                          <CustomInput type='checkbox' id='user-4' label='' defaultChecked />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
              <Col className='d-flex flex-sm-row flex-column mt-2 py-3' sm='12'>
                <Button type="submit" className='mb-1 mb-sm-0 mr-0 mr-sm-1' type='submit' color='primary'>
                  Save Changes
                </Button>
                <Link className="btn btn-secondary" to= "/school-dash" color='secondary' outline>
                Back
              </Link>
              
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
        </div>
       
    )
}

 EditTeacherForm.propTypes = {
   updateTeacherSchool: PropTypes.func.isRequired,
   
 }

export default connect(null, {updateTeacherSchool}) (withRouter(EditTeacherForm)) 
