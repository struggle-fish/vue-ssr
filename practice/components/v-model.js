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
    <comp-one @change="val => { value = val }" :value1 = "value"></comp-one>
    <comp-one v-model="value"></comp-one>
  </div>
  `
})
