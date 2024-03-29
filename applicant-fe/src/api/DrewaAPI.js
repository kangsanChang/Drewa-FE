import axios from 'axios'

// proxy table 에 /api 를 localhost:3000/api 으로 연결함
// 서버에서 설정한 하위 path 만 맞춰주면 된다.
const BASE_URL = '/api'

export default {
  // intro page
  getMainRecruitment () {
    return axios.get(BASE_URL + '/recruitmentInfo/main')
  },
  // 지원자 가입
  applicantSignUp (user, recaptchaToken) {
    return axios.post(BASE_URL + '/applicants', {
      userEmail: user.email,
      userPassword: user.password,
      recaptchaToken
    })
  },
  // 지원자 로그인
  applicantLogin (user, recaptchaToken) {
    return axios.post(BASE_URL + '/login', {
      userEmail: user.email,
      userPassword: user.password,
      recaptchaToken
    })
  },
  // application 접근 시 마운트 전 필요한 데이터 (면접 시간, season, 기타등등 가져오기)
  getApplicationSetting (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.get(BASE_URL + '/recruitmentInfo/now')
  },
  // 지원자가 적어놓은 정보 가져옴. application 접근 시 무조건 한번 실행
  getApplicationData (applicantIdx, token) {
    // header Authorization 에서 token 설정
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.get(BASE_URL + `/applicants/${applicantIdx}/application`)
  },
  removePortfolio (applicantIdx, token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.delete(BASE_URL + `/applicants/${applicantIdx}/application/portfolio`)
  },
  postApplicantData (applicantIdx, token, userFormData) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    return axios.post(BASE_URL + `/applicants/${applicantIdx}/application`, {
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
      devAnswers: userFormData.devAnswers,
      desAnswers: userFormData.desAnswers,
      interviewAvailableTime: userFormData.interviewAvailableTimes
    })
  },
  removeApplication (applicantIdx, token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.delete(BASE_URL + `/applicants/${applicantIdx}/application`)
  },
  submitApplicantData (applicantIdx, token, userFormData) {
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
      devAnswers: userFormData.devAnswers,
      desAnswers: userFormData.desAnswers,
      interviewAvailableTime: userFormData.interviewAvailableTimes
    })
  },
  getApplicantStatus (applicantIdx, token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.get(BASE_URL + `/applicants/${applicantIdx}/status`)
  }
}
