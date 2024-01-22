import axios from 'axios';
import queryString from 'query-string';
import {API_BASE_URL} from '../config/urls';
import {getUserData} from '../utils/untils';
import i18n from 'i18next';
const language = i18n.language;
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': language,
  },
  paramsSerializer: params => queryString.stringify(params),
});
//Config before request
axiosClient.interceptors.request.use(async config => {
  //handle token here ...
  await getUserData()
    .then(res => {
      if (res && res.token) {
        config.headers.Authorization = res.token;
      }
    })
    .catch(error => console.log(error));

  return config;
});

//Handle data from server response
axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    if (error && error.response && error.response.status === 400) {
      throw error.response.data;
    } else {
      if (error.response) {
        // Request đã được tạo ra và server đã hồi đáp với một mã trạng thái
        // nằm ra ngoài tầm 2xx
        console.log(error.response.data);
        console.log(i18n.t('status_code'), error.response.status);
        console.log('Headers: ', error.response.headers);
      } else if (error.request) {
        // Request đã được tạo ra nhưng không nhận được hồi đáp nào
        // Trong trình duyệt, `error.request` là instance của XMLHttpRequest
        // còn trong node.js thì nó là instance của http.ClientRequest
        console.log('Request', error.request);
      } else {
        // Điều gì đó đã xảy ra trong bước thiết lập request rồi gây nên lỗi
        console.log(i18n.t('error'), error.message);
      }
      throw i18n.t('error_check_connect');
    }
  },
);

export default axiosClient;
