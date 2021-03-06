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
        <a @click="addElement" class="btn btn-success pull-right" title="add element" aria-label="Add">
          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </a>

        <h2>{{dataset.title | strLimit(30)}} / elements</h2>
        <p>Elements are versions of a dataset split, for example by area or date.</p>

        <div class="form-group assets-group">
          <messages/>

          <search :placeholder="'search elements'" :searchEvent="searchListener"></search>

          <div class="asset-table">
            <grid
              :data="elements"
              :columns="headers"
              @clickRow="openElement"
              :rowsPerPage="rowsPerPage"
              :filter-key="searchQuery"
              :isLoading="loading"
              :custom-empty-table-text="'No elements'">
            </grid>
          </div>

          <div class="rowsPerPage">
            Items per page:
            <select class="input input-md" v-model="rowsPerPage">
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="100">100</option>
              <option :value="100000">All</option>
            </select>
          </div>

          <date-range :arr="elements" :startProp="'startDate'" :endProp="'endDate'"></date-range>
        </div>
      </div>
    </div>

    <div id="details" v-else>
      Sorry, we can't find that dataset
    </div>
  </main>
</template>

<script>
  import { getElements, getDataset } from './Api'
  import log from './log'
  import strLimit from './filters/Limit'
  import bus from './components/Bus'

  export default {
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    data () {
      return {
        rowsPerPage: 100,
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
            title: 'no. distributions',
            path: 'distribution',
            render: function (val) {
              return val instanceof Array ? val.length : 1
            }
          },
          {
            title: 'startDate',
            path: 'startDate',
            addClass: 'hidden-xs'
          },
          {
            title: 'endDate',
            path: 'endDate',
            addClass: 'hidden-xs'
          }
        ],
        searchQuery: '',
        loading: true
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
          bus.$emit('message', {
            str: 'Deleted Successfully',
            success: true
          })
        }
        this.loading = true
        getElements({id: this.$route.params.id}).then((elements) => {
          this.elements = elements
          this.loading = false
        }, (e) => {
          log(e)
        })
        getDataset({id: this.$route.params.id}).then((dataset) => {
          this.dataset = dataset
        }, (e) => {
          log(e)
        })
      }
    },
    filters: {
      strLimit
    }
  }
</script>

<style lang='scss'>
  .rowsPerPage {
    float: right;
    padding-bottom: 10px;
  }
</style>
