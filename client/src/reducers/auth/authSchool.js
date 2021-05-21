import {
  LOGIN_SCHOOL_FAIL,
  LOGIN_SCHOOL_SUCCESS,
  LOGOUT_SCHOOL,
  REGISTER_SCHOOL,
  SCHOOL_FAIL,
  AUTH_SCHOOL_ERROR,
  SCHOOL_LOADED
} from "../../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  school: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SCHOOL_LOADED:
        return {
            ...state,
            isAuthenticated: true,
            loading: false,
            school: payload
        }
    case REGISTER_SCHOOL:
    case LOGIN_SCHOOL_SUCCESS:
      localStorage.setItem("token", payload.token);

      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case SCHOOL_FAIL:
    case LOGIN_SCHOOL_FAIL:
    case AUTH_SCHOOL_ERROR:
    case LOGOUT_SCHOOL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
