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
            <a @click="remove" class="btn btn-danger">Delete</a>
            <router-link to="/" class="btn btn-danger">Cancel</router-link>
            <a @click="save" :disabled="!unsavedChanges ? true : false" class="btn btn-success">Save</a>
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
            <label for="exampleInputPassword1">Publisher</label>
            <input type="text" class="form-control input-lg" v-model="dataset.publisher"/>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Licence</label>
            <input type="text" class="form-control input-lg" v-model="dataset.licence"/>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Frequency</label>
            <input type="text" class="form-control input-lg" v-model="dataset.frequency"/>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Landing Page</label>
            <input type="text" class="form-control input-lg" v-model="dataset.landingPage"/>
          </div>

          <div class="form-group">
            <label for="exampleInputFile">Directorate</label>
            <select class="form-control input-lg" v-model="dataset.directorate">
              <option v-for="directorate in directorates" v-bind:value="directorate">
                {{directorate.label}}
              </option>
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
            <label for="keyword">Keywords</label>
            <tags-input
              :tags="dataset.keyword"
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
          <p>
            <label for="assets">Elements</label>
          </p>
          <div>
            <template v-if="$route.params.id !== 'new'">
              <date-range :arr="element" :startProp="'temporalStart'" :endProp="'temporalEnd'"></date-range>
              <router-link :to="{ name: 'elements', params: { id: $route.params.id }}" class="btn btn-danger">Edit elements</router-link>
            </template>
            <template v-else>
              <p>Please save Dataset before adding elements</p>
            </template>
          </div>
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
  import { getDataset, getDirectorates, getElement } from './api'
  import tagsinput from 'vue-tagsinput'

  export default {
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData',
      'dataset': {
        deep: true,
        handler: function (val, oldVal) {
          console.log('Modified', val, oldVal)
          if (val.notation === oldVal.notation && !this.beforeLoad) {
            this.unsavedChanges = true
          }
          this.beforeLoad = false
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
            key: 'fromDate'
          },
          {
            title: 'toDate',
            key: 'toDate'
          }
        ],
        searchQuery: '',
        directorates: [],
        element: []
      }
    },
    methods: {
      handleTagsChange (index, text) {
        if (!this.dataset.keyword) {
          this.dataset.keyword = []
        }
        if (text) {
          this.dataset.keyword.splice(index, 0, text)
        } else {
          this.dataset.keyword.splice(index, 1)
        }
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
      fetchData () {
        if (this.$route.params.id === 'new') {
          this.dataset = {} // Empty dataset object
        } else {
          getDataset({id: this.$route.params.id}, (err, dataset) => {
            if (!err) {
              this.dataset = dataset
            }
          })

          getElement({id: this.$route.params.id}, (err, ele) => {
            if (!err) {
              this.element = ele
            }
          })
        }
        getDirectorates((err, dset) => {
          if (!err) {
            this.directorates = dset
          }
        })
      }
    },
    components: {
      'tags-input': tagsinput
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
