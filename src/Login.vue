<!--
Details view for a dataset
Allow editing of all attributes
-->
<template>
  <main>
    <div id="login">
      <div class="container">
        <form v-on:submit.prevent="">
          <div class="form-group col-md-6">
            <label for="username">Email</label>
            <input type="text" v-model="username"/>
          </div>
          <div class="form-group col-md-6">
            <label for="username">Password</label>
            <input type="password" v-model="password" />
          </div>
          <div class="form-group col-md-6">
            <button @click="login">Login</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
  import {getLoggedInUser, login as ApiLogin} from './Api'

  export default {
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    beforeRouteLeave (to, from, next) {},
    data () {
      return {
        username: '',
        password: '',
        successMsg: '',
        warnMsg: ''
      }
    },
    filters: {},
    methods: {
      login () {
        console.log('logging in')
        ApiLogin({userid: this.username, password: this.password}).then(function (user) {
          if (user) {
            this.$router.push({name: 'datasets'})
          } else {
            // Error couldn't log in
            this.warnMsg = 'Sorry, couldn\'t log in with those details'
          }
        }, (e) => {
          this.warnMsg = 'Sorry, couldn\'t log in with those details'
        })
      },
      fetchData () {
        getLoggedInUser().then((user) => {
          if (user) {
            // Redirect to /
            this.$router.push({name: 'datasets'})
          }
        }, (e) => {
          // Do nothing, we're in the right place
        })
      }
    },
    components: {}
  }
</script>

<style lang='scss'>
</style>
