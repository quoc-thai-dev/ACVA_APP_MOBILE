import {GET_USER_BY_ID, POST_USER_INFO, CHANGE_AVATAR} from '../config/urls';
import axiosClient from './axiosClient';

const usersApi = {
  getUserById: async id => {
    const params = {id: id};
    return await axiosClient.get(GET_USER_BY_ID, {params: params});
  },
  updateUserInfo: async data => {
    return await axiosClient.post(POST_USER_INFO, data);
  },
  changeAvatar: async data => {
    return await axiosClient.post(CHANGE_AVATAR, data);
  },
};

export default usersApi;
