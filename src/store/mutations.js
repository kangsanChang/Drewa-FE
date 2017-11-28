export default {
    'createApplicantInfo': (state, payload) => {
        state.token = payload.token;
        state.applicantIdx = payload.applicantIdx;
    }
};
