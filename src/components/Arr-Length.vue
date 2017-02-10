<!--
Generic table view
Has support for searching on all keys
Also supports an empty text value
-->
<template>
  <div>
    <span class="daterange">Dataset contains {{arr.length}} element(s)</span>
  </div>
</template>

<script>
  export default {
    props: {
      arr: Array // data
    }
  }
</script>

<style scoped>
</style>
