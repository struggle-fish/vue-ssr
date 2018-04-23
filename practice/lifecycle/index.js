import Vue from 'vue'
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
