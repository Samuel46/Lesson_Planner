import axios from "axios";
import { setAlert } from "../alert";

import {
  LOGIN_SCHOOL_FAIL,
  LOGIN_SCHOOL_SUCCESS,
  LOGOUT_SCHOOL,
  REGISTER_SCHOOL,
  SCHOOL_FAIL,
  AUTH_SCHOOL_ERROR,
  SCHOOL_LOADED,

  
} from "../types";
import setSchoolToken from '../../utils/setSchoolToken'

// Load school

export const loadSchool = () => async dispatch => {
  if (localStorage.token) {
      setSchoolToken(localStorage.token)
  }

  try {
      const res = await axios.get('/api/school/auth/authSchool')
      dispatch({
          type: SCHOOL_LOADED,
          payload: res.data
      })
  } catch (err) {
      dispatch({
          type: AUTH_SCHOOL_ERROR
      })
  }
}

// Register the school
export const registerSchool = ({ schoolName, email, name, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ schoolName, name, email, password });

  try {
    const res = await axios.post("/api/school/school", body, config);
    dispatch({
      type: REGISTER_SCHOOL,
      payload: res.data,
    });

    dispatch(loadSchool())
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: SCHOOL_FAIL,
    });
  }
};

// Login school
export const loginSchool = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/school/auth/authSchool", body, config);
    dispatch({
      type: LOGIN_SCHOOL_SUCCESS,
      payload: res.data,
    });

    dispatch(loadSchool())
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_SCHOOL_FAIL,
    });
  }
};

// lOGOUT
export const logoutSchool = () => (dispatch) => {
  // dispatch({
  //     type: CLEAR_PROFILE

  // })

  dispatch({
    type: LOGOUT_SCHOOL,
  });
};
