<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <router-view ></router-view>
    <router-link to="/app?a=1&b=4">app</router-link>
    <router-link to="/login">login</router-link>
    count: {{ counter }}
    fullName: {{ fullNames }}
    textVal: {{ textVal }}
    textPlus: {{ textPlus }}
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './views/layout/header.vue'
import Footer from './views/layout/footer.jsx'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  components: {
    Header,
    Footer
  },
  computed: {
    ...mapState({
      counter: (state) => state.count,
      textVal: (state) => state.a.text
    }),
    ...mapGetters({
      fullNames: 'fullName',
      textPlus: 'a/textPlus'
    })
  },
  mounted () {
    // this.updateCountAsync({
    //   num: 1,
    //   time: 2000
    // })
    // this.$store.state.count = 9
    // let i = 1
    // setInterval(() => {
    //   this.$store.commit('updateCount', {
    //     num: i++,
    //     num2: 3
    //   })
    // }, 1000)
    this['a/updateText'](999)
    // this['a/add']()
    // let i = 1
    // setInterval(() => {
    //   this.updateCount({
    //     num: i++,
    //     num2: 3
    //   })
    // }, 1000)
  },
  methods: {
    ...mapMutations(['updateCount', 'a/updateText']),
    ...mapActions(['updateCountAsync', 'a/add'])
  }
}
</script>

<style lang="scss" scoped>
  #app{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  #cover{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #999;
    opacity: .9;
    z-index: -1;
  }
</style>


