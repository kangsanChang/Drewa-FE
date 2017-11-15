import Intro from './components/Intro.vue'
import Join from './components/Join.vue'

export const routes = [
    { path: '/', name: 'intro', component: Intro },
    { path: '/join', name: 'join', component: Join },
]