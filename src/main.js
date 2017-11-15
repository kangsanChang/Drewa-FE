import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import {routes} from './routes'

Vue.use(ElementUI);
Vue.use(VueRouter);

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
