import types from "../types";

const initState = {
    isLoading: false,
    universities: [],
}

const universitiesReducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_UNIVERSITY_START:
            return {
                ...state,
                isLoading: true,
        }
            
        case types.GET_UNIVERSITY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                universities: action.payload,
            }

        case types.GET_UNIVERSITY_FAILED:
            return {
                ...state,
                isLoading: false,
                universities: [],
            }
    
        default:
            return state
    }
}

export default universitiesReducer;