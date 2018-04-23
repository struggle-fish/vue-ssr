import Vue from 'vue'

let compoent = {
  template: '<div>{{ text }}</div>',
  data () {
    return {
      text: '子组件data的是函数。二货'
    }
  }
}

// 全局组件
// Vue.component('CompOne', compoent)

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
