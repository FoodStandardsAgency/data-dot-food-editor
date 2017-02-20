<!--
Details view for a dataset
Allow editing of all attributes
-->
<template>
  <main>
    <div id="login">
      <div class="container">
        <div class="loginForm col-md-6 col-md-offset-3">
          <messages/>
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
  import bus from './components/Bus'

  export default {
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    beforeRouteLeave (to, from, next) {
      if (this.loggedIn) {
        next()
      }
    },
    data () {
      return {
        username: '',
        password: '',
        loggedIn: false
      }
    },
    filters: {},
    methods: {
      login () {
        ApiLogin({userid: this.username, password: this.password}).then(() => {
          bus.$emit('message', {
            str: 'Logged in Successfully',
            success: true
          })
          this.redirect()
        }, (e) => {
          bus.$emit('message', {
            str: 'Sorry, couldn\'t log in: ' + e.body,
            success: false
          })
        })
      },
      redirect () {
        this.loggedIn = true // Allow navigation away
        this.$router.push({name: 'datasets'})
      },
      fetchData () {
        window.that = this
        getLoggedInUser().then((user) => {
          if (user) {
            this.redirect()
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
