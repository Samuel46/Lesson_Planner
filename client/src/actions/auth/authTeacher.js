import axios from 'axios'
import setTeacherToken from '../../utils/setTeacherToken'
import {setAlert} from '../alert'
import {
    REGISTER_TEACHER,
TEACHER_FAIL,
LOGIN_TEACHER_SUCCESS,
LOGIN_TEACHER_FAIL,
LOGOUT_TEACHER,
TEACHER_LOADED,
AUTH_TEACHER_ERROR
}    from '../types'





// Load  teacher 
export const loadTeacher = () => async dispatch => {
    if (localStorage.token) {
        setTeacherToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/teacher/authTeacher')
        dispatch({
            type: TEACHER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_TEACHER_ERROR
        })
    }
}


// Register Teachers by teacher
export const registerTeacher = (formData, history) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/teacher/teacher', formData, config)
        dispatch({
            type: REGISTER_TEACHER,
            payload: res.data
        })
        // dispatch(logoutTeacher())
        dispatch(setAlert('Teacher registered', 'success'))
        // history.push('./dashboard')
       
        dispatch(loadTeacher())

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: TEACHER_FAIL
        })
    }
}

// Login User
export const loginTeachers = (
    email, password
) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post('/api/teacher/authTeacher', body, config)
        dispatch({
            type: LOGIN_TEACHER_SUCCESS,
            payload: res.data
        })
        dispatch(loadTeacher())

       
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: LOGIN_TEACHER_FAIL
        })
    }
}


// Logout teachers
export const logoutTeacher = () => dispatch => {

    dispatch({
        type: LOGOUT_TEACHER

    })


}
