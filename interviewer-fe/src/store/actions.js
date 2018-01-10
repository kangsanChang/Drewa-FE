import API from './../api/DrewaAPI'

export default {
  'interviewerSignUp': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.interviewerSignUp(payload.userInfo, payload.recaptchaToken)
        .then((res) => {
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
          const {token, userIdx, userType, userName, userEmail} = res.data.data
          console.log(res.data.data)
          if (!userType) { return reject(new Error('no User')) }
          const commitData = {token, userType, userName, userEmail}
          if (userType === 'interviewer') {
            commitData.userIdx = userIdx
          }
          store.commit('createInterviewerInfo', commitData)
          sessionStorage.setItem('user_token', token)
          sessionStorage.setItem('user_idx', userIdx)
          sessionStorage.setItem('user_type', userType)
          sessionStorage.setItem('user_name', userName)
          sessionStorage.setItem('user_email', userEmail)
          resolve()
        })
        .catch((e) => {
          const err = e.response.data
          reject(err)
        })
    })
  },
  'getApplications': (store) => {
    return new Promise((resolve, reject) => {
      API.getApplications(store.state.token)
        .then((res) => {
          resolve(res)
        })
    })
  },

  'getRecruitmentSeasons': (store) => {
    return new Promise((resolve, reject) => {
      API.getRecruitmentSeasons(store.state.token)
        .then((res) => {
          const data = res.data.data
          const seasons = data.map(i => { return {season: i.season, isFinished: i.isFinished} })
          resolve(seasons)
        })
    })
  },
  'getRecruitmentInfo': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.getRecruitmentInfo(store.state.token, payload.season)
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          const err = e.response.data
          reject(err)
        })
    })
  },
  'postRecruitmentInfo': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.postRecruitmentInfo(store.state.token, payload.settingForm)
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          const err = e.response.data
          reject(err)
        })
    })
  },
  'removeRecruitmentInfo': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.removeRecruitmentInfo(store.state.token, payload.season)
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          const err = e.response.data
          reject(err)
        })
    })
  },
  'seasonEnd': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.seasonEnd(store.state.token, payload.season)
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          const err = e.response.data
          reject(err)
        })
    })
  }
}
