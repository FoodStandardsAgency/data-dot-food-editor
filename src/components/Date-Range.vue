<!--
Generic table view
Has support for searching on all keys
Also supports an empty text value
-->
<template>
  <div>
    <span class="daterange">contains {{arr.length}} element(s) from {{firstDate | moment('MMMM Do YYYY') }} - {{lastDate | moment('MMMM Do YYYY') }}</span>
  </div>
</template>

<script>
  import moment from 'moment'
  let dateFormat = 'DD/MM/YYYY'
  export default {
    props: {
      arr: Array, // data
      startProp: String,
      endProp: String
    },
    computed: {
      firstDate () {
        if (!this.arr || !this.arr.length) {
          return '∞'
        }
        let refDate = new Date()
        let changed = false
        this.arr.forEach((item) => {
          let itemDate = moment(item[this.startProp], dateFormat)
          if (itemDate < refDate) {
            refDate = itemDate
            changed = true
          }
        })
        return changed ? refDate : '∞'
      },
      lastDate () {
        if (!this.arr || !this.arr.length) {
          return '∞'
        }
        let refDate = new Date('1970-1-1')
        let changed = false
        this.arr.forEach((item) => { // Loop through to dates
          let itemDate = moment(item[this.endProp], dateFormat)
          if (itemDate > refDate) {
            refDate = itemDate // Set as current largest
            changed = true
          }
        })
        return changed ? refDate : '∞'
      }
    }
  }
</script>

<style scoped>
</style>
