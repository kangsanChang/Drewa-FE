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
          const data = res.data.data
          resolve(data)
        })
    })
  },
  'postApplications': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.postApplications(store.state.token, payload.applicants)
        .then((res) => {
          const data = res.data.data
          resolve(data)
        })
    })
  },
  'getApplicationSetting': (store) => {
    return new Promise((resolve, reject) => {
      API.getApplicationSetting(store.state.token)
        .then((res) => {
          const data = res.data.data
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },

  'getApplicationData': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.getApplicationData(payload.applicantIdx, store.state.token)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },

  'getEvalData': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.getEvalData(payload.applicantIdx, store.state.token)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },

  'postComment': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.postComment(payload.comment, payload.createdAt, payload.applicantIdx, store.state.token)
        .then((res) => {
          resolve()
        })
        .catch((e) => {
          reject(e)
        })
    })
  },

  'deleteComment': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.deleteComment(payload.id, payload.applicantIdx, store.state.token)
        .then((res) => {
          resolve()
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  'sendPoint': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.sendPoint(payload.point, payload.applicantIdx, store.state.token)
        .then((res) => {
          resolve()
        })
        .catch((e) => {
          reject(e)
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
          const data = res.data.data
          resolve(data)
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
