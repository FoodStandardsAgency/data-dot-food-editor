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
            <a v-if="$route.params.eid !== 'new'" class="btn btn-danger" @click="remove">Delete</a>
            <router-link :to="{ name: 'elements', params: { id: $route.params.id, eid: 'new' }}" class="btn btn-default">Cancel</router-link>
            <button @click="save" type="button" class="btn btn-success">Save</button> <!-- :disabled="!unsavedChanges ? true : false" -->
          </div>
          <h4 class="modal-title" id="myModalLabel">Element editor</h4>

          <messages/>

          <div class="form-group" style="clear:left">
            <label for="Eltitle">Title</label>
            <input type="text" class="form-control" v-model="element.title" data-vv-as="title" id="Eltitle" v-validate data-vv-rules="required|min:8" name="Eltitle">
            <span class="validation-errors" v-show="errors.has('Eltitle')">{{ errors.first('Eltitle') }}</span>
          </div>
          <div class="form-group">
            <label for="Eldescription">Description</label>
            <textarea class="form-control" v-model="element.description" data-vv-as="description" rows="5" id="Eldescription" v-validate data-vv-rules="required|min:6" name="Eldescription"></textarea>
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
      <hr/>
      <div class="pull-right">
        <button class="btn btn-success add-distribution" @click="newDistribution" title="add distribution">
          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </button>
      </div>
      <h3>Distributions</h3>
      <p>Distributions are for different file format versions of an element</p>

      <template class="distributions row" v-for="(distribution, index) in element.distribution">
        <distribution @remove="removeDistribution" :distribution="distribution" :index="index"></distribution>
      </template>
    </div>

  </div>
</template>
<script>
  import blankElement from './proto/blank-element'
  import blankDistribution from './proto/blank-distribution'
  import DistributionDetails from './Distribution-Details'
  import uuid from 'uuid'
  import statics from './statics'
  import bootbox from 'bootbox'
  import cancelConfirm from './cancelConfirm'
  import log from './log'
  import parseHeader from './parseHeader'
  import bus from './components/Bus'

  import {getDatatypes, saveElement, removeElement, getElement} from './Api'

  export default {
    created () {
      this.fetchData()
    },
    components: {
      distribution: DistributionDetails
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
          bus.$emit('message', {
            str: 'Added Successfully. Changes won\'t appear publicly until published',
            success: true
          })
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
          bus.$emit('message', {
            str: 'Updated Successfully. Changes won\'t appear publicly until published',
            success: true
          })

          let eid = parseHeader(resp.headers)
          if (eid) {
            this.$router.push({name: 'element', params: {id: this.$route.params.id, eid: eid}, query: {saved: true}})
          }
        }, (e) => {
          log(e)
        })
      },
      remove () {
        let that = this
        bootbox.confirm('Are you sure you want to delete this element?', function (userResult) {
          if (!userResult) return

          removeElement({
            id: that.$route.params.id,
            eid: that.$route.params.eid
          }).then((resp) => {
            that.unsavedChanges = false
            that.$router.push({name: 'elements', params: {id: that.$route.params.id}, query: {deleted: true}})
          }, (e) => {
            log(e)
          })
        })
      },
      newDistribution () {
        // Add a new distribution to distributions
        let newDistro = JSON.parse(JSON.stringify(blankDistribution))
        newDistro['@id'] = statics.distributionUri + uuid.v4()
        this.element.distribution = [newDistro].concat(this.element.distribution) // Add as first element
      },
      removeDistribution (el) {
        this.element.distribution.splice(this.element.distribution.indexOf(el), 1)
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
  .add-distribution {}
</style>
