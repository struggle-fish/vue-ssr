
# Vue-router



```
html中添加
<!-- 路由匹配到的组件将渲染在这里 -->
<router-view></router-view>
// =========router.js=======================
import Router from 'vue-router'
import routes from './routes'
// 导出 router 函数
export default () => {
  return new Router({
    routes
  })
}
// ==========index.js 入口======================
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



```

#### new Router 常用api

> base  （不常用）

- 应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"

> linkActiveClass

- 默认值：router-link-active

- 模糊匹配

> linkExactActiveClass

- 默认值: "router-link-exact-active"

- 精确匹配

#### 导航守卫

```

const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}


beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}


注意 beforeRouteEnter 是支持给 next 传递回调的唯一守卫。
对于 beforeRouteUpdate 和 beforeRouteLeave 来说，
this 已经可用了，所以不支持传递回调，因为没有必要了。

beforeRouteUpdate (to, from, next) {
  // just use `this`
  this.name = to.params.name
  next()
}

beforeRouteLeave (to, from , next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}

```



#### 异步路由

```
移入对应组件的时候采用 import
const IndexView = () => import('../views/index');

```
添加 babel-plugin-syntax-dynamic-import 进行编译异步组件不然会报错的

```
.babelrc 添加配置
{
  "presets": [
    "env"
  ],
  "plugins": [
    "transform-vue-jsx",
    "syntax-dynamic-import",
    "transform-runtime"
  ]
}


```

