<template>
  <div id="app">
    <Dataset-Details></Dataset-Details>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Details from './Dataset-Details'

export default {
  name: 'app',
  components: {
    Hello,
    'Dataset-Details': Details
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
