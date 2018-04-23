import Vue from 'vue'

const component = {
  name: 'comp',
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'component value'
    }
  },
  template: `
    <div :style="style">
      <slot></slot>
    </div>
  `
}

new Vue({
  el: '#root',
  data () {
    return {
      value: '123'
    }
  },
  components: {
    CompOne: component
  },
  template: `
    <comp-one ref="comp">
      <span ref="span">{{value}}</span>
    </comp-one>
  `
})
