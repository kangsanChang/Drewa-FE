export default {
    'createApplicant': (state, payload) => {
        state.token = payload.token;
        state.applicantIdx = payload.applicantIdx;
    }
};
