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
        <div class="row">
          <div class="col-md-12">
            <div class="pull-right buttons">
              <a v-if="$route.params.id !== 'new'" @click="remove" class="btn btn-danger">Delete</a>
              <router-link to="/" role="button" class="btn btn-default">Cancel</router-link>
              <a @click="save" class="btn btn-success">Save</a> <!-- :disabled="!unsavedChanges ? true : false" -->
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-9 dataset-panel">
            <form v-on:submit.prevent="">
              <!-- Messages -->
              <messages/>
              <!-- Title -->
              <div class="form-group" style="clear:right;">
                <label for="title">Title</label>
                <input type="text" class="form-control input-lg" data-disable-validate-on="input|change" autocomplete="off" id="title" name="title" :class="{'input': true, 'is-danger': errors.has('title') }" v-validate data-vv-rules="required|min:8" placeholder="" v-model="dataset.title">
                <span class="validation-errors" v-show="errors.has('title')">{{ errors.first('title') }}</span>
              </div>
              <!-- Description -->
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
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="licence">Licence</label>
                    <select class="form-control input-lg" id="license" name="license" v-model="dataset.license">
                      <option v-for="licenceItem in licences" :value="licenceItem" :key="licenceItem['@id']">
                        {{licenceItem.label}}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <!-- Directorate -->
                  <div class="form-group">
                    <label for="directorate">Directorate</label>
                    <select class="form-control input-lg" id="directorate" name="directorate" v-model="dataset.directorate">
                      <option v-for="directorateItem in directorates" :value="directorateItem['@id']" :key="directorateItem['@id']">
                        {{directorateItem.prefLabel}}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <!-- Frequency -->
              <div class="form-group">
                <label for="frequency">Publish Frequency</label>
                <div class="input-group">
                  <div class="input-group-addon">R/P</div>
                  <input type="text" class="form-control input-lg" id="frequency" v-validate data-vv-rules="iso8601" name="frequency" v-model="dataset.accrualPeriodicity"/>
                </div>
                <span class="validation-errors" v-show="errors.has('frequency')">{{ errors.first('frequency') }}</span>
                <span v-show="!errors.has('frequency')" class="iso8601">{{dataset.accrualPeriodicity | iso8601}}</span>
                <span v-show="!errors.has('frequency') && !dataset.accrualPeriodicity" class="iso8601">Example: 1Y for repeating yearly, 1M for every month</span>
              </div>
              <!-- Landing Page -->
              <div class="form-group">
                <label for="landing">Landing Page URL</label>
                <input type="text" class="form-control input-lg" id="landingPage" name="landingPage" v-validate data-vv-rules="url" v-model="dataset.landingPage"/>
                <p class="help-block">A webpage describing the dataset</p>
                <span class="validation-errors" v-show="errors.has('landingPage')">{{ errors.first('landingPage') }}</span>
              </div>
            </form>
            <!-- Issued -->
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="landing">Issued</label>
                  <input type="date" class="form-control input-lg" id="issued" name="issued" v-model="dataset.issued"/>
                  <p class="help-block">The date the dataset was first issued</p>
                </div>
              </div>
              <!-- Modified -->
              <div class="col-md-6">
                <div class="form-group">
                  <label for="landing">Modified</label>
                  <input type="date" class="form-control input-lg" id="modified" name="modified" v-model="dataset.modified"/>
                  <p class="help-block">The date the dataset was last modified</p>
                </div>
              </div>
            </div>
            <form v-on:submit.prevent="">
              <!-- Keywords -->
              <div class="form-group">
                <label for="keyword">Keywords</label>
                <div class="input-group">
                  <div class="form-control input-lg tags-input activities-input">
                    <span class="tag" v-for="keyword in dataset.keyword" :key="keyword['@id']">
                      {{keyword.prefLabel}}
                      <span class="hl-click" v-on:click="removeTag(keyword)"></span>
                    </span>
                  </div>
                  <div class="input-group-btn">
                    <div class="dropdown">
                      <button type="button" class="btn btn-lg btn-success dropdown-toggle keywords-dropdown-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add <span class="caret"></span></button>
                      <ul class="dropdown-menu keywords-dropdown">
                        <li>
                          <div class="add-tag-form">
                            <form v-on:submit.prevent="handleAddTag">
                              <label>New tag</label>
                              <input v-model="newTagInput" type="text"/>
                            </form>
                          </div>
                        </li>
                        <li role="separator" class="divider"></li>
                        <li v-for="keyword in allowedKeywords" :key="keyword['@id']">
                          <a href="#" v-on:click.prevent="addTagObject(keyword)">{{keyword.prefLabel}}</a>
                        </li>
                      </ul>
                    </div>
                  </div><!-- /btn-group -->
                </div>
              </div>
              <!-- Activities -->
              <div class="form-group">
                <h4>Activities</h4>
                <div class="input-group">
                  <div class="form-control input-lg tags-input activities-input">
                    <span class="tag" v-for="activity in dataset.activity" :key="activity['@id']">
                      {{getActivityName(activity)}}
                      <span class="hl-click" v-on:click="removeActivity(activity)"></span>
                    </span>
                  </div>
                  <div class="input-group-btn">
                    <div class="dropdown">
                      <button type="button" class="btn btn-lg btn-success dropdown-toggle keywords-dropdown-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Add <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu keywords-dropdown">
                        <li v-for="activity in activities" :key="activity['@id']">
                          <a href="#" v-on:click.prevent="addActivity(activity)">{{activity.niceName}}</a>
                        </li>
                      </ul>
                    </div>
                  </div><!-- /btn-group -->
                </div>
              </div>
            </form>
          </div><!-- /col-md-9 -->
          <div class="col-md-3">
            <div class="form-group assets-group">
              <h3>
                Elements
              </h3>
              <p>Elements are versions of a dataset. These are, for example, different years or locations</p>
              <div>
                <template v-if="$route.params.id !== 'new'">
                  <arr-length :arr="element"></arr-length>
                  <router-link :to="{ name: 'elements', params: { id: $route.params.id }}" class="btn btn-primary">Edit elements</router-link>
                </template>
                <template v-else>
                  <p class="validation-errors">Please save Dataset before adding elements</p>
                </template>
              </div>
            </div>

            <!-- Publish -->
            <hr/>
            <form v-on:submit.prevent="">
              <h3>Publication</h3>
              <span id="helpBlock" class="help-block">Publish Dataset to the public site during the next <router-link :to="{ name: 'publish'}">publish cycle</router-link></span>

              <div class="radio">
                <label>
                  <input type="radio" name="published" id="publish" v-model="dataset.published" :value="true">
                  Mark as "To Publish"
                </label>
              </div>
              <div class="radio">
                <label>
                  <input type="radio" name="published" id="draft" v-model="dataset.published" :value="false">
                  Mark as "Draft"
                </label>
              </div>
            </form>
            <hr/>
            <!-- Owner -->
            <div class="form-group">
              <label for="ownerName">Owner details (not publicly published)</label>
              <textarea id="ownerName" name="ownerName" class="form-control input-lg" rows="3" v-model="dataset.ownerName"></textarea>
            </div>
            <hr/>
            <!-- Notes -->
            <div class="form-group">
              <label for="title">Notes (not publicly published)</label>
              <textarea class="form-control input-lg" rows="2" v-model="dataset.notes"></textarea>
            </div>

          </div>
        </div><!-- /row -->
      </div>
    </div>

    <div id="details" v-else>
      Sorry, we can't find that dataset
    </div>
  </main>
</template>

<script>
  import {getDataset, getDirectorates, getLicences, getActivities, getElements, saveDataset, removeDataset, getKeywordsObjects, saveKeyword} from './Api'
  import blankDataset from './proto/blank-dataset'
  import blankKeyword from './proto/blank-keyword'
  import iso8601 from './filters/Iso8601'
  import log from './log'
  import parseHeader from './parseHeader'
  import bus from './components/Bus'
  import statics from './statics'

  export default {
    created () {
      this.fetchData()
    },
    watch: {
      '$route': function () {
        if (this.$route.query.saved) {
          bus.$emit('message', {
            str: 'Added Successfully. Changes won\'t appear publicly until published',
            success: true
          })
          this.unsavedChanges = false
        }
        this.fetchData()
      },
      'dataset': {
        deep: true,
        handler: function (val, oldVal) {
          if (val.notation === oldVal.notation && !this.beforeLoad) {
            // this.unsavedChanges = true
          }
          this.beforeLoad = false
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      if (this.unsavedChanges) {
        // cancelConfirm(next)
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
        activities: [],
        element: [],
        allowedKeywords: [],
        newTagInput: '',
        licences: []
      }
    },
    filters: {
      iso8601
    },
    methods: {
      handleAddTag () {
        let tag = this.newTagInput
        this.newTagInput = '' // Clear input
        this.createTagObject(tag)
      },
      removeTag (activ) {
        this.dataset.keyword.splice(this.dataset.keyword.indexOf(activ), 1)
      },
      addTagObject (tag) {
        if (this.dataset.keyword.some((keyword) => {
          return keyword['@id'] === tag['@id']
        })) {
          return
        }
        this.dataset.keyword.push(tag)
      },
      createTagObject (text) {
        if (text) {
          text = text.toLowerCase()
          let keyWordId = statics.keywordUri + text.replace(/[/!£^&*()@#?$%\s]/g, '-')
          // Check that the keyword is one of the allowed keywords
          // Prompt before adding text

          if (this.allowedKeywords.some((keyword) => {
            if (keyword['@id'] === keyWordId) {
              this.addTagObject(keyword)
              return true
            }
            return false
          })) {
            return
          }

          let that = this
          this.$dialog
            .confirm('Are you sure you want to add a new global tag?')
            .then(function() { // confirmed
              // Add tag to globally allowed tags
              let newKeyword = JSON.parse(JSON.stringify(blankKeyword))

              newKeyword['prefLabel'] = text

              // Populate the keywords property from the keyword field

              newKeyword['@id'] = keyWordId

              saveKeyword({}, newKeyword).then(() => {
                that.getKeywords() // Update locally stored keywords object
                that.dataset.keyword.push(newKeyword)
              }, (e) => {
                log(e)
              })
            })
            .catch(function() { // canceled
            });
        }
      },
      removeActivity (activ) {
        this.dataset.activity.splice(this.dataset.activity.indexOf(activ), 1)
      },
      addActivity (activ) {
        if (this.dataset.activity.indexOf(activ) === -1) {
          this.dataset.activity.push(activ)
        }
      },
      save () {
        let dataset = JSON.parse(JSON.stringify(this.dataset))
        // Re-add the Repeating / Period part to dataset.accrualPeriodicity
        if (dataset.accrualPeriodicity) {
          dataset.accrualPeriodicity = 'R/P' + dataset.accrualPeriodicity.toUpperCase()
        }

        saveDataset({id: this.$route.params.id}, dataset).then((resp) => {
          this.unsavedChanges = false
          bus.$emit('message', {
            str: 'Updated Successfully. Changes won\'t appear publicly until published',
            success: true
          })

          let id = parseHeader(resp.headers)
          if (id) {
            this.$router.push({name: 'dataset', params: {id: id}, query: {saved: true}})
          }
        }, (err) => {
          bus.$emit('message', {
            str: 'Something went wrong, please try again',
            success: false
          })
          log(err)
        })
      },
      remove () {
        let that = this
        this.$dialog
          .confirm('Are you sure you want to delete this Dataset?')
          .then(function() { // confirmed
            removeDataset({id: that.$route.params.id}).then(() => {
              that.unsavedChanges = false
              that.$router.push({name: 'datasets', query: {deleted: true}})
            }, (e) => {
              log(e)
            })
          })
          .catch(function() { // canceled
          });
      },
      getKeywords () {
        return getKeywordsObjects().then((keywords) => {
          this.allowedKeywords = keywords
        }, (e) => {
          log(e)
        })
      },
      getActivityName (activity) {
        for (let curr in this.activities) {
          if (this.activities[curr]['@id'] === activity['@id']) {
            return this.activities[curr].niceName
          }
        }
      },
      fetchData () {
        // Load order is important for the data
        // Load dependancies first then load the dataset
        // This stops issues with the select boxes changing underlying values
        getDirectorates()
          .then((dset) => {
            // Loading the data in to a select box when the current value isn't one of the
            // Options will remove the value from the property!
            // Fixed by loading the directorates first
            this.directorates = dset
          })
          .then(
            getActivities()
              .then((dset) => {
                this.activities = dset
              })
          )
          .then(this.getKeywords())
          .then(
            getLicences()
              .then((licences) => {
                // Fix load of licences also before dataset
                this.licences = licences
              }, (e) => {
                log(e)
              })
          )
          .then(() => {
            if (this.$route.params.id !== 'new') {
              getDataset({id: this.$route.params.id}).then((dataset) => {
                let joinedKeywords = []
                if (dataset.keywords) {
                  dataset.keywords.map((keyword) => {
                    let keywordObj = this.allowedKeywords.find(function (el) {
                      return el['@id'] === keyword ? el : false
                    })
                    if (keywordObj) {
                      joinedKeywords.push(keywordObj)
                    }
                  })
                }
                dataset.keyword = joinedKeywords
                delete dataset.keywords
                this.dataset = dataset
              }, (e) => {
                log(e)
              })

              getElements({id: this.$route.params.id}).then((ele) => {
                this.element = ele
              }, (e) => {
                log(e)
              })
            } else {
              this.dataset = JSON.parse(JSON.stringify(blankDataset))
            }
          })
      }
    }
  }
</script>

<style lang='scss'>
  @import './assets/validation-errors';
  .add-tag-form {
    display: block;
    padding: 3px 20px;
    clear: both;
    font-weight: normal;
    line-height: 1.42857;
    color: #333333;
    white-space: nowrap;
  }

  .tags-input {
    box-shadow: none!important;
    border-radius: 0!important;
    height: auto;
    padding: 4px 8px!important;
  }

  .activities-input {
    min-height: 46px;
    padding-top: 10px!important;
  }

  .hl-click {
    line-height: 11px;
    display: block;
    float: right;
    margin-left: 3px;
    font-size: 22px;
  }

  .keywords-dropdown {
    max-height: 300px;
    overflow: auto;
  }

  .keywords-dropdown-btn {
    height: 46px;
  }

  .keywords-dropdown-button {
    max-height: 300px;
    overflow: auto;
  }

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

  .tag {
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    color: #858585;
    font-weight: normal;
    padding: 0 0.5ch;
    display: inline-block;
    margin-right: 5px;
  }
  .hl-click{
    cursor: pointer;
  }
  .activity-add{
    cursor: pointer;
    margin-right: 5px;
  }
  .hl-click::after {
    color: rgba(0,0,0,.5)!important;
    content: "\f05c"!important;
    font: normal normal normal 14px/1 FontAwesome;
    display: block;
    margin-top: 2px;
  }

  @media (min-width: 992px) {
    .dataset-panel{
      border-right: 1px solid #DDD;
    }
  }
</style>
