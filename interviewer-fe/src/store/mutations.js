export default {
  'createInterviewerInfo': (state, payload) => {
    state.token = payload.token
    state.interviewerIdx = payload.interviewerIdx
  },
  'removeInterviewerInfo': (state) => {
    state.token = ''
    state.interviewerIdx = ''
  }
}
