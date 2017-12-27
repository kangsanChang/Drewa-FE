import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ko'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import { routes } from './routes'
import { clone, assign } from 'lodash'
import moment from 'moment'

Vue.use(ElementUI, { locale })
Vue.use(VueRouter)

moment.locale('ko')

Vue.prototype.clone = clone
Vue.prototype.assign = assign
Vue.prototype.moment = moment

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
})
