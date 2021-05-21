import axios from "axios";
import { setAlert } from "../alert";

import {
  ADD_LESSON,
  LESSON_FAIL,
  FETCH_LESSON,
  FETCH_LESSON_FAIL,
  SELECTED_LESSON_BYID,
  SELECTED_LESSON_FAIL,
  LESSON_UPDATED,
  LESSON_UPDATE_FAIL,
  LESSON_DELETED,
  LESSON_DELETE_FAIL,
  UPDATE_FILTERS_FAIL,
  UPDATE_FILTERS,
  UPDATE_ALL_FILTERS,
} from "../types";

// creating new lesson object
export const createLesson =
  (formData) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/lessonPlanner/calendar", formData, config);
      dispatch({
        type: ADD_LESSON,
        payload: res.data,
      });
      dispatch(fetchLessons())
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: LESSON_FAIL,
      });
    }
  };

// Fetch all lessonEvents
export const fetchLessons = ( ) => async (dispatch, getState) => {
  try {
    const res = await axios.get("/api/lessonPlanner/calendar/");
    const calnder = getState().calender.selectedCalendars
   
    dispatch({
      type: FETCH_LESSON,
      payload: res.data.filter(event => calnder.includes(event.calenderType))
      
    });

    
  } catch (err) {
    dispatch({
      type: FETCH_LESSON_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// fetch lessonEvent by ID @@teache level
export const selctedLesson = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/lessonPlanner/calendar/${id}`);

    dispatch({
      type: SELECTED_LESSON_BYID,
      payload: res.data,
    })

  } catch (err) {
    dispatch({
      type: SELECTED_LESSON_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


// update lesson object usign the lesson ID

export const updateLesson =
  (formData) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/lessonPlanner/calendar", formData, config);
      dispatch({
        type: LESSON_UPDATED,
        payload: res.data,
      });
      dispatch(fetchLessons())
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: LESSON_UPDATE_FAIL,
      });
    }
  };


  // Delete LESSSON @@ teacher level
export const deleteLesson = (id, history) => async dispatch => {
  try {
      const res = await axios.delete(`api/lessonPlanner/calendar/${id}`)

      dispatch({
          type: LESSON_DELETED,
          payload: res.data
      })

      dispatch(setAlert('Lesson removed', 'danger'))
      dispatch(fetchLessons())
      // history.push('./create-homework')
      // history.push('./teacher-dashboard')
  } catch (err) {
      dispatch({
          type: LESSON_DELETE_FAIL,
          payload: { msg: err.response.statusText, status: err.response.status }
      })

  }
}

// ** Filter Events
export const updateFilter = filter => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_FILTERS,
       filter
    })
    
    dispatch(fetchLessons(getState().calender.selectedCalendars))
    // dispatch(fetchLessons())
  }
}

// ** Add/Remove All Filters
export const updateAllFilters = value => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_ALL_FILTERS,
      value
    })
    dispatch(fetchLessons(getState().calender.selectedCalendars))
  }
}

// ** Add/Remove All Filters
// export const updateAllFilters = value => {
//   return (dispatch, getState) => {
//     dispatch({
//       type: UPDATE_ALL_FILTERS,
//       value
//     })
//     dispatch(fetchEvents(getState().calendar.selectedCalendars))
//   }
// }



// filter Event 
// export const updateFilter = filter => async (dispatch, getState) => {
//   try {
    
//     dispatch({
//       type:  UPDATE_FILTERS,
//       filter
//     })
//     dispatch(fetchLessons(getState().calendar.selectedCalendars))

//   } catch (err) {

//     dispatch({
//       type: UPDATE_FILTERS_FAIL,
//       payload: { msg: err.response.statusText, status: err.response.status }
      
//   })

// }}
