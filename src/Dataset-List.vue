<template>
  <main>
  <div class="container">
    <div class="pull-right" style="margin-top:15px;">
      <router-link to="/dataset/new" class="btn btn-success" title="add dataset">
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </router-link>
    </div>
    <h1>FSA open data catalogue</h1>
    <p class="text-muted">View and update Food Standards Agency open datasets and related assets.</p>
    <search :searchEvent="searchListener"></search>

    <div class="row">
      <div class="col-sm-12" id="wrapper">
        <grid
          :data="tableData"
          :columns="headers"
          :clickEv="rowClick"
          :filter-key="searchQuery">
        </grid>
      </div>
    </div>
  </div>
</main>
</template>

<script>
  import { getAll } from './api'

  export default {
    data () {
      return {
        hdres: [
          { title: 'published' },
          { title: 'title' },
          { title: 'description', class: 'some-special-class' }
          // { title: 'Column Names' },
          // { title: 'Here' }
        ],
        headers: [
          'published', 'notation', 'title', 'description'
        ],
        searchQuery: '',
        rows: [],
        dtHandle: null,
        tableData: [],
        rowClick: function (ev) {
          console.log('opening', ev.notation)
          this.$router.push({name: 'dataset', params: { id: ev.notation }})
        }
      }
    },
    watch: {
      // tableData (val, oldVal) {
      //   let vm = this
      //   // let rows = []
      //   // You should _probably_ check that this is changed data... but we'll skip that for this example.
      //   console.log(val)
      //   if (!val) {
      //     return
      //   }
      //   val.forEach(function (item) {
      //     // Fish out the specific column data for each item in your data set and push it to the appropriate place.
      //     // Basically we're just building a multi-dimensional array here. If the data is _already_ in the right format you could
      //     // skip this loop...
      //     let row = []
      //
      //     row.push(item.title)
      //     row.push(item.description)
      //     row.push(item.another_thing)
      //     row.push(item.final_thing)
      //
      //     vm.rows.push(row)
      //   })
      //
      //   // Here's the magic to keeping the DataTable in sync.
      //   // It must be cleared, new rows added, then redrawn!
      //   vm.dtHandle.clear()
      //   vm.dtHandle.rows.add(vm.rows)
      //   vm.dtHandle.draw()
      // }
    },
    ready: function () {
    },
    components: {},
    created: function () {
      console.log('Created event')
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.error = this.post = null
        this.loading = true
        getAll((err, dataset) => {
          this.loading = false
          if (err) {
            this.error = err.toString()
          } else {
            this.tableData = dataset
          }
        })
      },
      searchListener: function (val) {
        this.searchQuery = val
      }
    }
  }
</script>

<style lang='scss' scoped>
  .bootstrap-tagsinput {
    width:100%;
    /* Copied from input-lg in BS */
    height: 46px;
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
    border-radius: 6px;
  }

  .twitter-typeahead .tt-query,
  .twitter-typeahead .tt-hint {
      margin-bottom: 0;
  }

  .twitter-typeahead .tt-hint
  {
      display: none;
  }

  .tt-menu {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      display: none;
      float: left;
      min-width: 160px;
      padding: 5px 0;
      margin: 2px 0 0;
      list-style: none;
      font-size: 14px;
      background-color: #ffffff;
      border: 1px solid #cccccc;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
      background-clip: padding-box;
      cursor: pointer;
  }

  .tt-suggestion {
      display: block;
      padding: 3px 20px;
      clear: both;
      font-weight: normal;
      line-height: 1.428571429;
      color: #333333;
      white-space: nowrap;
  }

  .tt-suggestion:hover,
  .tt-suggestion:focus {
    color: #ffffff;
    text-decoration: none;
    outline: 0;
    background-color: #428bca;
  }
</style>
