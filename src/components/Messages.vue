<!--
Page messages component
Show messages from the page in a standard format
-->
<template>
  <div class="messages">
    <transition name="fade">
      <div class="message successMsg bg-success" v-if="showSuccess">{{success}}</div>
    </transition>
    <transition name="fade">
      <div class="message warnMsg bg-danger" v-if="showWarn">{{warn}}</div>
    </transition>
  </div>
</template>

<script>
  let successTimeout
  // let warnTimeout
  export default {
    created () {
      this.$on('message', function (msg) {
        console.log('New Message', msg)
      })
    },
    props: {
      success: String,
      warn: String
    },
    data: function () {
      return {
        showSuccess: false,
        showWarn: false
      }
    },
    watch: {
      success (oldVal) {
        console.log('show success')

        this.showSuccess = true
        if (successTimeout) {
          clearTimeout(successTimeout)
        }
        successTimeout = setTimeout(() => {
          console.log('hide success')
          this.showSuccess = false
          this.success = ''
        }, 1000)
      },
      warn (oldVal) {
        // warnTimeout = new Date().getTime()
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>
