import axios from 'axios';

// proxy table 에 /api 를 localhost:3000/api 으로 연결함
// 서버에서 설정한 하위 path 만 맞춰주면 된다.
const BASE_URL = '/api';

export default {
  // 지원자 가입
  addApplicant(user, recaptchaToken) {
      return axios.post(BASE_URL+'/applicants', {
         userEmail: user.email,
         userPassword: user.password,
         recaptchaToken
        });
  },
  // 지원자 로그인
  applicantLogin(user, recaptchaToken) {
    return axios.post(BASE_URL+'/login', {
      userEmail: user.email,
      userPassword: user.password,
      recaptchaToken
    });
  },
  // application 접근 시 마운트 전 필요한 데이터 (면접 시간, season, 기타등등 가져오기)
  getApplicationSetting() {
    return axios.get(BASE_URL) // 서버에서 URL 정해줘야 함.
  },
  // 지원자가 적어놓은 정보 가져옴. application 접근 시 무조건 한번 실행
  getApplicantData(applicantIdx, token) {
    // header Authorization 에서 token 설정
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.get(BASE_URL+`/applicants/${applicantIdx}/application`)
  },
  postApplicantData(applicantIdx, token, userFormData) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    // Server에서 처리하는 변수명과 일치하면 가능 함.
    // return axios.post(BASE_URL + `/applicants/${applicantIdx}/application`, userFormData);
    // 일단은 가능한 버전으로
    return axios.post(BASE_URL + `/applicants/${applicantIdx}/application`, {
      userName: userFormData.name,
      userPosition: userFormData.position,
      applicantGender: userFormData.gender ,
      applicantBirthday: userFormData.birth ,
      applicantLocation: userFormData.residence ,
      applicantOrganization: userFormData.company ,
      applicantMajor: userFormData.major ,
      applicantPhone: userFormData.phone ,
      entryRoute: userFormData.knownFrom ,
      portfolioFileUrl: userFormData.portfolioFileUrl ,
      personalUrl: userFormData.personalUrl,
      answers: userFormData.answers ,
      interviewAvailableTime: userFormData.interviewAvailableTimes ,
    })
  },
  submitApplicantData(applicantIdx, token, userFormData) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    return axios.post(BASE_URL + `/applicants/${applicantIdx}/application/submit`, {
      userName: userFormData.name,
      userPosition: userFormData.position,
      applicantGender: userFormData.gender,
      applicantBirthday: userFormData.birth,
      applicantLocation: userFormData.residence,
      applicantOrganization: userFormData.company,
      applicantMajor: userFormData.major,
      applicantPhone: userFormData.phone,
      entryRoute: userFormData.knownFrom,
      portfolioFileUrl: userFormData.portfolioFileUrl,
      personalUrl: userFormData.personalUrl,
      answers: userFormData.answers,
      interviewAvailableTime: userFormData.interviewAvailableTimes,
    })
  },
};
