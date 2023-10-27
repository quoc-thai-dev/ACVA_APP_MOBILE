
import types from "../types";
import { showError, showSuccess } from "../../utils/helperFunction";
import authApi from "../../api/authApi";
import { clearUserData, setUserData } from "../../utils/untils";
import {Alert} from 'react-native';




export function register(data){
    return async (dispatch, getState) =>{
        dispatch(registerStart());
        try {
            const res = await authApi.register(data);
            dispatch(registerSuccess(res.message));

        } catch (error) {
          showError( error.message ? error.message : error);
          dispatch(registerFailed());
        }
    }
}

export function registerStart(){
    return {
        type: types.REGISTER_START,
    }
}

export function registerSuccess(message){
    return {
        type: types.REGISTER_SUCCESS,
        payload: message
    }
}

export function registerFailed(message){
    return {
        type: types.REGISTER_FAILED,
        payload: message
    }
}



export const login =(data)=>{
  
    return async (dispatch, getState) =>{
       
        dispatch(loginStart());
        try {
            const res = await authApi.login(data);
            if(res && res.data.user.active == 1){
                dispatch(loginSuccess(res.data));
                setUserData(res.data);
            }else{
                const message = '' ;
                clearUserData();
                dispatch(changeStatusActived(message));
            }
        } catch (error) {
            showError( error.message ? error.message : error);
            dispatch(loginFailed(error.message ? error.message : error));
            clearUserData();
           
        }
    }
}

export const loginStart =()=>{
    return {
        type: types.LOGIN_START,
    }
}

export const loginSuccess=(data)=>{
    return {
        type: types.LOGIN_SUCCESS,
        payload: data
    }
}

export const changeStatusActived = (message) => {
    return {
        type: types.CHANGE_STATUS_ACTIVED,
        payload: message,
    }
}

export const loginFailed =(message)=>{
    return {
        type: types.LOGIN_FAILED,
        payload: message
    }
}


export function logout(){
    clearUserData();
    return {
        type: types.CLEAR_REDUX_STATE,
    }
}



