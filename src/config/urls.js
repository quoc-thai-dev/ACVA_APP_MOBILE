
/*=================================BaseURL==============================*/

export const API_BASE_URL = 'http://acva.vn/quiz/public/api';

/*===============================Endpoint=============================*/

//auth
export const LOGIN = '/login-api';
export const REGISTER = '/register-api';
export const FORGOT_PASSWORD = '/foget-password';
export const CHANGE_PASSWORD = '/admin/change-password';
export const SEND_MAIL_ACTIVE = '/send-mail-active';

//university
export const GET_ALL_UNIVERSITY = '/get-universities';

//video study
export const GET_ALL_VIDEO_STUDY = '/admin/get-video-study';

//Users
export const GET_USER_BY_ID = '/admin/get-user-by-id';
export const POST_USER_INFO = '/admin/update-user-info';
export const CHANGE_AVATAR = '/admin/change-avatar';
export const REMOVE_ACCOUNT= '/admin/delete-user';

//question and answer
export const GET_ALL_QUESTION_ANSWER = '/admin/get-qa';
export const SEND_QUESTION = '/admin/send-question';

//exams
export const GET_EXAM = '/admin/get-exams';
export const GET_EXAM_BY_ID = '/admin/get-exam-by-id';
export const GET_ATTENDANCE_BY_ID_EXAM = '/admin/get-detail-exams';
export const GET_EXAM_BY_LEVEL = '/admin/get-exam-by-level';
export const SET_ATTENDANCE = '/admin/set-attendance';
export const REGISTER_EXAM = '/admin/register-exam';

// notification
export const GET_ALL_NOTIFICATION = '/admin/get-notifications';
