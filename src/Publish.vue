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
      <button class="btn btn-lg btn-success pull-right" @click="publish">Publish</button>

      <h3>Copy changes from editor to public browser</h3>
      <messages/>
      <p>Click publish to start the process of publishing the current editor datasets to the public browse site. </p>
      <p>This process can take up to 10 minutes, please be patient. </p>
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
