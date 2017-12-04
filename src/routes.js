// 라우팅 할 컴포넌트만 가져오면 된다.

import Intro from './components/Intro.vue'
import Join from './components/Join.vue'
import Login from './components/Login.vue'
import Status from './components/ApplicantStatus.vue'
import Form from './components/ApplicationForm.vue'

import store from './store'

export const routes = [
    { path: '/', name: 'intro', component: Intro },
    { path: '/join', name: 'join', component: Join },
    { path: '/login', name: 'login', component: Login },
    { path: '/status', name: 'status', component: Status , beforeEnter: checkToken },
    { path: '/application', name: 'application', component: Form , beforeEnter: checkToken },
]

// es6 arrow function 스타일로 적으면 안먹힘!!
// 궁금한점 :
// check Token 으로 토큰이 존재하는지만 확인 함.
// 이래도 되는지? API 요청 시에는 token header 에 담아서 보내긴 함.
function checkToken(to, from, next){
    // local storage 에 있는지도 확인해야 함.
    if(store.state.token === "" && sessionStorage.getItem('user_token') === null) {
        alert('지원자 로그인 후 이용하시기 바랍니다.');
        next('/login')
    } else {
        next();
    }
}