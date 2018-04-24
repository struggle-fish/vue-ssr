import 'babel-polyfill'
import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import createRouter from './config/router'
import './assets/styles/global.scss'

Vue.use(VueRouter)

const router = createRouter()

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
