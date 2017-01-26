<!--
Details view for a dataset
Allow editing of all attributes
-->
<template>
  <main>
    <div class="container">
      <ol class="breadcrumb">
        <li><router-link :to="{ name: 'datasets'}" class="active">Datasets</router-link></li>
        <li>{{$route.params.id}}</li>
      </ol>
    </div>
    <div id="details" v-if="dataset" :key="dataset.id">
      <div class="container">
        <form v-on:submit.prevent="onSubmit">
          <div class="pull-right buttons">
            <a v-if="$route.params.id !== 'new'" @click="remove" class="btn btn-danger">Delete</a>
            <router-link to="/" role="button" class="btn btn-default">Cancel</router-link>
            <a @click="save" :disabled="!unsavedChanges ? true : false" class="btn btn-success">Save</a>
          </div>
          <!-- Messages -->
          <messages :success="successMsg" :warn="warnMsg"></messages>
          <!-- Title -->
          <div class="form-group" style="clear:right;">
            <label for="title">Title</label>
            <input type="text" class="form-control input-lg" autocomplete="off" id="title" name="title" :class="{'input': true, 'is-danger': errors.has('title') }" v-validate data-vv-rules="required|min:8" placeholder="" v-model="dataset.title">
            <!-- <span id="helpBlock2" class="help-block">A block of help text that breaks onto a new line and may extend beyond one line.</span> -->
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
            <input type="text" class="form-control input-lg" id="license" name="license" v-validate data-vv-rules="url" v-model="dataset.license"/>
            <span class="validation-errors" v-show="errors.has('license')">{{ errors.first('license') }}</span>
          </div>
          <!-- frequency -->
          <div class="form-group">
            <label for="frequency">Frequency</label>
            <input type="text" class="form-control input-lg" id="frequency" name="frequency" v-model="dataset.accrualPeriodicity"/>
            <span class="iso8601">{{dataset.accrualPeriodicity | iso8601}}</span>
          </div>
          <!-- Landing Page -->
          <div class="form-group">
            <label for="landing">Landing Page</label>
            <input type="text" class="form-control input-lg" id="landingPage" name="landingPage" v-validate data-vv-rules="url" v-model="dataset.landingPage"/>
            <span class="validation-errors" v-show="errors.has('landingPage')">{{ errors.first('landingPage') }}</span>
          </div>
          <!-- Directorate -->
          <div class="form-group">
            <label for="directorate">Directorate</label>
            <select class="form-control input-lg" id="directorate" name="directorate" v-model="dataset.directorate">
              <option v-for="directorateItem in directorates" v-bind:value="directorateItem['@id']">
                {{directorateItem.prefLabel}}
              </option>
            </select>
          </div>
        </form>
        <!-- Publish -->
        <form v-on:submit.prevent="onSubmit" class="form-inline">
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

        <form v-on:submit.prevent="">
          <!-- Keywords -->
          <div class="form-group">
            <label for="keyword">Keywords</label>
            <tags-input
              :tags="dataset.keyword"
              @tags-change="handleTagsChange"></tags-input>
          </div>
          <!-- Owner -->
          <div class="form-group">
            <label for="ownerName">Owner name</label>
            <textarea id="ownerName" name="ownerName" class="form-control input-lg" rows="3" v-model="dataset.ownerName"></textarea>
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
              <arr-length :arr="element"></arr-length>
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
  import {getDataset, getDirectorates, getElements, saveDataset, removeDataset, getKeywordsText, saveKeyword} from './Api'
  import tagsinput from 'vue-tagsinput'
  import blankDataset from './blank-dataset'
  import blankKeyword from './blank-keyword'
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
        element: [],
        allowedKeywords: [],
        warnMsg: '',
        successMsg: ''
      }
    },
    filters: {
      iso8601 (d) {
        if (d) {
          if (d.startsWith('R/')) {
            d = d.substring(2, 10000)
          } else {
            return 'Needs to begin with "R/"'
          }
          let parsed = iso8601.Period.parseToString(d)
          return 'repeating every ' + parsed
        }
      }
    },
    methods: {
      handleTagsChange (index, text) {
        console.log(index, text)
        if (!this.dataset.keyword) {
          this.dataset.keyword = []
        }
        if (text) {
          text = text.toLowerCase()
          if (this.dataset.keyword.indexOf(text) !== -1) {
            return // Already exists in tags
          }
          // Check that the keyword is one of the allowed keywords
          // Prompt before adding text
          if (this.allowedKeywords.indexOf(text) === -1) {
            if (confirm('Are you sure you want to add a new global tag?')) {
              // Add tag to globally allowed tags

              let keywordTemplate = JSON.parse(JSON.stringify(blankKeyword))

              keywordTemplate['@id'] = text
              keywordTemplate['prefLabel'] = text // [0].toUpperCase() + text.substring(1) // Init caps

              saveKeyword({}, keywordTemplate).then((resp) => {
                this.getKeywords() // Update locally stored keywords object
                this.dataset.keyword.splice(index, 0, text)
              }, (e) => {
                alert('sorry, something went wrong')
              })
            } else {
              this.dataset.keyword.splice(index, 1)
            }
          } else {
            this.dataset.keyword.splice(index, 0, text)
          }
        } else { // Delete tag
          this.dataset.keyword.splice(index, 1)
        }
      },
      save () {
        saveDataset({id: this.$route.params.id}, this.dataset).then((resp) => {
          this.unsavedChanges = false
          this.successMsg = 'Updated Successfully'

          // TODO slightly hacky.
          if (resp.headers.map.location && resp.headers.map.location[0]) {
            let id = resp.headers.map.location[0].split('/').pop()
            this.$router.push({name: 'dataset', params: {id: id}, query: {saved: true}})
          }
        }, (err) => {
          this.warnMsg = 'Something went wrong, please try again'
          console.error(err)
        })
      },
      remove () {
        if (confirm('Are you sure you want to delete this Dataset?')) {
          removeDataset({id: this.$route.params.id}).then((resp) => {
            this.unsavedChanges = false
            this.$router.push({name: 'datasets', query: {deleted: true}})
          }, (err) => {
            console.log('Something went wrong ' + err.message)
          })
        }
      },
      getKeywords () {
        getKeywordsText().then((keywords) => {
          this.allowedKeywords = keywords
        }, (e) => {
          alert('sorry, something went wrong')
        })
      },
      fetchData () {
        if (this.$route.query.saved === 'true') {
          this.successMsg = 'Added Successfully'
          this.unsavedChanges = false
        }

        getDirectorates().then((dset) => {
          // Loading the data in to a select box when the current value isn't one of the
          // Options will remove the value from the property!
          // Fixed by loading the directorates first
          this.directorates = dset

          if (this.$route.params.id !== 'new') {
            getDataset({id: this.$route.params.id}).then((dataset) => {
              delete dataset.keywords
              this.dataset = dataset
            }, (e) => {
              alert('sorry, something went wrong')
            })

            getElements({id: this.$route.params.id}).then((ele) => {
              this.element = ele
            }, (e) => {
              alert('sorry, something went wrong')
            })
          } else {
            this.dataset = JSON.parse(JSON.stringify(blankDataset))
          }
        }, (e) => {
          alert('sorry, something went wrong')
        })
        this.getKeywords()
      }
    },
    components: {
      'tags-input': tagsinput
    }
  }
</script>

<style lang='scss'>
  @import './assets/validation-errors';

  .messages {
    width: 100%;
    clear: right;
    text-align: center;
  }

  .buttons{
    margin-bottom: 10px;
  }

  .messages .message {
    padding: 10px;
    margin: 10px 0;
  }

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
