import API from './../api/DrewaAPI'

export default {
    'createApplicant': (store, payload) => {
        return new Promise((resolve, reject) => {
            API.addApplicant(payload.userInfo, payload.recaptchaToken)
                .then((res) => {
                    // resolve
                    const data = res.data.data;
                    const commitData = { token: data.token, applicantIdx: data.applicantIdx };
                    store.commit('createApplicantInfo', commitData);
                    resolve();
                })
                .catch((e) => {
                    // 에러 핸들링 하기 위해선 e.response.data 를 까보면 알 수 있다.
                    // 400 대로 오면 여기로 오는 듯
                    const err = e.response.data;
                    if (err.msg === "User Already Exists") { 
                       reject('duplicated');
                    }
                    console.log('error occour in action ', err)
                    reject('fail');
                });
        })
    },
    'loginApplicant': (store, payload) => {
        return new Promise((resolve, reject) => {
            API.applicantLogin(payload.loginForm, payload.recaptchaToken)
                .then((res) => {
                    const data = res.data.data;
                    const commitData = { token: data.token, applicantIdx: data.applicantIdx };
                    store.commit('createApplicantInfo', commitData);
                    resolve();
                })
                .catch((e) => {
                    const err = e.response.data;
                    reject(err);
                })
        });
    },
    'getApplicantData' : (store) => {
        return new Promise((resolve, reject) => {
            API.getApplicantData(store.state.applicantIdx, store.state.token)
            .then((res) => {
                const data = res.data.data;
                resolve(data)
            })
            .catch((e)=> {
                console.log('error in actions promise reject, getAPplicantData');
                reject(e);
            })
        })
    },
    'postApplicantData' : (store, payload) => {
        return new Promise((resolve, reject) => {
            API.postApplicantData(store.state.applicantIdx, store.state.token, payload.userFormData)
            .then((res) => {
                const data = res.data.data;
                resolve('Application saved successfully!')
            })
            .catch((e) => {
                console.log('error in action promise reject, postApplicantData');
                reject(e);
            })
        })
    },
    'submitApplicantData': (store, payload) => {
        return new Promise((resolve, reject) => {
            API.submitApplicantData(store.state.applicantIdx, store.state.token, payload.userFormData)
                .then((res) => {
                    const data = res.data.data;
                    resolve('Application submitted successfully!')
                })
                .catch((e) => {
                    console.log('error in action promise reject, submitApplicantData');
                    reject(e);
                })
        })
    }
};