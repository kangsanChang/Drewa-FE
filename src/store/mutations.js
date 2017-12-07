export default {
  'createApplicantInfo': (state, payload) => {
    state.token = payload.token
    state.applicantIdx = payload.applicantIdx
  },
  'removeApplicantInfo': (state) => {
    state.token = ''
    state.applicantIdx = ''
  }
}
