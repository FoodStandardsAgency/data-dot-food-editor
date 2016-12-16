<!--
Template Navigation
Replace with any site-specific navigation elements and styling
-->
<template>
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
        <a class="navbar-brand" href="/">
          <img src="/static/img/logo.png" alt="Food Standards Agency" height="50"/>
        </a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li><h2>Dataset catalogue</h2></li>

            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/todo">Reports</router-link></li>
            <li><router-link to="/todo">Admin</router-link></li>

          <!-- <li class="active"><a href="dataset-editor-list.html">Home <span class="sr-only">(current)</span></a></li>
          <li><a href="#">Reports</a></li>
          <li><a href="#">Admin</a></li> -->
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script></script>

<style></style>
