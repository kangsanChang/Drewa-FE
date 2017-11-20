import API from './../api/DrewaAPI'

export default {
    'createApplicant': (store, payload) => {
        return new Promise((resolve, reject) => {
            API.addApplicant(payload.userInfo, payload.recaptchaToken)
                .then((res) => {
                    // resolve
                    const commitData = { token: res.data.data.token, applicantIdx: res.data.data.applicantIdx };
                    store.commit('createApplicant', commitData);
                    resolve();
                })
                .catch((e) => {
                    // 에러 핸들링 하기 위해선 e.response.data 를 까보면 알 수 있다.
                    // 400 대로 오면 여기로 오는 듯
                    const err = e.response.data;
                    if (err.msg === "User Already Exists") { 
                       reject('duplicated');
                    }
                    reject('fail');
                });
        })
    },
};