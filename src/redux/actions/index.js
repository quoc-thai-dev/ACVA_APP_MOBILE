import * as auth from './auth';
import * as university from './universitiesActions';
import * as exam from './examAction'


export default {
    ...auth,
    ...university,
    ...exam,
}