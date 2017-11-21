// 라우팅 할 컴포넌트만 가져오면 된다.

import Intro from './components/Intro.vue'
import Join from './components/Join.vue'
import Form from './components/ApplicationForm.vue'

export const routes = [
    { path: '/', name: 'intro', component: Intro },
    { path: '/join', name: 'join', component: Join },
    { path: '/application', name: 'application', component: Form }, // 동적 라우팅 필요.
]