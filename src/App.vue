<!--
Base Vue instance
Composite the Vue components together
Apply any custom site-wide styles
-->
<template>
  <div>
    <cairnNav></cairnNav>
    <router-view class="view"></router-view>
    <cairnFooter></cairnFooter>
  </div>
</template>

<script>
  import cairnNav from './components/Navigation'
  import cairnFooter from './components/Footer'
  export default {
    name: 'app',
    components: {
      cairnNav,
      cairnFooter
    }
  }
</script>

<style lang="scss">
  @import "assets/bootstrap-override";
  @import "assets/app";
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
