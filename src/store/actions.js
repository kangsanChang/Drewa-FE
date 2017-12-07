import API from './../api/DrewaAPI'

export default {
  'createApplicant': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.addApplicant(payload.userInfo, payload.recaptchaToken)
        .then((res) => {
          // resolve
          const data = res.data.data
          const commitData = { token: data.token, applicantIdx: data.applicantIdx }
          store.commit('createApplicantInfo', commitData)
          sessionStorage.setItem('user_token', data.token)
          sessionStorage.setItem('user_idx', data.applicantIdx)
          resolve()
        })
        .catch((e) => {
          // 에러 핸들링 하기 위해선 e.response.data 를 까보면 알 수 있다.
          // 400 대로 오면 여기로 오는 듯
          const err = e.response.data
          if (err.msg === 'User Already Exists') {
            reject('duplicated')
          }
          console.log('error occour in action ', err)
          reject('fail')
        })
    })
  },
  'loginApplicant': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.applicantLogin(payload.loginForm, payload.recaptchaToken)
        .then((res) => {
          const data = res.data.data
          const commitData = { token: data.token, applicantIdx: data.applicantIdx }
          store.commit('createApplicantInfo', commitData)
          sessionStorage.setItem('user_token', data.token)
          sessionStorage.setItem('user_idx', data.applicantIdx)
          resolve()
        })
        .catch((e) => {
          const err = e.response.data
          reject(err)
        })
    })
  },
  // 401 에러 (토큰 만료 및 인증 이상한경우)일 때 redirect 는 actions 밖에서
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
  'getApplicantData': (store) => {
    return new Promise((resolve, reject) => {
      API.getApplicantData(store.state.applicantIdx, store.state.token)
        .then((res) => {
          const data = res.data.data
          resolve(data)
        })
        .catch((e) => {
          console.log('error in actions promise reject, getApplicantData')
          reject(e)
        })
    })
  },
  'removePortfolio': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.removePortfolio(store.state.applicantIdx, store.state.token)
        .then((res) => {
          const data = res.data.data
          resolve(data)
        })
        .catch((e) => {
          if (e.response.status === 401) {
            sessionStorage.setItem('savedData', JSON.stringify(payload.userFormData))
          }
          reject(e)
        })
    })
  },
  'postApplicantData': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.postApplicantData(store.state.applicantIdx, store.state.token, payload.userFormData)
        .then((res) => {
          resolve('Application saved successfully!')
        })
        .catch((e) => {
          if (e.response.status === 401) {
            sessionStorage.setItem('savedData', JSON.stringify(payload.userFormData))
          }
          reject(e)
        })
    })
  },
  'submitApplicantData': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.submitApplicantData(store.state.applicantIdx, store.state.token, payload.userFormData)
        .then((res) => {
          resolve('Application submitted successfully!')
        })
        .catch((e) => {
          if (e.response.status === 401) {
            sessionStorage.setItem('savedData', JSON.stringify(payload.userFormData))
          }
          reject(e)
        })
    })
  },
  'removeApplication': (store, payload) => {
    return new Promise((resolve, reject) => {
      API.removeApplication(store.state.applicantIdx, store.state.token)
        .then((res) => {
          if (res.status === 204) {
            resolve()
          }
        }).catch((e) => {
          reject(e)
        })
    })
  },
  'removeStoreData': (store) => {
    store.commit('removeApplicantInfo')
  },
  'getApplicantStatus': (store) => {
    return new Promise((resolve, reject) => {
      API.getApplicantStatus(store.state.applicantIdx, store.state.token)
        .then((res) => {
          const data = res.data.data
          resolve(data)
        })
    })
  }
}
