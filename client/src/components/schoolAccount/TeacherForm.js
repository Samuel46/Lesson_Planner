import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Col,
  Input,
  Form,
  Button,
  Label,
  CustomInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap'
import { User, Mail, Smartphone, Lock } from 'react-feather'
import Alert from '../layouts/Alert'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { registerTeacherSchool } from '../../actions/auth/authTeacherSchool'
import { setAlert } from '../../actions/alert'


function TeacherForm({registerTeacherSchool}) {
  const [formData, setFormData] = useState ({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    avatar: "",
    status: "",

  })

  const {
    firstName,
    surname,
    email,
    password,
    avatar,
    role,
    status
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
      e.preventDefault()
    registerTeacherSchool(formData)
      }

  return (
   
       <Card>
     <CardHeader>
        
      </CardHeader>
      <CardBody>
        <Alert />
        <Form onSubmit={ e => onSubmit(e)}>
        <FormGroup row>
            <Label sm='3' for='nameIcons'>
              First Name
            </Label>
            <Col sm='9'>
              <InputGroup className='input-group-merge'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <User size={15} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name='firstName' value={firstName} onChange={e => onChange(e)} id='nameIcons' placeholder='First Name' />
              </InputGroup>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm='3' for='nameIcons'>
              Surname
            </Label>
            <Col sm='9'>
              <InputGroup className='input-group-merge'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <User size={15} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name='surname' value={surname}  onChange={e => onChange(e)}id='nameIcons' placeholder='Surname' />
              </InputGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm='3' for='EmailIcons'>
              Email
            </Label>
            <Col sm='9'>
              <InputGroup className='input-group-merge'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <Mail size={15} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='email' name='email' value={email} 
                onChange={e => onChange(e)} id='EmailIcons' placeholder='Email' />
              </InputGroup>
            </Col>
          </FormGroup>
          {/* <FormGroup row>
            <Label sm='3' for='mobileIcons'>
              Mobile
            </Label>
            <Col sm='9'>
              <InputGroup className='input-group-merge'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <Smartphone size={15} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='number' name='mobile' id='mobileIcons' placeholder='Mobile' />
              </InputGroup>
            </Col>
          </FormGroup> */}
          <FormGroup row>
            <Label sm='3' for='passwordIcons'>
              Password
            </Label>
            <Col sm='9'>
              <InputGroup className='input-group-merge'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <Lock size={15} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='password' name='password' value={password}
                 onChange= { e => onChange(e)} id='passwordIcons' placeholder='Password' />
              </InputGroup>
            </Col>
          </FormGroup>

          {/* <FormGroup row>
            <Label sm='3' for='passwordIcons'>
              Status
            </Label>
            <Col sm='9'>
              <InputGroup className='input-group-merge'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <Lock size={15} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='select' name='status' id='status' >
                    <option value='pending'>Pending</option>
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
                  </Input>
              </InputGroup>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm='3' for='passwordIcons'>
              Role
            </Label>
            <Col sm='9'>
              <InputGroup className='input-group-merge'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <Lock size={15} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='select' name='role' id='role' >
                    <option value='admin'>Teacher</option>
                    <option value='author'>Head Teacher</option>
                  </Input>
              </InputGroup>
            </Col>
          </FormGroup> */}


          <FormGroup className='mb-0' row>
            <Col className='d-flex' md={{ size: 9, offset: 3 }}>
              <Button   className="btn btn-primary btn-block" className='mr-1' color='primary' type='submit' >
                Add
              </Button>
            
            </Col>
          </FormGroup>

          
       
    
    


        </Form>
      </CardBody>
      
   </Card>


  
  )
}

TeacherForm.propTypes = {
  registerTeacherSchool: PropTypes.func.isRequired,
}


export default  connect(null, {registerTeacherSchool}) (TeacherForm)
