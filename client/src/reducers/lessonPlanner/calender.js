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
} from "../../actions/types";

const intialState = {
  lessonEvent: {},
  lessonEvents: [],
  selectedEvent: {},
  selectedCalendars: ["Curriculum", "Lessons", "Homework", "Objectives", "Procedures"],
  error: {},
  loading: true,
  loadingLessonById: true
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_LESSON:
      case LESSON_DELETED:
      return {
        ...state,
        lessonEvent: payload,
        loading: false
        
      };


      case LESSON_UPDATED:
        return {
          ...state,
          lessonEvent: payload,
          loading: false
          
        };

      // case LESSON_UPDATED:
      // return {
      //   ...state,
      //   lessonEvent: payload,
      //   loading: false
        
      // };
    // fetch all lessonEvents
    case FETCH_LESSON:
      return {
        ...state,
        lessonEvents: payload,
        loading: false,
        loadingLessonById: true,
        
      };

      case UPDATE_FILTERS:
         // ** Updates Filters based on action filter
      const filterIndex = state.selectedCalendars.findIndex(i => i === action.filter)
      if (state.selectedCalendars.includes(action.filter)) {
        state.selectedCalendars.splice(filterIndex, 1)
      } else {
        state.selectedCalendars.push(action.filter)
      }
      if (state.selectedCalendars.length === 0) {
        state.lessonEvents.length = 0
      }

      return {
        ...state,
      };

      case UPDATE_ALL_FILTERS:
        const value = action.value
      let selected = []
      if (value === true) {
        selected = ['Curriculum', 'Lessons', 'Homework', 'Objectives', 'Procedures']
      } else {
        selected = []
      }
      return { ...state, selectedCalendars: selected }


    // fetch lessonEvent by ID
    case SELECTED_LESSON_BYID:
      return {
        ...state,
        selectedEvent: payload,
        loadingLessonById: false,
        loading: false,
      };

    case LESSON_FAIL:
      case LESSON_UPDATE_FAIL:
    case SELECTED_LESSON_FAIL:
    case FETCH_LESSON_FAIL:
      case LESSON_DELETE_FAIL:
        case UPDATE_FILTERS_FAIL:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
