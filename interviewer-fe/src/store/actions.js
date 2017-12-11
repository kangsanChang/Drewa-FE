import API from './../api/DrewaAPI'

export default {
  'interviewerSignUp': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.interviewerSignUp(payload.userInfo, payload.recaptchaToken)
        .then((res) => {
          const { token, interviewerIdx } = res.data.data
          store.commit('createInterviewerInfo', { token, interviewerIdx })
          sessionStorage.setItem('user_token', token)
          sessionStorage.setItem('user_idx', interviewerIdx)
          resolve()
        })
        .catch((e) => {
          const { msg } = e.response.data
          if (msg === 'User Already Exists') {
            reject(new Error('duplicated'))
          } else if (msg === 'invitation code is not matching') {
            reject(new Error('wrongCode'))
          } else {
            console.log('error occour in action ', e.response.data)
            reject(new Error('somethingWorng'))
          }
        })
    })
  },
  'loginInterviewer': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.interviewerLogin(payload.loginForm, payload.recaptchaToken)
        .then((res) => {
          const data = res.data.data
          if (data.interviewerIdx === undefined) {
            return reject(new Error('no User'))
          }
          const commitData = { token: data.token, interviewerIdx: data.interviewerIdx }
          store.commit('createInterviewerInfo', commitData)
          sessionStorage.setItem('user_token', data.token)
          sessionStorage.setItem('user_idx', data.interviewerIdx)
          resolve()
        })
        .catch((e) => {
          const err = e.response.data
          reject(err)
        })
    })
  }
}
