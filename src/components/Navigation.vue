<!--
Template Navigation
Replace with any site-specific navigation elements and styling
-->
<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link to="/" class="navbar-brand">
            <img src="../assets/logo.png" alt="Food Standards Agency" height="50"/>
          </router-link>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><h2>Dataset catalog</h2></li>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/reports">Reports</router-link></li>
            <li><router-link to="/publish">Publication</router-link></li>
            <li><router-link to="/help">Help</router-link></li>
          </ul>
          <navigationUser></navigationUser>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
  </div>
</template>

<script>
  import navigationUser from './Navigation-User'
  export default {
    data: function () {
      return {

      }
    },
    components: {
      navigationUser
    }
  }
</script>

<style lang='scss' scoped>
  .navbar-nav li {
    font-weight: bold;
  }
</style>
