<!--
Details view for a dataset
Allow editing of all attributes
-->
<template>
  <main>
    <div class="container">
      <ol class="breadcrumb">
        <li><a href="/">Datasets</a></li>
        <li>{{$route.params.id}}</li>
      </ol>
    </div>
    <div id="details" v-if="dataset" :key="dataset.id">
      <div class="container">
        <form>

          <div class="pull-right">
            <a v-if="$route.params.id !== 'new'" @click="remove" class="btn btn-danger">Delete</a>
            <router-link to="/" role="button" class="btn btn-default">Cancel</router-link>
            <a @click="save" :disabled="!unsavedChanges ? true : false" class="btn btn-success">Save</a>
          </div>

          <!-- Title -->
          <div class="form-group" style="clear:right;">
            <label for="title">Title</label>
            <input type="text" class="form-control input-lg" autocomplete="off" id="title" name="title" :class="{'input': true, 'is-danger': errors.has('title') }" v-validate data-vv-rules="required|min:8" placeholder="" v-model="dataset.title">
            <span class="validation-errors" v-show="errors.has('title')">{{ errors.first('title') }}</span>
          </div>
          <!-- description -->
          <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" rows="6" name="description" id="description" v-validate data-vv-rules="required|min:20" v-model="dataset.description"></textarea>
            <span class="validation-errors" v-show="errors.has('description')">{{ errors.first('description') }}</span>
          </div>
          <!-- Publisher -->
          <div class="form-group">
            <label for="publisher">Publisher</label>
            <input type="text" class="form-control input-lg" name="publisher" id="publisher" v-validate data-vv-rules="required" v-model="dataset.publisher"/>
            <span class="validation-errors" v-show="errors.has('publisher')">{{ errors.first('publisher') }}</span>
          </div>
          <!-- Licence -->
          <div class="form-group">
            <label for="licence">Licence</label>
            <input type="text" class="form-control input-lg" id="licence" name="licence" v-validate data-vv-rules="url" v-model="dataset.licence"/>
            <span class="validation-errors" v-show="errors.has('licence')">{{ errors.first('licence') }}</span>
          </div>
          <!-- frequency -->
          <div class="form-group">
            <label for="frequency">Frequency</label>
            <input type="text" class="form-control input-lg" id="frequency" name="frequency" v-model="dataset.frequency"/>
            <span class="iso8601">{{dataset.frequency | iso8601}}</span>
          </div>
          <!-- Landing Page -->
          <div class="form-group">
            <label for="landing">Landing Page</label>
            <input type="text" class="form-control input-lg" id="landing" name="landing" v-validate data-vv-rules="url" v-model="dataset.landingPage"/>
            <span class="validation-errors" v-show="errors.has('landing')">{{ errors.first('landing') }}</span>
          </div>
          <!-- Directorate -->
          <div class="form-group">
            <label for="directorate">Directorate</label>
            <select class="form-control input-lg" id="directorate" name="directorate" v-model="dataset.directorate">
              <option v-for="directorate in directorates" v-bind:value="directorate">
                {{directorate.label}}
              </option>
            </select>
          </div>
        </form>
        <!-- Publish -->
        <form class="form-inline">
          <div class="form-group form-group-lg">
            <label>Publish</label>
            <label class="radio">
              <label class="control-label col-sm-2" for="published">Published</label>
              <input type="radio" name="published" id="publish" class="input-lg" v-model="dataset.published" v-bind:value="true">
            </label>
            <label class="radio">
              <label class="control-label col-sm-2" for="published">Draft</label>
              <input type="radio" name="published" id="draft" class="input-lg" v-model="dataset.published" v-bind:value="false">
            </label>
          </div>
        </form>

        <form>
          <!-- Keywords -->
          <div class="form-group">
            <label for="keyword">Keywords</label>
            <tags-input
              :tags="dataset.keyword"
              @tags-change="handleTagsChange"></tags-input>
          </div>
          <!-- Owner -->
          <div class="form-group">
            <label for="owner">Owner</label>
            <textarea class="form-control input-lg" rows="3" v-model="dataset.owner"></textarea>
          </div>
          <!-- Notes -->
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
  /* global confirm alert */
  import { getDataset, getDirectorates, getElement, saveDataset, removeDataset } from './Api'
  import tagsinput from 'vue-tagsinput'
  import blankDataset from './blank-dataset'
  import iso8601 from './iso8601'

  export default {
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData',
      'dataset': {
        deep: true,
        handler: function (val, oldVal) {
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
        beforeLoad: true,
        dataset: JSON.parse(JSON.stringify(blankDataset)),
        unsavedChanges: false,
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
            title: 'fromDate',
            path: 'fromDate'
          },
          {
            title: 'toDate',
            path: 'toDate'
          }
        ],
        searchQuery: '',
        directorates: [],
        element: []
      }
    },
    filters: {
      iso8601 (d) {
        if (d.startsWith('R/')) {
          d = d.substring(2, 10000)
        } else {
          return 'Needs to begin with "R/"'
        }
        let parsed = iso8601.Period.parseToString(d)
        return 'repeating every ' + parsed
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
        saveDataset({id: this.$route.params.id}, this.dataset, (err, resp) => {
          if (!err) {
            this.unsavedChanges = false
            this.$router.push({path: '/'})
          }
        })
      },
      remove () {
        if (confirm('Are you sure you want to delete this Dataset?')) {
          removeDataset({id: this.$route.params.id}, (err, resp) => {
            if (!err) {
              this.unsavedChanges = false
              this.$router.push({path: '/'})
            }
          })
        }
      },
      fetchData () {
        if (this.$route.params.id !== 'new') {
          getDataset({id: this.$route.params.id}).then((dataset) => {
            this.dataset = dataset
          }, (e) => {
            alert('sorry, something went wrong')
          })

          getElement({id: this.$route.params.id}).then((ele) => {
            this.element = ele
          }, (e) => {
            alert('sorry, something went wrong')
          })
        }
        getDirectorates().then((dset) => {
          this.directorates = dset
        }, (e) => {
          alert('sorry, something went wrong')
        })
      }
    },
    components: {
      'tags-input': tagsinput
    }
  }
</script>

<style lang='scss'>
  @import './assets/validation-errors';

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
