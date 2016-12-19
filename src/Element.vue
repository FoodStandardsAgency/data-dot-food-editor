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
              <label for="title">Title</label>
              <input type="text" class="form-control" v-model="element.title" id="text">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Description</label>
              <textarea class="form-control" v-model="element.description" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label for="access">Format</label>
              <select class="form-control input-lg" v-model="element.format">
                <option v-for="format in formats" v-bind:value="format">
                  {{format}}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="access" class="form-label">Access URL</label>
              <input type="text" class="form-control" v-model="element.accessURL" id="access" placeholder="http://">
            </div>
            <div class="form-group">
              <label for="download" class="form-label">Download URL</label>
              <div>
                <input type="text" class="form-control" v-model="element.downloadURL" id="download" placeholder="http://">
              </div>
            </div>
            <div class="form-group">
              <label for="startdate">From Date</label>
              <input type="date" class="form-control" v-model="element.temporalStart" id="startdate" placeholder="startDate">
            </div>
            <div class="form-group">
              <label for="enddate">To Date</label>
              <input type="date" class="form-control" v-model="element.temporalEnd" id="enddate" placeholder="endDate">
            </div>
          </form>
          <a class="btn btn-danger" @click="remove">Delete</a>
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
          eid: this.element['@id'] ? this.element['@id'].split('/').pop() : null
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
</style>
