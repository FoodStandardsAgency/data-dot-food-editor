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
              <input type="text" class="input" name="email" id="email" v-validate data-vv-rules="required" v-model="username"/>
              <span class="validation-errors" v-show="errors.has('email')">{{ errors.first('email') }}</span>
            </div>
            <div class="form-group">
              <label for="username">Password</label>
              <input type="password" class="input" name="password" id="password" v-validate data-vv-rules="required" v-model="password" />
              <span class="validation-errors" v-show="errors.has('password')">{{ errors.first('password') }}</span>
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
  import Raven from 'raven-js'

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
          Raven.setUserContext({
            email: this.username
          })
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
        }, () => {
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

  span {
    display: block;
  }

  label {
    padding-right: 1em;
  }
</style>
