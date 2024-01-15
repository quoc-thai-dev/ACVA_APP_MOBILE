import axios from 'axios';
import queryString from 'query-string';
import {API_NOTIFICATION_URL} from '../config/urls';
import { getUserData } from '../utils/untils';

const app_id ="dc3ee623-08fa-4174-8319-0d4e53c8d167";
const token ="YTM4Y2I5OGQtYTcyMi00OTgxLWJmNDctOTdhYmY5MjE5ZWQ3";
const axiosNotification=axios.create({
    baseURL:API_NOTIFICATION_URL,
    headers:{
        'Content-Type':'application/json',
    },
    paramsSerializer: params=>queryString.stringify(params),
})
// handle data from server response
axios.get(url, {
    headers: {
      Authorization: basicAuth,
    },
    params: params,
  })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

export default axiosNotification;