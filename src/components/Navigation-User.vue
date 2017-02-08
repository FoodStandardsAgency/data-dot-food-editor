<template>
  <ul class="nav navbar-nav navbar-right">
    <li class="dropdown">
      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
        <span class="glyphicon glyphicon-user"></span> 
        <strong>Example User</strong>
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
                <p class="text-center"><strong>Example user</strong></p>
                <p class="text-center small">example@email.com</p>
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
                    <a href="#" class="btn btn-danger btn-block">Logout</a>
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
  import {getLoggedInUser} from './Api'

  export default {
    created () {
      this.fetchData()
    },
    components: {},
    watch: {},
    beforeRouteLeave (to, from, next) {},
    data () {
      return {
        user: {}
      }
    },
    mounted () {
      getDatatypes().then((dset) => {
        this.datatypes = dset
      }, (e) => {
        log(e)
      })
    },
    methods: {
      fetchData () {
        getLoggedInUser().then(function (user) {
          if (user) {

          } else {
            // Redirect to login page
            
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
