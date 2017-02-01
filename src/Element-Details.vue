<!--
Elements are an attribute of Datasets
They hold details of a specific item inside a dataset with a start and end date
Displayed as a modal
-->
<template>
  <main>
    <div class="container">
      <ol class="breadcrumb">
        <li><router-link :to="{ name: 'datasets'}" class="active">Datasets</router-link></li>
        <li><router-link :to="{ name: 'dataset', params: { id: $route.params.id, eid: 'new' }}" class="active">{{$route.params.id}}</router-link></li>
        <li><router-link :to="{ name: 'elements', params: { id: $route.params.id, eid: 'new' }}" class="active">elements</router-link></li>
        <li>{{$route.params.eid}}</li>
      </ol>
    </div>
    <div id="details" v-if="element" :key="element.id">
      <div class="container">
        <form v-on:submit.prevent="">
          <div class="pull-right buttons">
            <a v-if="$route.params.eid !== 'undefined'" class="btn btn-danger" @click="remove">Delete</a>
            <router-link :to="{ name: 'elements', params: { id: $route.params.id, eid: 'new' }}" class="btn btn-default">Cancel</router-link>
            <button @click="save" type="button" class="btn btn-success">Save</button> <!-- :disabled="!unsavedChanges ? true : false" -->
          </div>
          <h4 class="modal-title" id="myModalLabel">Element editor</h4>

          <messages :success="successMsg" :warn="warnMsg"></messages>

          <div class="form-group" style="clear:left">
            <label for="Eltitle">Title</label>
            <input type="text" class="form-control" v-model="element.title" id="Eltitle" v-validate data-vv-rules="required|min:8" name="Eltitle">
            <span class="validation-errors" v-show="errors.has('Eltitle')">{{ errors.first('Eltitle') }}</span>
          </div>
          <div class="form-group">
            <label for="Eldescription">Description</label>
            <textarea class="form-control" v-model="element.description" rows="5" id="Eldescription" v-validate data-vv-rules="required|min:6" name="Eldescription"></textarea>
            <span class="validation-errors" v-show="errors.has('Eldescription')">{{ errors.first('Eldescription') }}</span>
          </div>
          <div class="row">
            <div class="form-group col-md-6">
              <label for="Elstartdate">Start Date</label>
              <input type="date" class="form-control" v-model="element.startDate" data-vv-as="start date" v-validate data-vv-rules="date_format:YYYY-MM-DD" id="Elstartdate" name="Elstartdate" placeholder="dd/mm/yyyy">
              <span class="validation-errors" v-show="errors.has('Elstartdate')">{{ errors.first('Elstartdate') }}</span>
            </div>
            <div class="form-group col-md-6">
              <label for="Elenddate">End Date</label>
              <input type="date" class="form-control" v-model="element.endDate" data-vv-as="end date" v-validate data-vv-rules="date_format:YYYY-MM-DD" id="Elenddate" name="Elenddate" placeholder="dd/mm/yyyy">
              <span class="validation-errors" v-show="errors.has('Elenddate')">{{ errors.first('Elenddate') }}</span>
            </div>
          </div>
        </form>
    </div>

    <div class="container distributions">
      <h3>Distributions</h3>
      <p>Distributions available for this asset</p>
      <button @click="newDistribution">Add distribution</button>
      <div class="distribution row" v-for="(distribution, index) in element.distribution">
        <div class="closeBtnHolder">
          <button v-on:click="removeDistribution(index)" class="pull-right">Remove</button>
        </div>
        <div class="form-group col-md-6">
          <label for="Elformat">Format</label>
          <select class="form-control" :id="'Elformat' + index" v-validate data-vv-rules="required" data-vv-as="Format" :name="'Elformat' + index" v-model="distribution.mediaType">
            <option v-for="datatype in datatypes" v-bind:value="datatype.code">
              {{datatype.name}}
            </option>
          </select>
          <span class="validation-errors" v-show="errors.has('Elformat' + index)">{{ errors.first('Elformat' + index) }}</span>
        </div>
        <div class="form-group col-md-6">
          <label for="Elaccess" class="form-label">Access URL</label>
          <input type="text" class="form-control" v-model="distribution.accessURL" v-validate data-vv-rules="url" data-vv-as="Access" :name="'Elaccess' + index" :id="'Elaccess'  + index" placeholder="http://">
          <span class="validation-errors" v-show="errors.has('Elaccess' + index)">{{ errors.first('Elaccess' + index) }}</span>
        </div>
        <div class="form-group col-md-12">
          <label>Static</label>
          <span class="help-block">Is the resource static, e.g. can a user get different results at different times</span>
          <input type="checkbox">Static</input>
        </div>
        <div class="form-group">
          <label for="Eldownload" class="form-label">Download URL</label>
          <input type="text" class="form-control" v-model="distribution.downloadURL" v-validate data-vv-rules="url" data-vv-as="Download" :id="'Eldownload' + index" :name="'Eldownload' + index" placeholder="http://">
          <span class="validation-errors" v-show="errors.has('Eldownload' + index)">{{ errors.first('Eldownload' + index) }}</span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import blankElement from './blank-element'
  import blankDistribution from './blank-distribution'
  import uuid from 'uuid'
  import statics from './statics'
  import 'bootstrap'
  import bootbox from 'bootbox'
  import cancelConfirm from './cancelConfirm'
  import log from './log'
  import parseHeader from './parseHeader'

  import {getDatatypes, saveElement, removeElement, getElement} from './Api'

  export default {
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData',
      'element': {
        deep: true,
        handler: function (val, oldVal) {
          if (!this.beforeLoad) {
            // this.unsavedChanges = true
          } else {
            this.beforeLoad = false
          }
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      if (this.unsavedChanges) {
        cancelConfirm(next)
      } else {
        next()
      }
    },
    data () {
      return {
        datatypes: [],
        unsavedChanges: false,
        beforeLoad: true,
        successMsg: '',
        warnMsg: '',
        element: JSON.parse(JSON.stringify(blankElement))
      }
    },
    mounted () {
      getDatatypes().then((dset) => {
        this.datatypes = dset
      }, (e) => {
        log(e)
      })
    },
    methods: {
      fetchData () {
        if (this.$route.query.saved) {
          this.successMsg = 'Added Successfully'
          this.unsavedChanges = false
        }

        if (this.$route.params.eid !== 'new') {
          getElement({id: this.$route.params.id, eid: this.$route.params.eid}).then((ele) => {
            this.element = ele
          }, (e) => {
            log(e)
          })
        } else {
          this.element = JSON.parse(JSON.stringify(blankElement))
        }
      },
      save () {
        saveElement({
          id: this.$route.params.id,
          eid: this.$route.params.eid
        }, this.element).then((resp) => {
          this.unsavedChanges = false
          this.successMsg = 'Updated Successfully'

          let eid = parseHeader(resp.headers)
          if (eid) {
            this.$router.push({name: 'element', params: {id: this.$route.params.id, eid: eid}, query: {saved: true}})
          }
        }, (e) => {
          log(e)
        })
      },
      remove () {
        bootbox.confirm('Are you sure you want to delete this element?', function (userResult) {
          if (!userResult) return

          removeElement({
            id: this.$route.params.id,
            eid: this.$route.params.eid
          }).then((resp) => {
            this.unsavedChanges = false
            this.$router.push({name: 'elements', params: {id: this.$route.params.id}, query: {deleted: true}})
          }, (e) => {
            log(e)
          })
        })
      },
      newDistribution () {
        // Add a new distribution to distributions
        let newDistro = JSON.parse(JSON.stringify(blankDistribution))
        newDistro['@id'] = statics.distributionUri + uuid.v4()
        this.element.distribution.push(newDistro)
      },
      removeDistribution (index) {
        this.element.distribution.splice(index, 1)
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import './assets/validation-errors';

  .distribution {
    border: 1px solid #AAA;
    margin: 10px 0;
    padding: 5px 5px;
  }
  .closeBtnHolder {
    padding-bottom: 20px;
  }
</style>
