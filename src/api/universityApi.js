import axiosClient from "./axiosClient";
import { GET_ALL_UNIVERSITY } from "../config/urls.js";

const universityApi = {
    getAll: async () =>{
        return await axiosClient.get(GET_ALL_UNIVERSITY);
    },
}

export default universityApi;