<!--
Details view for a dataset
Allow editing of all attributes
-->
<template>
  <main>
    <div class="container">
      <ol class="breadcrumb">
        <li><router-link :to="{ name: 'datasets'}" class="active">Datasets</router-link></li>
        <li><router-link :to="{ name: 'dataset', params: { id: $route.params.id, eid: 'new' }}" class="active">{{$route.params.id}}</router-link></li>
        <li>elements</li>
      </ol>
    </div>
    <div id="details" v-if="dataset" :key="dataset.id">
      <div class="container">

        <h2>{{dataset.title}}</h2>

        <div class="form-group assets-group">
          <search :searchEvent="searchListener"></search>

          <messages :success="successMsg" :warn="warnMsg"></messages>

          <a @click="addElement" class="btn btn-success pull-right" aria-label="Add">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </a>

          <label for="assets">Elements</label>
          <div class="asset-table">
            <grid
              :data="elements"
              :columns="headers"
              @clickRow="openElement"
              :rowsPerPage="25"
              :filter-key="searchQuery"
              :custom-empty-table-text="'No elements'">
            </grid>
          </div>
          <date-range :arr="elements" :startProp="'temporalStart'" :endProp="'temporalEnd'"></date-range>
        </div>
      </div>
    </div>

    <div id="details" v-else>
      Sorry, we can't find that dataset
    </div>
  </main>
</template>

<script>
  /* global confirm */
  import 'bootstrap'
  import { getElements, getDataset } from './Api'

  export default {
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    beforeRouteLeave (to, from, next) {
      if (this.unsavedChanges) {
        if (confirm('Are you sure you want to cancel?')) {
          next()
        }
      } else {
        next()
      }
    },
    data () {
      return {
        elements: [],
        dataset: {
          element: [],
          keyword: ['']
        },
        headers: [
          {
            title: 'title',
            path: 'title'
          },
          {
            title: 'description',
            path: 'description'
          },
          {
            title: 'format',
            path: 'format'
          },
          {
            title: 'fromDate',
            path: 'temporalStart',
            addClass: 'hidden-xs'
          },
          {
            title: 'toDate',
            path: 'temporalEnd',
            addClass: 'hidden-xs'
          }
        ],
        searchQuery: ''
      }
    },
    methods: {
      searchListener: function (val) {
        this.searchQuery = val
      },
      addElement () {
        this.$router.push({name: 'element', params: { id: this.$route.params.id, eid: 'new' }})
      },
      openElement (el) {
        let id = decodeURIComponent(el['@id'])
        let cleanId = id.split('/').pop()
        this.$router.push({name: 'element', params: { id: this.$route.params.id, eid: cleanId }})
      },
      fetchData () {
        if (this.$route.query.deleted) {
          this.successMsg = 'Deleted Successfully'
        }

        getElements({id: this.$route.params.id}).then((elements) => {
          this.elements = elements
        })
        getDataset({id: this.$route.params.id}).then((dataset) => {
          this.dataset = dataset
        })
      }
    }
  }
</script>

<style lang='scss'>
</style>
