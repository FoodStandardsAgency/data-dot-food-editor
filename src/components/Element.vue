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
            <button @click="save" type="button" class="btn btn-success">Save</button>
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
  /* global confirm */
  import 'bootstrap'
  import $ from 'jquery'
  import {saveElement, removeElement} from '../Api'

  export default {
    props: {
      element: Object, // Object literal of Element
      closeFunction: Function // Callback function for after delete action
    },
    data () {
      return {
        loading: false,
        error: null,
        formats: ['json', 'html', 'csv', 'xml', 'rdf']
      }
    },
    methods: {
      close () {
        $('#elementModal').modal('hide')
        if (this.closeFunction) {
          this.closeFunction()
        }
      },
      save () {
        saveElement({
          id: 'FSA-13-04',
          eid: this.element['@id'].split('/').pop()
        }, this.element, (err, resp) => {
          console.log('Logging on save', err, resp)
          this.unsavedChanges = false
          this.close()
        })
      },
      remove () {
        if (confirm('Are you sure you want to delete this element?')) {
          removeElement({
            id: 'FSA-13-04',
            eid: this.element['@id'].split('/').pop()
          }, (err, resp) => {
            console.log('Logging on remove', err, resp)
            this.unsavedChanges = false
            this.close()
          })
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
</style>
