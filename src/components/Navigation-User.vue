<template>
  <ul class="nav navbar-nav navbar-right" v-if="user">
    <li class="dropdown">
      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
        <span class="glyphicon glyphicon-user"></span>
        <strong>{{user.name}}</strong>
        <span class="glyphicon glyphicon-chevron-down"></span>
      </a>
      <ul class="dropdown-menu">
        <li>
          <div class="navbar-login">
            <div class="row">
              <!-- <div class="col-lg-4">
              <p class="text-center">
              <span class="glyphicon glyphicon-user icon-size"></span>
              </p>
              </div> -->
              <div class="col-lg-8">
                <p class="text-center"><strong>{{user.name}}</strong></p>
                <p class="text-center small">{{user.userid}}</p>
                <!-- <p class="text-left">
                <a href="#" class="btn btn-primary btn-block btn-sm">Account details</a>
                </p> -->
              </div>
            </div>
          </div>
        </li>
        <li class="divider"></li>
          <li>
            <div class="navbar-login navbar-login-session">
              <div class="row">
                <div class="col-lg-12">
                  <p>
                    <a @click="logout" class="btn btn-danger btn-block">Logout</a>
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
  import 'bootstrap'
  import {getLoggedInUser, logout as apiLogout} from '../Api'

  export default {
    created () {
      this.fetchData()
    },
    components: {},
    watch: {
      '$route': 'fetchData'
    },
    data () {
      return {
        user: {}
      }
    },
    mounted () {
    },
    methods: {
      fetchData () {
        getLoggedInUser().then((user) => {
          if (user) {
            this.user = user
          } else {
            this.redirectToLogin() // Redirect to login page
          }
        }, () => {
          this.redirectToLogin()
        })
      },
      logout () {
        apiLogout().then(() => {
          this.redirectToLogin() // Redirect to login page
        })
      },
      redirectToLogin () {
        this.user = null
        this.$router.push({name: 'login', params: { loggedOut: true }}).catch((error) => {
          if (error.name !== 'NavigationDuplicated' &&
          error.message.includes('Avoided redundant navigation to current location')) {
            console.log(error)
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
.navbar-login {
  width: 205px;
  padding: 10px;
  padding-bottom: 0px;
}

.navbar-login-session {
  padding: 10px;
  padding-bottom: 0px;
  padding-top: 0px;
}

.icon-size {
  font-size: 87px;
}
</style>
