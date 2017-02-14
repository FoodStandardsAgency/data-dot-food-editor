<!--
Details view for a dataset
Allow editing of all attributes
-->
<template>
  <main>
    <div id="login">
      <div class="container">
        <div class="loginForm col-md-6 col-md-offset-3">
          <messages :success="successMsg" :warn="warnMsg"></messages>
          <form v-on:submit.prevent="">
            <div class="form-group">
              <label for="username">Email</label>
              <input type="text" class="input" v-model="username"/>
            </div>
            <div class="form-group">
              <label for="username">Password</label>
              <input type="password" class="input" v-model="password" />
            </div>
            <div class="form-group">
              <button @click="login">Login</button>
            </div>
          </form>
        </div>
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
    beforeRouteLeave (to, from, next) {
      next()
    },
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
        ApiLogin({userid: this.username, password: this.password}).then(() => {
          this.$router.push({name: 'datasets'})
        }, (e) => {
          this.warnMsg = 'Sorry, couldn\'t log in: ' + e.body
        })
      },
      redirect () {
        this.$router.push({name: 'datasets'})
      },
      fetchData () {
        window.that = this
        getLoggedInUser().then((user) => {
          if (user) {
            // Redirect to /
            window.$router = this.$router
            this.$router.push({path: '/'})
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
  .loginForm {
    margin-top: 20px;
    text-align: center;
  }
</style>
