import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './app.vue'
import VueRouter from 'vue-router'
import createRouter from './config/router'
import './assets/styles/global.scss'
import store from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
