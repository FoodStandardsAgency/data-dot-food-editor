<!--
Template footer
-->
<template>
  <footer>
    <div class="container">
      <img src="../assets/epimorphics.png" class="epimorphics-logo" alt="Epimorphics">
      <div>
        Data catalog editor by Epimorphics Ltd, linked-data technology <br/>
        For help and support, please contact <a href="mailto:support@epimorphics.com">Support</a> <br/>
        &copy; {{ new Date().getFullYear() }}
      </div>
    </div>
  </footer>
</template>

<script></script>

<style scoped>
  footer {
    padding: 10px 0;
    text-align: center;
  }
  .epimorphics-logo {
    width: 50px;
    margin: 0 10px;
  }
</style>
