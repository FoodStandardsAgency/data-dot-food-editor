<!--
Details view for a dataset
Allow editing of all attributes
-->
<template>
  <main>
    <div class="container">
      <ol class="breadcrumb">
        <li><a href="/">Datasets</a></li>
        <li><router-link :to="{ name: 'dataset', params: { id: $route.params.id }}" class="active">{{$route.params.id}}</router-link></li>
        <li>Elements</li>
      </ol>
    </div>
    <div id="details" v-if="dataset" :key="dataset.id">
      <div class="container">

        <h2>{{dataset.title}}</h2>

        <div class="form-group assets-group">
          <search :searchEvent="searchListener"></search>

          <a @click="addElement" class="btn btn-success pull-right" aria-label="Add">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </a>

          <label for="assets">Elements</label>
          <div class="asset-table">
            <grid
              :data="elements"
              :columns="headers"
              :click-ev="openElement"
              :filter-key="searchQuery"
              :custom-empty-table-text="'No elements'">
            </grid>
          </div>
          <date-range :arr="elements" :startProp="'temporalStart'" :endProp="'temporalEnd'"></date-range>
        </div>
      </div>
      <modal :element="selectedElement" :closeFunction="closeElement"></modal>

    </div>

    <div id="details" v-else>
      Sorry, we can't find that dataset
    </div>
  </main>
</template>

<script>
  /* global confirm */
  import 'bootstrap'
  import Element from 'components/Element'
  import $ from 'jquery'
  import { getElement, getDataset } from './api'

  export default {
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData',
      'dataset': {
        deep: true,
        handler: function (val, oldVal) {
          if (val.notation === oldVal.notation) {
            this.unsavedChanges = true
          }
        }
      }
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
        unsavedChanges: false,
        headers: [
          {
            title: 'title',
            key: 'title'
          },
          {
            title: 'description',
            key: 'description'
          },
          {
            title: 'fromDate',
            key: 'temporalStart'
          },
          {
            title: 'toDate',
            key: 'temporalEnd'
          }
        ],
        searchQuery: '',
        selectedElement: {}
      }
    },
    methods: {
      searchListener: function (val) {
        this.searchQuery = val
      },
      closeElement (el) {
        // Update the full list of elements - may have changed.
        this.fetchData()
      },
      addElement () {
        let newElement = require('./blank-element')
        this.element.push(newElement)
        this.openElement(newElement) // Open editor
      },
      openElement (el) {
        this.selectedElement = JSON.parse(JSON.stringify(el))
        $('#elementModal').modal('show')
      },
      fetchData () {
        getElement({id: this.$route.params.id}, (err, elements) => {
          if (err) {} else {
            this.elements = elements
          }
        })
        getDataset({id: this.$route.params.id}, (err, dataset) => {
          if (err) {} else {
            this.dataset = dataset
          }
        })
      }
    },
    components: {
      modal: Element
    }
  }
</script>

<style lang='scss'>
</style>
