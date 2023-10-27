import examApi from "../../api/examApi";
import { showError } from "../../utils/helperFunction";
import types from "../types";


export function getAllExam(){
    return async function(dispatch, getState){
        dispatch(getAllExamStart())
        await examApi.getAll()
        .then(res => {
            if (res && res.data) {
                dispatch(getAllExamSuccess(res.data))
            } 
        })
        .catch(error=>{
            showError(error.message ? error.message : error);
            dispatch(getAllExamFail(error.message ? error.message : error))
        })
    }
}

export function getAllExamStart(){
    return {
        type: types.GET_ALL_EXAM_START
    }
}

export function getAllExamSuccess(data){
    return {
        type: types.GET_ALL_EXAM_SUCCESS,
        payload: data,
    }
}

export function getAllExamFail(message){
    return ({
        type: types.GET_ALL_EXAM_FAILED,
        payload: message
    })
}


export function getExamByID(id){
    return async function(dispatch, getState){
        dispatch(getExamByIDStart());
        await examApi.getById(id)
            .then((res) => dispatch(getExamByIDSuccess(res.data)))
            .catch(error => {
                dispatch(getExamByIDFailed(error.message));
                console.log(error);
            })
    }
}

export function getExamByIDStart(){
    return {
        type: types.GET_EXAM_BY_ID_START,
    }
}

export function getExamByIDSuccess(data){
    return {
        type: types.GET_EXAM_BY_ID_SUCCESS,
        payload: data
    }
}

export function getExamByIDFailed(message){
    return {
        type: types.GET_EXAM_BY_ID_FAILED,
        payload: message,
    }
}

//Attendance

export function getAttendanceByID(id){
    return async function(dispatch, getState){

        dispatch(getAttendanceByIDExamStart());
        await examApi.getAttendanceById(id)
            .then((res) => dispatch(getAttendanceByIDExamSuccess(res.data)))
            .catch(error => {
                dispatch(getAttendanceByIDExamFailed(error.message ? error.message : error ));
                console.log('err', error);
            })
    }
}

export function getAttendanceByIDExamStart(){
    return {
        type: types.GET_ATTENDANCE_BY_ID_EXAM_START,
    }
}

export function getAttendanceByIDExamSuccess(data){
    return {
        type: types.GET_ATTENDANCE_BY_ID_EXAM_SUCCESS,
        payload: data
    }
}

export function getAttendanceByIDExamFailed(message){
    return {
        type: types.GET_ATTENDANCE_BY_ID_EXAM_FAILED,
        payload: message,
    }
}

export function registerExamSuccess(){
    return ({
        type: types.REGISTER_EXAM_SUCCESS
    })
}