import { GET_ALL_VIDEO_STUDY } from "../config/urls";
import axiosClient from "./axiosClient";

const videoStudyApi = {
    getAll: async () => {
        return await axiosClient.get(GET_ALL_VIDEO_STUDY);
    },
}

export default videoStudyApi;