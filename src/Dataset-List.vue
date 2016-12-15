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
        headers: [
          {
            title: 'published',
            key: 'published',
            render: function (val) {
              return val ? 'yes' : 'no'
            }
          }, {
            title: 'notation',
            key: '@id'
          }, {
            title: 'title',
            key: 'title'
          }, {
            title: 'description',
            key: 'description'
          }
        ],
        searchQuery: '',
        rows: [],
        dtHandle: null,
        tableData: [],
        rowClick: function (ev) {
          let id = decodeURIComponent(ev['@id'])
          let cleanId = id.split('/').pop()
          this.$router.push({name: 'dataset', params: { id: cleanId }})
        }
      }
    },
    created: function () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.error = this.post = null
        this.loading = true
        getAll(this, (err, dataset) => {
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
</style>
