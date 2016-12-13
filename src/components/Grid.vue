<!--
Generic table view
Has support for searching on all keys
Also supports an empty text value
-->
<template>
  <table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th v-for="key in columns"
          @click="sortBy(key)"
          :class="{ act: sortKey == key }">
          {{ key | capitalize }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredData" @click="rowEvent(entry)" :class="{ clickable: !!clickEv }">
        <td v-for="key in columns">
          {{entry[key]}}
        </td>
      </tr>
      <tr v-if="!data || !data.length">
        <td :colspan="columns.length" class="noData">
          {{emptyTableText}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: {
      data: Array, // Unfiltered table data
      columns: Array, // List of columns ['title', 'description']
      filterKey: String, // String to filter on ''
      clickEv: Function, // Callback event for row clicking events
      customEmptyTableText: '' // optional text override for empty table
    },
    data: function () {
      var sortOrders = {}
      this.columns.forEach(function (key) {
        sortOrders[key] = 1
      })
      return {
        sortKey: '',
        sortOrders: sortOrders
      }
    },
    computed: {
      emptyTableText: function () {
        if (this.customEmptyTableText) {
          return this.customEmptyTableText
        } else {
          return 'No data to show'
        }
      },
      filteredData: function () {
        var sortKey = this.sortKey
        var filterKey = this.filterKey && this.filterKey.toLowerCase()
        var order = this.sortOrders[sortKey] || 1
        var data = this.data
        if (filterKey) {
          data = data.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
          })
        }
        if (sortKey) {
          data = data.slice().sort(function (a, b) {
            a = a[sortKey]
            b = b[sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        return data
      }
    },
    filters: {
      capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    },
    methods: {
      sortBy: function (key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      },
      rowEvent: function (entry) {
        if (this.clickEv) {
          this.clickEv(entry)
        }
      }
    }
  }
</script>

<style scoped>
  .noData{
    text-align: center;
  }
  .clickable {
    cursor: pointer;
  }

  th {
    background-color: #42b983;
    color: rgba(255,255,255,0.66);
    cursor: pointer;
  }

  th, td {
    min-width: 120px;
    padding: 10px 20px;
  }

  th.act {
    color: #fff;
  }

  th.act .arrow {
    opacity: 1;
  }

  .arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
  }

  .arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
  }

  .arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
  }
</style>
