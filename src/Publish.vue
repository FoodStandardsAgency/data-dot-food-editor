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

      <button class="btn btn-lg btn-success pull-right" @click="publish">Publish all</button>

      <h3>Publish changes from editor to public dataset browser</h3>
      <p>Click publish to start the process of publishing all datasets marked as <em>'to Publish'</em>.</p>
      <p>This will publish all changes made to the data by any user.</p>
      <p>This process can take up to 10 minutes, please be patient. </p>
    </div>
  </main>
</template>

<script>
  import { publish as apiPublish } from './Api'
  import bus from './components/Bus'

  export default {
    data () {
      return {}
    },
    created: function () {},
    methods: {
      publish () {
        apiPublish().then(function () {
          bus.$emit('message', {
            str: 'Publish started',
            success: true
          })
        }, (a) => {
          if (a) {
            if (a.status === 204) {
              // it did work but came back with a 204 status code! Empty
              bus.$emit('message', {
                str: 'Publish started',
                success: true
              })
              return
            }
            if (a.body) {
              bus.$emit('message', {
                str: a.body,
                success: false
              })
            } else {
              // it did work but came back with a 204 status code! Empty
              bus.$emit('message', {
                str: 'Publish started',
                success: true
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
