<!--
Elements are an attribute of Datasets
They hold details of a specific item inside a dataset with a start and end date
Displayed as a modal
-->
<template>
  <div class="modal fade" id="elementModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">

        <div class="modal-header">
          <div class="pull-right">
            <button type="button" class="btn" data-dismiss="modal">Cancel</button>
            <button @click="save" type="button" :disabled="!unsavedChanges ? true : false" class="btn btn-success">Save</button>
          </div>
          <h4 class="modal-title" id="myModalLabel">Asset editor</h4>
        </div>

        <div class="modal-body">
          <form>
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
                <option v-for="format in formats" v-bind:value="format">
                  {{format}}
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
              <input type="date" class="form-control" v-model="element.temporalStart" id="Elstartdate" name="Elstartdate" placeholder="startDate">
              <span class="validation-errors" v-show="errors.has('Elstartdate')">{{ errors.first('Elstartdate') }}</span>
            </div>
            <div class="form-group">
              <label for="Elenddate">To Date</label>
              <input type="date" class="form-control" v-model="element.temporalEnd" id="Elenddate" name="Elenddate" placeholder="endDate">
              <span class="validation-errors" v-show="errors.has('Elenddate')">{{ errors.first('Elenddate') }}</span>
            </div>
          </form>
          <a v-if="$route.params.eid !== 'undefined'" class="btn btn-danger" @click="remove">Delete</a>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  /* global confirm alert */
  import 'bootstrap'
  import $ from 'jquery'
  import {saveElement, removeElement} from './Api'

  export default {
    props: {
      element: Object // Object literal of Element
    },
    watch: {
      'element': {
        deep: true,
        handler: function (val, oldVal) {
          if (val.notation === oldVal.notation && !this.beforeLoad) {
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
        formats: ['json', 'html', 'csv', 'xml', 'rdf'],
        unsavedChanges: false,
        beforeLoad: true
      }
    },
    mounted () {
      console.log('mounted')
      $('#elementModal').on('hide.bs.modal', (e) => {
        this.close()
      })
    },
    methods: {
      hide () {
        $('#elementModal').modal('hide')
      },
      close () {
        this.$emit('close')
        this.$router.push({name: 'elements', params: { id: this.$route.params.id }})
      },
      save () {
        saveElement({
          id: this.$route.params.id,
          eid: this.$route.params.eid
        }, this.element).then((resp) => {
          this.unsavedChanges = false
          this.hide()
          this.close()
        }, (e) => {
          alert('sorry, something went wrong.')
        })
      },
      remove () {
        if (confirm('Are you sure you want to delete this element?')) {
          removeElement({
            id: 'FSA-13-04',
            eid: this.element['@id'].split('/').pop()
          }).then((resp) => {
            this.unsavedChanges = false
            this.hide()
            this.close()
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
