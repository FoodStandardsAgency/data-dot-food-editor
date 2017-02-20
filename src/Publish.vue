<!--
Publish view
Call endpoint to start push to public servers
-->
<template>
  <main>
    <div class="container">
      <div class="pull-right" style="margin-top:15px;">
      </div>
      <h1>Publish</h1>
      <messages/>
      <p>Nullam ut tincidunt nunc. [Pellentesque][1] metus lacus, commodo eget justo ut, rutrum varius nunc. Sed non rhoncus risus. Morbi sodales gravida pulvinar. Duis malesuada, odio volutpat elementum vulputate, massa magna scelerisque ante, et accumsan tellus nunc in sem. Donec mattis arcu et velit aliquet, non sagittis justo vestibulum. Suspendisse volutpat felis lectus, nec consequat ipsum mattis id. Donec dapibus vehicula facilisis. In tincidunt mi nisi, nec faucibus tortor euismod nec. Suspendisse ante ligula, aliquet vitae libero eu, vulputate dapibus libero. Sed bibendum, sapien at posuere interdum, libero est sollicitudin magna, ac gravida tellus purus eu ipsum. Proin ut quam arcu.</p>
      <button @click="publish">Publish</button>
    </div>
  </main>
</template>

<script>
  import { publish as apiPublish } from './Api'
  import bus from './components/bus'

  export default {
    data () {
      return {}
    },
    created: function () {},
    methods: {
      publish () {
        apiPublish().then(function (a) {
        }, (a) => {
          if (a) {
            if (a.body) {
              bus.$emit('message', {
                str: a.body,
                success: false
              })
            }
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
</style>
