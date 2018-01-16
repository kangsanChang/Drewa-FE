import axios from 'axios'

// proxy table 에 /api 를 localhost:3000/api 으로 연결함
// 서버에서 설정한 하위 path 만 맞춰주면 된다.
const BASE_URL = '/api'

export default {
  // 면접관 가입
  interviewerSignUp (user, recaptchaToken) {
    return axios.post(BASE_URL + '/interviewer', {
      userEmail: user.email,
      userPassword: user.password,
      userName: user.name,
      userPosition: user.position,
      invitationCode: user.invitation_code,
      recaptchaToken
    })
  },
  // 면접관 로그인
  interviewerLogin (user, recaptchaToken) {
    return axios.post(BASE_URL + '/login', {
      userEmail: user.email,
      userPassword: user.password,
      recaptchaToken
    })
  },
  // evaluation
  getApplications (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.get(BASE_URL + '/evaluation/application')
  },
  getApplicationSetting (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.get(BASE_URL + '/recruitmentInfo/now')
  },
  getApplicationData (applicantIdx, token) {
    // header Authorization 에서 token 설정
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.get(BASE_URL + `/applicants/${applicantIdx}/application`)
  },
  getEvalData (applicantIdx, token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.get(BASE_URL + `/evaluation/application/${applicantIdx}`)
  },
  postComment (comment, createdAt, applicantIdx, token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.post(BASE_URL + `/evaluation/application/${applicantIdx}/comments`, { comment, createdAt })
  },
  deleteComment (id, applicantIdx, token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.delete(BASE_URL + `/evaluation/application/${applicantIdx}/comments/${id}`)
  },
  sendPoint (point, applicantIdx, token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.post(BASE_URL + `/evaluation/application/${applicantIdx}/point`, { point })
  },

  // admin
  // 모든 시즌 번호 가져오기
  getRecruitmentSeasons (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.get(BASE_URL + '/recruitmentinfo/')
  },
  // 설정 정보 받아오기
  getRecruitmentInfo (token, season) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.get(BASE_URL + '/recruitmentinfo/' + season)
  },
  // 설정 정보 보내기
  postRecruitmentInfo (token, settingForm) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.post(BASE_URL + '/recruitmentInfo/' + settingForm.season, { settingForm })
  },
  removeRecruitmentInfo (token, season) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.delete(BASE_URL + '/recruitmentinfo/' + season)
  },
  postApplications (token, applicants) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.post(BASE_URL + '/evaluation/application', applicants)
  },
  seasonEnd (token, season) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.put(BASE_URL + '/recruitmentinfo/' + season + '/end')
  }
}
