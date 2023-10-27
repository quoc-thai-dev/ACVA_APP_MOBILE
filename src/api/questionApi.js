import { GET_ALL_QUESTION_ANSWER } from "../config/urls";
import axiosClient from "./axiosClient";

const questionApi = {
    getAll: async () => {
        return await axiosClient.get(GET_ALL_QUESTION_ANSWER);
    }
}

export default questionApi;