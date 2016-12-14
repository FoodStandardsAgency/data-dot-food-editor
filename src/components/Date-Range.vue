<!--
Generic table view
Has support for searching on all keys
Also supports an empty text value
-->
<template>
  <div>
    <span class="daterange">contains {{dataset.element.length}} element(s) from {{firstDate | moment('MMMM Do YYYY') }} - {{lastDate | moment('MMMM Do YYYY') }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      dataset: Object // data
    },
    computed: {
      firstDate () {
        if (!this.dataset.element || !this.dataset.element.length) {
          return '∞'
        }
        let refDate = new Date()
        this.dataset.element.forEach(function (item) {
          if (new Date(item.fromDate) < refDate) {
            refDate = new Date(item.fromDate)
          }
        })
        return refDate
      },
      lastDate () {
        if (!this.dataset.element || !this.dataset.element.length) {
          return '∞'
        }
        let refDate = new Date('1970-1-1')
        this.dataset.element.forEach(function (item) { // Loop through to dates
          if (new Date(item.toDate) > refDate) { // If larger
            refDate = new Date(item.toDate) // Set as current largest
          }
        })
        return refDate // Return current largest
      }
    }
  }
</script>

<style scoped>
</style>
