export default {
  'createInterviewerInfo': (state, payload) => {
    state.token = payload.token
    state.userIdx = payload.userIdx
    state.userType = payload.userType
    state.userName = payload.userName
    state.userEmail = payload.userEmail
  },
  'removeInterviewerInfo': (state) => {
    state.token = ''
    state.userIdx = ''
    state.userType = ''
    state.userName = ''
    state.userEmail = ''
  }
}
