import { GET_ALL_NOTIFICATION } from "../config/urls";
import axiosClient from "./axiosClient";

const notificationApi ={
    getAll: async () => {
        return await axiosClient.get(GET_ALL_NOTIFICATION);
    },
}

export default notificationApi;