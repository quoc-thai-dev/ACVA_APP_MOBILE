import { GET_EXAM, GET_EXAM_BY_ID, GET_ATTENDANCE_BY_ID_EXAM, GET_EXAM_BY_LEVEL, SET_ATTENDANCE, REGISTER_EXAM } from "../config/urls";
import axiosClient from "./axiosClient";

const examApi = {
    getAll: async () => {
        return await axiosClient.get(GET_EXAM);
    },

    getById: async (id) => {
        const params = {idExam: id}
        return await axiosClient.get(GET_EXAM_BY_ID, {params: params});
    },

    getAttendanceById: async (id) => {
        const params = {idExam: id}
        return await axiosClient.get(GET_ATTENDANCE_BY_ID_EXAM , {params: params});
    },

    getExamByLevel: async (level) => {
        const params = {level : level}
        return await axiosClient.get(GET_EXAM_BY_LEVEL, {params: params});
    },

    setAttendance: async (code) =>{
        return await axiosClient.post(SET_ATTENDANCE, code);
    },
    
    registerExam: async (data) => {
        return await axiosClient.post(REGISTER_EXAM, data);
    }
}

export default examApi;