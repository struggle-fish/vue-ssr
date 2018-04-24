// import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    name: 'index', // 路由命名 相当于id
    meta: { // 保存路由里信息页面源信息
      test: 'test-1'
    },
    // children: [
    //   {
    //     path: '/test',
    //     component: Login
    //   }
    // ], // 嵌套路由
    component: () => import('../views/todo/todo.vue')
  },
  {
    path: '/login',
    component: Login
  }
]
