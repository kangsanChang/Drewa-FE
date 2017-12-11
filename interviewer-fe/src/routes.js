// 라우팅 할 컴포넌트만 가져오면 된다.

import InterviewerSignUp from './components/InterviewerSignUp.vue'
import InterviewerLogin from './components/InterviewerLogin.vue'
import Dashboard from './components/Dashboard.vue'

import store from './store'

export const routes = [
  {path: '/', name: 'InterviewerLogin', component: InterviewerLogin},
  {path: '/signup', name: 'signup', component: InterviewerSignUp},
  {path: '/summary', name: 'summary', component: Dashboard, beforeEnter: checkToken}
]

// es6 arrow function 스타일로 적으면 안먹힘!!
function checkToken (to, from, next) {
  // local storage 에 있는지도 확인해야 함.
  if (store.state.token === '' && sessionStorage.getItem('user_token') === null) {
    alert('면접관 로그인 후 이용하시기 바랍니다.')
    next('/')
  } else {
    next()
  }
}
