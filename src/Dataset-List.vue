<!--
Dataset list view
List all datasets from API
Search for a dataset (all keys)
Click dataset to open
Add new dataset
-->
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
      <search :placeholder="'search datasets'" :searchEvent="searchListener"></search>

      <messages :success="successMsg" :warn="warnMsg"></messages>

      <div class="rowsPerPage">
        Items per page:
        <select class="input input-md" v-model="rowsPerPage">
          <option v-bind:value="10">10</option>
          <option v-bind:value="25">25</option>
          <option v-bind:value="100">100</option>
          <option v-bind:value="100000">All</option>
        </select>
      </div>

      <div class="row">
        <div class="col-sm-12" id="wrapper">
          <grid
            :data="tableData"
            :columns="headers"
            :rowsPerPage="rowsPerPage"
            @clickRow="rowClick"
            :isLoading="loading"
            :filter-key="searchQuery">
          </grid>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import { getDatasets } from './Api'
  export default {
    data () {
      return {
        headers: [
          {
            title: 'published',
            path: 'published',
            render: function (val) {
              return val ? 'yes' : 'no'
            }
          }, {
            title: 'notation',
            path: '@id',
            addClass: 'hidden-xs'
          }, {
            title: 'title',
            path: 'title'
          }, {
            title: 'description',
            path: 'description',
            addClass: 'hidden-xs'
          }
        ],
        searchQuery: '',
        tableData: [],
        rowsPerPage: 10,
        loading: true
      }
    },
    created: function () {
      this.fetchData()
    },
    methods: {
      rowClick (ev) {
        let id = decodeURIComponent(ev['@id'])
        let cleanId = id.split('/').pop()
        this.$router.push({name: 'dataset', params: { id: cleanId }})
      },
      fetchData () {
        if (this.$route.query.deleted) {
          this.successMsg = 'Deleted Successfully'
        }

        this.error = this.post = null
        this.loading = true
        getDatasets({}).then((dataset) => {
          this.tableData = dataset
          this.loading = false
          this.loading = false
        }, (e) => {
          console.log('couldn\'t load datasets', e)
        })
      },
      searchListener: function (val) {
        this.searchQuery = val
      }
    }
  }
</script>

<style lang='scss' scoped>
  .rowsPerPage {
    float: right;
    padding: 10px 0;
  }
</style>
