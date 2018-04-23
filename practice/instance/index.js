import Vue from 'vue'

const vm = new Vue({
  // el: '#root',
  template: '<div>哈哈</div>'
})

// 如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。
// 可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
vm.$mount('#root')
