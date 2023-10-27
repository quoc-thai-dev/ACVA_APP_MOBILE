import types from "../types";

const initial_state = {
    isLoading: true,
    isSuccess: false,
    exam : [],
    attendance: [],
    message: '',
    exams: [],
    
}
export default function(state = initial_state, action){
    
    switch (action.type) {

        case types.GET_ALL_EXAM_START:
            return {
                ...state,
                isLoading: true,
            }
        case types.GET_ALL_EXAM_SUCCESS:{
            
            return {
                ...state,
                isLoading: false,
                exams: action.payload,
                isSuccess: !initial_state.isSuccess,
            }
        }

        case types.GET_ALL_EXAM_FAILED:
            return {
                ...state,
                isLoading: false,
                message: action.payload
            }
        case types.GET_EXAM_BY_ID_START:
            return {
                ...state,
            }
        case types.GET_EXAM_BY_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                exam: action.payload
            }
        case types.GET_EXAM_BY_ID_FAILED:

            return {
                ...state,
                isLoading: false,
            }
        
        case types.GET_ATTENDANCE_BY_ID_EXAM_START:
                return {
                    ...state,
                }
        case types.GET_ATTENDANCE_BY_ID_EXAM_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    attendance: action.payload
                }
        case types.GET_ATTENDANCE_BY_ID_EXAM_FAILED:
    
                return {
                    ...state,
                    attendance: [],
                    isLoading: false,
                }
        case types.REGISTER_EXAM_SUCCESS:

        return {
            ...state,
            isRegisterSuccess: !initial_state.isRegisterSuccess,
        }

    
        default:
            return state
    }
}

