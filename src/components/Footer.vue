<!--
Template footer
-->
<template>
  <footer>
    <div class="container">
      <img src="../assets/epimorphics.png" class="epimorphics-logo" alt="Epimorphics">
      <div>
        Data catalog editor by Epimorphics Ltd.<br/>
        For help or suggestions, please
        <a href="mailto:fsa-services-support@epimorphics.com?subject=data-dot-food-editor">
          contact support
        </a>
      </div>
      <div class="version">{{version}}</div>
    </div>
  </footer>
</template>

<script>
import { version } from '../../package.json'

  export default {
    data: function () {
      return {
        version: "v" + version
      }
    }
  }
</script>

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
