import {
    REGISTER_TEACHER_SCHOOL, TEACHER_FAIL_SCHOOL, LOGOUT_TEACHER,
    TEACHER_LOADED_SCHOOL,
    AUTH_TEACHER_SCHOOL_ERROR,
    GET_TEACHERS,
    GET_TEACHERS_FAIL,
    GET_TEACHERSBYID,
    UPDATE_TEACHER,
    UPDATE_TEACHER_FAIL
    
} from "../../actions/types"

const intialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    selectedTeacher: null,
    teacher: null,
    teachers: [],
    error: {}
}



export default function (state = intialState, action) {
    const {
        type, payload
    } = action;

    switch (type) {

        case TEACHER_LOADED_SCHOOL:
            
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                teachers: payload
            }

        case GET_TEACHERSBYID:
            return {
                ...state,
                loading: false,
                selectedTeacher: payload
            }
        case REGISTER_TEACHER_SCHOOL:
            case UPDATE_TEACHER:

            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }


        case GET_TEACHERS:
            return {
                ...state,
                teachers: payload,
                isAuthenticated: true,
                loading: false
            }

        // case DELETE_TEACHER:

        //     return {
        //         ...state,
        //         ...payload,
        //         isAuthenticated: false,
        //         loading: false
        //     }



        case TEACHER_FAIL_SCHOOL:
            case AUTH_TEACHER_SCHOOL_ERROR:   
        case LOGOUT_TEACHER:
            case UPDATE_TEACHER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }

        case GET_TEACHERS_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            }





        default:
            return state;
    }
}




