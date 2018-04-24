import Router from 'vue-router'
import routes from './routes'

// 导出 router
export default () => {
  return new Router({
    routes,
    mode: 'history'
  })
}
