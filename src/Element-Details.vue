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
        <form>
          <div class="pull-right buttons">
            <a v-if="$route.params.eid !== 'undefined'" class="btn btn-danger" @click="remove">Delete</a>
            <router-link :to="{ name: 'elements', params: { id: $route.params.id, eid: 'new' }}" class="btn btn-default">Cancel</router-link>
            <button @click="save" type="button" :disabled="!unsavedChanges ? true : false" class="btn btn-success">Save</button>
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
          <div class="form-group">
            <label for="Elformat">Format</label>
            <select class="form-control input-lg" id="Elformat" name="Elformat" v-validate data-vv-rules="required" v-model="element.format">
              <option v-for="datatype in datatypes" v-bind:value="datatype.code">
                {{datatype.name}}
              </option>
            </select>
            <span class="validation-errors" v-show="errors.has('Elformat')">{{ errors.first('Elformat') }}</span>
          </div>
          <div class="form-group">
            <label for="Elaccess" class="form-label">Access URL</label>
            <input type="text" class="form-control" v-model="element.accessURL" v-validate data-vv-rules="url" name="Elaccess" id="Elaccess" placeholder="http://">
            <span class="validation-errors" v-show="errors.has('Elaccess')">{{ errors.first('Elaccess') }}</span>
          </div>
          <div class="form-group">
            <label for="Eldownload" class="form-label">Download URL</label>
            <input type="text" class="form-control" v-model="element.downloadURL" v-validate data-vv-rules="url" id="Eldownload" name="Eldownload" placeholder="http://">
            <span class="validation-errors" v-show="errors.has('Eldownload')">{{ errors.first('Eldownload') }}</span>
          </div>
          <div class="form-group">
            <label for="Elstartdate">From Date</label>
            <input type="date" class="form-control" v-model="element.startDate" id="Elstartdate" name="Elstartdate" placeholder="startDate">
            <span class="validation-errors" v-show="errors.has('Elstartdate')">{{ errors.first('Elstartdate') }}</span>
          </div>
          <div class="form-group">
            <label for="Elenddate">To Date</label>
            <input type="date" class="form-control" v-model="element.endDate" id="Elenddate" name="Elenddate" placeholder="endDate">
            <span class="validation-errors" v-show="errors.has('Elenddate')">{{ errors.first('Elenddate') }}</span>
          </div>
        </form>
    </div>

  </div>

  <!-- <div class="modal fade" id="boolModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">

        <div class="modal-header">
          <div class="pull-right">
            <button type="button" class="btn" data-dismiss="modal">Cancel</button>
            <button @click="save" type="button" :disabled="!unsavedChanges ? true : false" class="btn btn-success">Save</button>
          </div>
          <h4 class="modal-title" id="myModalLabel">Are you sure you want to?</h4>
        </div>

        <div class="modal-body">
          <form>
            <div class="form-group" style="clear:left">
              <label for="Eltitle">Title</label>
              <input type="text" class="form-control" v-model="element.title" id="Eltitle" v-validate data-vv-rules="required|min:8" name="Eltitle">
              <span class="validation-errors" v-show="errors.has('Eltitle')">{{ errors.first('Eltitle') }}</span>
            </div>
        </div>
      </div>
    </div>
  </div> -->
</template>
<script>
  /* global confirm alert */
  import blankElement from './blank-element'

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
          console.log(val)
          if (!this.beforeLoad) {
            this.unsavedChanges = true
          } else {
            this.beforeLoad = false
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
        alert('sorry, something went wrong')
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
            alert('sorry, something went wrong')
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

          // TODO slightly hacky
          if (resp.headers.map.location && resp.headers.map.location[0]) {
            let eid = resp.headers.map.location[0].split('/').pop()
            this.$router.push({name: 'element', params: {id: this.$route.params.id, eid: eid}, query: {saved: true}})
          }
        }, (e) => {
          alert('sorry, something went wrong.')
        })
      },
      remove () {
        if (confirm('Are you sure you want to delete this element?')) {
          removeElement({
            id: this.$route.params.id,
            eid: this.$route.params.eid
          }).then((resp) => {
            this.unsavedChanges = false
            this.$router.push({name: 'elements', params: {id: this.$route.params.id}, query: {deleted: true}})
          }, (e) => {
            alert('sorry, something went wrong.')
          })
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import './assets/validation-errors';
</style>
