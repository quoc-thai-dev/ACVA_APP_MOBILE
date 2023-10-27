import { GET_ALL_QA, SEND_QUESTION } from "../config/urls";
import axiosClient from "./axiosClient";

const qaApi ={
    getAll: async () => {
        return await axiosClient.get(GET_ALL_QA);
    },

    sendQuestion: async (data) => {
        return await axiosClient.post(SEND_QUESTION, data);
    }
}

export default qaApi;