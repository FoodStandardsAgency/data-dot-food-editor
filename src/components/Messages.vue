<!--
Page messages component
Show messages from the page in a standard format
-->
<template>
  <div class="messages">
    <div class="message successMsg bg-success" v-if="success">{{success}}</div>
    <div class="message warnMsg bg-danger" v-if="warn">{{warn}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      success: String,
      warn: String
    }
  }
</script>

<style scoped>
</style>
