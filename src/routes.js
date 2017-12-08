// 라우팅 할 컴포넌트만 가져오면 된다.

import Intro from './components/Intro.vue'
import ApplicantSignUp from './components/ApplicantSignUp.vue'
import ApplicantLogin from './components/ApplicantLogin.vue'
import Status from './components/ApplicantStatus.vue'
import Form from './components/ApplicationForm.vue'
import InterviewerSignUp from './components/InterviewerSignUp.vue'
import InterviewerLogin from './components/InterviewerLogin.vue'

import store from './store'

export const routes = [
  {path: '/', name: 'intro', component: Intro},
  {path: '/signup', name: 'signup', component: ApplicantSignUp},
  {path: '/login', name: 'login', component: ApplicantLogin},
  {path: '/status', name: 'status', component: Status, beforeEnter: checkToken},
  {path: '/application', name: 'application', component: Form, beforeEnter: checkToken},
  {path: '/test', name: 'InterviewerLogin', component: InterviewerLogin},
  {path: '/iv-signup', name: 'iv-signup', component: InterviewerSignUp}
]

// es6 arrow function 스타일로 적으면 안먹힘!!
function checkToken (to, from, next) {
  // local storage 에 있는지도 확인해야 함.
  if (store.state.token === '' && sessionStorage.getItem('user_token') === null) {
    alert('지원자 로그인 후 이용하시기 바랍니다.')
    next('/login')
  } else {
    next()
  }
}
