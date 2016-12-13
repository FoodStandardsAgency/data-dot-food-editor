<!--
Details view for a dataset
Allow editing of all attributes
-->
<template>
  <main>
    <div id="details" v-if="dataset" :key="dataset.id">
      <div class="container">
        <form>
          <div class="pull-right">
            <router-link to="/" class="btn btn-danger">Cancel</router-link>
            <a @click="save" class="btn btn-success">Save</a>
          </div>
          <div class="form-group" style="clear:right;">
            <label for="title">Title</label>
            <input type="text" class="form-control input-lg" id="text" placeholder="" v-model="dataset.title">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Description</label>
            <textarea class="form-control" rows="4" v-model="dataset.description"></textarea>
          </div>
          <div class="form-group">
            <label for="exampleInputFile">Directorate</label>
            <select class="form-control input-lg">
              <option>Chief Executive & Directors</option>
              <option>Chief Operating Officer Group</option>
              <option>Finance & Performance</option>
              <option>Northern Ireland & Organisational Development</option>
              <option>Openness, Digital & Data</option>
              <option>Policy & Science</option>
              <option>Regulatory & Legal Strategy</option>
              <option>Wales & Local Delivery</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleInputFile">Domain</label>
            <select class="form-control input-lg">
              <option>Safety</option>
              <option>Accountability</option>
              <option>Health</option>
              <option>Alerts</option>
            </select>
          </div>
        </form>
        <form class="form-inline">
          <div class="form-group form-group-lg">
            <label>Publish</label>
            <label class="radio">
              <label class="control-label col-sm-2" for="inlineRadio1">Published</label>
              <input type="radio" name="inlineRadioOptions" id="inlineRadio1" class="input-lg" v-model="dataset.published" v-bind:value="true">
            </label>
            <label class="radio">
              <label class="control-label col-sm-2" for="inlineRadio2">Draft</label>
              <input type="radio" name="inlineRadioOptions" id="inlineRadio2" class="input-lg" v-model="dataset.published" v-bind:value="false">
            </label>
          </div>
        </form>
        <form>
          <div class="form-group">
            <label for="tags">Tags</label>
            <tags-input
              :tags="dataset.tags"
              @tags-change="handleTagsChange"></tags-input>
          </div>
          <div class="form-group">
            <label for="owner">Owner</label>
            <textarea class="form-control input-lg" rows="3" v-model="dataset.owner"></textarea>
          </div>
          <div class="form-group">
            <label for="title">Notes</label>
            <textarea class="form-control input-lg" rows="2" v-model="dataset.notes"></textarea>
          </div>
        </form>
        <div class="form-group assets-group">
          <a @click="addElement" class="btn btn-success pull-right" aria-label="Add">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </a>

          <label for="assets">Elements</label>
          <div class="asset-table" style="clear:right; max-height:250px;overflow:scroll;border: 1px solid #ddd;">
            <grid
              :data="dataset.elements"
              :columns="headers"
              :click-ev="openElement"
              :filter-key="searchQuery"
              :custom-empty-table-text="'No elements'">
            </grid>
          </div>
          <span class="daterange">{{firstDate | moment('MMMM Do YYYY') }} - {{lastDate | moment('MMMM Do YYYY') }}</span>
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
  import { getPost } from './api'
  import 'bootstrap'
  import Element from 'components/Element'
  import $ from 'jquery'
  import tagsinput from 'vue-tagsinput'

  // import Bloodhound from 'bloodhound'
// <!-- ''
// <!-- 'js/typeahead.js'
// <!-- Include all compiled plugins (below), or include individual files as needed -->
// <!--
  //   var tags = [{
  //     label: 'registered'
  //   }, {
  //     label: 'gifts'
  //   }, {
  //     label: 'hospitality'
  //   }, {
  //     label: 'alerts'
  //   }, {
  //     label: 'allergy'
  //   }, {
  //     label: 'alerts'
  //   }, {
  //     label: 'audits'
  //   }, {
  //     label: 'approved'
  //   }, {
  //     label: 'meat'
  //   }, {
  //     label: 'establishments'
  //   }, {
  //     label: 'Radiological'
  //   }, {
  //     label: 'Monitoring'
  //   }, {
  //     label: 'local'
  //   }, {
  //     label: 'authority'
  //   }, {
  //     label: 'food'
  //   }, {
  //     label: 'law'
  //   }, {
  //     label: 'enforcement'
  //   }, {
  //     label: 'hygiene'
  //   }, {
  //     label: 'transactions'
  //   }, {
  //     label: 'expenditure'
  //   }, {
  //     label: 'evidence'
  //   }, {
  //     label: 'science'
  //   }, {
  //     label: 'scheme'
  //   }, {
  //     label: 'food'
  //   }, {
  //     label: 'rating'
  //   }, {
  //     label: 'gpc'
  //   }]
    // var engine = new Bloodhound({
    //   datumTokenizer: Bloodhound.tokenizers.obj.whitespace('label'),
    //   queryTokenizer: Bloodhound.tokenizers.whitespace,
    //   local: tags,
    //   identify: function (obj) { return obj.label }
    // })
    // engine.initialize()

  export default {
    created () {
      this.fetchData()
    },
    mounted () {
      this.initComponents()
    },
    watch: {
      '$route': 'fetchData',
      'dataset': {
        deep: true,
        handler: function (val, oldVal) {
          if (val.notation === oldVal.notation) {
            console.log(val, oldVal)
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
        loading: false,
        dataset: {
          elements: [],
          tags: ['one']
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
            key: 'fromDate'
          },
          {
            title: 'toDate',
            key: 'toDate'
          }
        ],
        searchQuery: '',
        selectedElement: {}
      }
    },
    methods: {
      handleTagsChange (index, text) {
        if (!this.dataset.tags) {
          this.dataset.tags = []
        }
        if (text) {
          this.dataset.tags.splice(index, 0, text)
        } else {
          this.dataset.tags.splice(index, 1)
        }
      },
      deleteElement (el) {
        this.dataset.elements.splice(this.dataset.elements.indexOf(el), 1)
      },
      save () {
        console.error('TODO')
        this.$router.push({path: '/'})
      },
      addElement () {
        let newElement = {
          title: 'Example title',
          description: 'Example description',
          fromDate: '',
          toDate: ''
        }
        this.dataset.elements.push(newElement)
        this.openElement(newElement) // Open editor
      },
      openElement (el) {
        console.log(el)
        this.selectedElement = el
        $('#elementModal').modal('show')
      },
      fetchData () {
        if (this.$route.params.id === 'new') {
          this.loading = false
          this.dataset = {} // Empty dataset object
        } else {
          let cleanedId = decodeURIComponent(this.$route.params.id)
          this.error = null
          this.loading = true
          getPost(cleanedId, (err, dataset) => {
            this.loading = false
            if (err) {
              this.error = err.toString()
            } else {
              this.dataset = dataset
            }
          })
        }
      },
      initComponents () {
        $('#tags').on('beforeItemAdd', function (event) {
          event.item = event.item.toLowerCase()
          if (event.item === 'something') {
            if (!confirm('Are you sure you want to create a new tag?')) {
              event.cancel = true
            }
          }
          // event.item: contains the item
          // event.cancel: set to true to prevent the item getting added
        })
      }
    },
    components: {
      modal: Element,
      'tags-input': tagsinput
    },
    computed: {
      firstDate () {
        if (!this.dataset.elements || !this.dataset.elements.length) {
          return '∞'
        }
        let refDate = new Date()
        this.dataset.elements.forEach(function (item) {
          // console.log(item.fromDate, firstDate, item.fromDate > firstDate)
          if (new Date(item.fromDate) < refDate) {
            refDate = new Date(item.fromDate)
          }
        })
        return refDate
      },
      lastDate () {
        if (!this.dataset.elements || !this.dataset.elements.length) {
          return '∞'
        }
        let refDate = new Date('1970-1-1')
        // console.log(item.toDate, lastDate, item.toDate < lastDate)
        this.dataset.elements.forEach(function (item) {
          if (new Date(item.toDate) > refDate) {
            refDate = new Date(item.toDate)
          }
        })
        return refDate
      }
    }
  }
</script>

<style lang='scss'>
  .tags-input .tag, .tags-input .gap  {
    font-size: 18px!important;
    line-height: 1.33333!important;
  }

  .tags-input{
    border-radius: 6px;
  }

  .tags-input input.input{
    font-family: inherit!important;
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
