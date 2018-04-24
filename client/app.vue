<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <router-view ></router-view>
    <router-link to="/app?a=1&b=4">app</router-link>
    <router-link to="/login">login</router-link>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './views/layout/header.vue'
import Footer from './views/layout/footer.jsx'
export default {
  components: {
    Header,
    Footer
  },
  mounted () {
    console.log(this.$route, '路由')
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


