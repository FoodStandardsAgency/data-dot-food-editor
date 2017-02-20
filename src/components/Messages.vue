<!--
Page messages component
Show messages from the page in a standard format
-->
<template>
  <div class="messages">
    <transition name="fade">
      <div class="message" v-bind:class="{successMsg: success, 'bg-success': success, 'warnMsg': !success, 'bg-danger': !success}" v-if="str">{{str}}</div>
    </transition>
  </div>
</template>

<script>
  import bus from './bus'
  let timeout
  // let warnTimeout
  export default {
    created () {
      bus.$on('message', (msg) => {
        // Merge msg with prototype
        // Then apply to data
        this.str = msg.str
        this.success = msg.success

        if (timeout) {
          clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
          this.str = ''
        }, 5000)
      })
    },
    data: function () {
      return {
        str: '',
        success: true
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
</style>
