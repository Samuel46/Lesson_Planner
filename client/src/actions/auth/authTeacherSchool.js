import axios from 'axios'
import { setAlert } from '../alert'
import {
    REGISTER_TEACHER_SCHOOL,
    TEACHER_FAIL_SCHOOL,
    LOGOUT_TEACHER,
    TEACHER_LOADED_SCHOOL,
    AUTH_TEACHER_SCHOOL_ERROR,
    GET_TEACHERS,
    GET_TEACHERS_FAIL,
    GET_TEACHERSBYID,
    DELETE_TEACHER,
    UPDATE_TEACHER,
    UPDATE_TEACHER_FAIL




} from "../../actions/types"
import setTeacherToken from '../../utils/setTeacherToken'


// Load  teacher linked to a school account
export const loadTeacherSchool = () => async dispatch => {
    if (localStorage.token) {
        setTeacherToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/school/auth/authTeacher')
        dispatch({
            type: TEACHER_LOADED_SCHOOL,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_TEACHER_SCHOOL_ERROR
        })
    }
}

// Register Teachers by the school
export const registerTeacherSchool = (formData, history) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/school/teacher', formData, config)
        dispatch({
            type: REGISTER_TEACHER_SCHOOL,
            payload: res.data
        })
        dispatch(logoutTeacherSchool())
        dispatch(setAlert('Teacher registered', 'success'))
        // history.push('./dashboard')
        dispatch(loadTeacherSchool())

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: TEACHER_FAIL_SCHOOL
        })
    }
}


// update Teachers by the school
export const updateTeacherSchool = (formData, history) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/school/teacher', formData, config)
        dispatch({
            type: UPDATE_TEACHER,
            payload: res.data
        })
        dispatch(logoutTeacherSchool())
        dispatch(setAlert('Teacher updated', 'success'))
       
        dispatch(loadTeacherSchool())
        history.push('/teacher-dashboard')
        history.push('/school-dash')

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: UPDATE_TEACHER_FAIL
        })
    }
}


// Get all the Teacher
export const getTeachers = (history) => async dispatch => {
    try {
        const res = await axios.get('/api/school/auth/authTeacher')

        dispatch({
            type: GET_TEACHERS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_TEACHERS_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}



// Get teacher  by ID @@school level
export const getTeacherById = (id, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/school/auth/authTeacher/${id}`)

        dispatch({
            type: GET_TEACHERSBYID,
            payload: res.data
        }) 
    } catch (err) {
        dispatch({
            type: GET_TEACHERS_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
      
    }
}

// Delete teacher by ID @@school level
export const deleteTeacherById = (id, history) => async dispatch => {
    try {
        const res = await axios.delete(`/api/school/auth/authTeacher/${id}`)

        dispatch({
            type: DELETE_TEACHER,
            payload: res.data
        })
        dispatch(setAlert('Teacher deleted', 'danger'))
        history.push('/teacher-dashboard')
        history.push('/school-dash')
    } catch (err) {
        dispatch({
            type: TEACHER_FAIL_SCHOOL,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}





// Logout teachers
export const logoutTeacherSchool = () => dispatch => {

    dispatch({
        type: LOGOUT_TEACHER

    })


}
