import axios from 'axios';

// proxy table 에 /api 를 localhost:3000/api 으로 연결함
// 서버에서 설정한 하위 path 만 맞춰주면 된다.
const BASE_URL = '/api';

export default {
  addApplicant(user, recaptchaToken) {
      return axios.post(BASE_URL+'/applicants', {
         userEmail: user.email,
         userPassword: user.password,
         recaptchaToken
        });
  }
};
