### vue 基础

#### 说明
总结于慕课网 Jokcy 和 珠峰培训 Vue 基础课程

http://coding.imooc.com/class/196.html
http://www.zhufengpeixun.cn/main/course/index.html

#### 目录说明:

- webapck.config.practice.js vue  // 基础练习使用的webpack配置

- practice  // 练习目录


```
resolve: {
 alias: { // 指定 vue 版本
  'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
 }
}
// esm 后缀可以直接在 vue 实例里面写 template
```

#### 实例属性

1. vm.$mount('#root')
    - 如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
2. vm.$data
3. vm.$el
    - Vue 实例使用的根 DOM 元素。
4. vm.$props
5. vm.$options
    - vm上的所有属性
    - vm.$options.render 下一次才会生效
6. vm.$slots
7. vm.$refs
    - 一个对象，持有注册过 ref 特性 的所有 DOM 元素和组件实例。
8. vm.$isServer
    - 当前 Vue 实例是否运行于服务器。

#### 实例方法
1. 数据
    - vm.$watch()
    - vm.$set()
2. 事件
    - vm.$on() // 订阅（监听）事件
    - vm.$emit() // 发布事件
3. 生命周期
    - vm.$forceUpdate()
    - vm.$nextTick()  ``` 主: vue 是异步渲染DOM的。```


#### 生命周期

```
new Vue({
  el: '#root',
  template: '<div>生命周期</div>',
  beforeCreate () {
    // 初始化时执行
    // el 和 data 并未初始化
    console.log(this, 'beforeCreate')
  },
  created () {
    // 初始化执行
    // 完成了 data 数据的初始化，el没有
    // ajax 调用接口
    console.log(this.$el, 'mounted')
  },
  beforeMount () {
    // 挂载前
    // 完成了 el 和 data 初始化
    console.log(this.$el, 'mounted')
  },
  mounted () {
    // 完成挂载 替换 DOM
    // 挂载 el 属性
    console.log(this.$el, 'mounted')
  },
  beforeUpdate () {
    // 数据更新才会执行
  },
  updated () {

  },
  activated () {
    // for keep-alive 组件被激活时候调用
  },
  deactivated () {
    // for keep-alive 组件被移除时候调用
  },
  beforeDestory () {
    // 销毁前
  },
  destoryed () {
    // 已经销毁
  }
})

```

#### computed 和 wacth

> computed:

- 依赖其他的属性计算所得出最后的值
- computed是计算属性， 不是方法
方法不会有缓存，computed 会根据依赖（归Vue管理的数据，可以响应式变化的）的属性进行缓存
两部分组成 get 和 set (不能只写set), 一般情况下通过js 赋值影响其他人或者表单元素设置的时候才会调用set
- 默认调用 get 必须有 return 不支持异步

> watch

- 只有值变化的时候才会触发 支持异步
- 默认值监控一层数据变化，深度监控 deep : true
- 如果一个值变化后会引起一系列操作，或者一个值变化会引起一系列值的变化(一对多)


#### 指令

v-text

v-html
- 更新元素的 innerHTML 。注意：内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译

v-show
- 根据表达式之真假值，切换元素的 display CSS 属性

v-if
v-else
v-else-if
- 动态增删节点

v-for
- key 指定 key 会有缓存 一般是 id


v-on

- 事件绑定

v-model
- 在表单控件或者组件上创建双向绑定
- checkbox 的时候 配合 :vlaue 来使用
- radio 的时候 用 value v-model取的是value的值

v-cloak


#### 组件

> 全局组件

```
let compoent = {
  template: '<div>我是组件</div>'
}

// 全局组件
Vue.component('CompOne', compoent) // 建议驼峰 一个组件就是一个类

new Vue({
  el: '#root',
  template: `
  <div><comp-one></comp-one></div>
  `,
  data: {
    isActive: false
  }
})


```

> 局部组件

```
import Vue from 'vue'
// data 子组件是函数 组件不能夸作用域。
let compoent = {
  template: '<div>{{ text }}</div>',
  data () {
    return {
      text: '子组件data的是函数。二货'
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: compoent
  },
  template: `
  <div><comp-one></comp-one></div>
  `,
  data: {
    isActive: false
  }
})

```
> props

父组件的数据需要通过 prop 才能下发到子组件中

父 => 子 属性传递

子 => 父
父绑定好**一些事件**， 子触发，将参数传递出去, 父更新数据， 子刷新数据视图更新

注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。

> extend 继承

> parent

> v-model组件实现

```
import Vue from 'vue'

const component = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value1'],
  template: `
  <div>
    <input type="text" @input="handleInput" :value="value1">
  </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  data () {
    return {
      value: '123'
    }
  },
  template: `
  <div>
    父：{{value}}
    注意此处两种写法是等价的
    <comp-one @change="val => { value = val }" :value1 = "value"></comp-one>
    <comp-one v-model="value"></comp-one>
  </div>
  `
})


```

> ref

this.$refs.aa 可以获取组件实例


> provide / inject

可以在子组件引用父组件的属性。
官方不推荐使用

```
父：
provide () {
 const data = {}

 Object.defineProperty(data, 'value', {
  get: () => this.value,
   enumerable: true // 可读取
 })

 return {
  yeye: this,
  data
 }
}

子：
inject: ['yeye', 'data']
```

#### render 渲染

正常写模板如下：

```
template: `
<comp-one ref="comp">
  <span ref="span">{{value}}</span>
</comp-one>
`
等价于
render (createElement) {
  return createElement(
    'comp-one',
    {
      ref: 'comp',
      props: {
        props1: this.value
      },
      // on: {
      //   click: this.handleClick
      // },
      nativeOn: {
        click: this.handleClick
      }
    },
    [
      createElement('span', {
        ref: 'span',
        slot: 'header',
        attrs: {
          id: 'test-id'
        }
      }, this.value)
    ]
  )
}

```


![image](https://upload-images.jianshu.io/upload_images/1567373-182fddb8edbde9f3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700)


> 以下是等价的

```
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
// v1.0写法
new Vue({
  el: '#app',
  router,
  components: { App }, // 此处App就是一个自定义组件
  template: '<App/>' // 组件的使用
})
/* eslint-disable no-new */
// v2.0写法
new Vue({
  el: '#app',
  router,
  render: h => h(App)
  // render 等价于 上面的 components 和 template
})


```
