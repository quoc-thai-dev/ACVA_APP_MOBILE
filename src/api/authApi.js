import axiosClient from "./axiosClient.js"
import { LOGIN, REGISTER, FORGOT_PASSWORD, CHANGE_PASSWORD, SEND_MAIL_ACTIVE } from "../config/urls.js"

const authApi ={
    login: async (data) =>{
      return await axiosClient.post(LOGIN, data);
    },
    
    register: async (data) =>{
      return await axiosClient.post(REGISTER, data);
    },

    forgotPassword: async (data) => {
      return await axiosClient.post(FORGOT_PASSWORD, data);
    },

    changePassword: async (data) => {
      return await axiosClient.post(CHANGE_PASSWORD, data);
    },

    sendMailActive: async (data) =>{
      return await axiosClient.post(SEND_MAIL_ACTIVE, data);
    }
}

export default authApi;