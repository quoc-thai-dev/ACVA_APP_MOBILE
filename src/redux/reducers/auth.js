import types from "../types";
import {REHYDRATE} from 'redux-persist';
const initial_state = {
    isLoading: false,
    isLogin: false,
    isAlertActived: false,
    isRegisterSuccess: false,
    userData: [],
    message: '',
}

export default function(state = initial_state,action){
    switch (action.type) {
        case REHYDRATE:
            console.log('REHYDRATE payload:', action.payload?.auth?.userData);
            let userData = action.payload?.auth?.userData== undefined ? [] : action.payload?.auth?.userData;
            return { 
                ...state,
                 userData: userData,
                 isLogin: userData.length == 0 ? false : true,
            };
        case types.LOGIN_START: 
            return {
                ...state,
                isLoading: true,
            }
        case types.LOGIN_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                isLogin: true,
                userData: action.payload,
            }

        case types.LOGIN_FAILED: 
            return {
                ...state,
                isLoading: false,
                userData: [],
                message: action.payload,
            }

        case types.CHANGE_STATUS_ACTIVED: 
            return {
                ...state,
                isLoading: false,
                isAlertActived: !state.isAlertActived,
                message: action.payload,
            }

        case types.REGISTER_START:
            return{
                ...state,
                isLoading: true,
            };
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isRegisterSuccess: true,
                message: action.payload,
            }
        case types.REGISTER_FAILED:
            return {
                ...state,
                isLoading: false,
                isRegisterSuccess: false,
                message: action.payload,
            }
        case types.CHANGE_USER_DATA:
            return {
                ...state,
                isLoading:false,
                userData:action.payload,
            }
        default:
            return {...state};
    }
}




