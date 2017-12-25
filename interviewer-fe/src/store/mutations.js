export default {
  'createInterviewerInfo': (state, payload) => {
    state.token = payload.token
    state.userIdx = payload.userIdx
    state.userType = payload.userType
  },
  'removeInterviewerInfo': (state) => {
    state.token = ''
    state.userIdx = ''
    state.userType = ''
  }
}
