<!--
Details view for a dataset
Allow editing of all attributes
-->
<template>
  <main>
    <div id="details" v-if="dataset" :key="dataset.id">
      <div class="container">

        <h2>{{dataset.title}}</h2>

        <div class="form-group assets-group">
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
          <date-range :dataset="dataset"></date-range>
        </div>
      </div>
      <modal :element="selectedElement" :delFunction="deleteElement"></modal>

    </div>

    <div id="details" v-else>
      Sorry, we can't find that dataset
    </div>
  </main>
</template>

<script>
  /* global confirm */
  import { getElements, getPost } from './api'
  import 'bootstrap'
  import Element from 'components/Element'
  import $ from 'jquery'
  import daterange from 'components/Date-Range'

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
        loading: false,
        dataset: {
          element: [],
          keyword: ['']
        },
        error: null,
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
      deleteElement (el) {
        this.dataset.element.splice(this.dataset.element.indexOf(el), 1)
      },
      save () {
        console.error('TODO')
        this.unsavedChanges = false
        this.$router.push({path: '/'})
      },
      remove () {
        console.error('TODO')
        if (confirm('Are you sure you want to delete this Dataset?')) {
          this.unsavedChanges = false
          this.$router.push({path: '/'})
        }
      },
      addElement () {
        let newElement = require('./blank-element')
        this.dataset.element.push(newElement)
        this.openElement(newElement) // Open editor
      },
      openElement (el) {
        this.selectedElement = el
        $('#elementModal').modal('show')
      },
      fetchData () {
        let cleanedId = decodeURIComponent(this.$route.params.id)
        this.error = null
        this.loading = true
        getElements(this, cleanedId, (err, elements) => {
          this.loading = false
          if (err) {
            this.error = err.toString()
          } else {
            this.elements = elements
          }
        })
        getPost(this, cleanedId, (err, dataset) => {
          this.loading = false
          if (err) {
            this.error = err.toString()
          } else {
            this.dataset = dataset
          }
        })
      }
    },
    components: {
      modal: Element,
      'date-range': daterange
    }
  }
</script>

<style lang='scss'>
</style>
