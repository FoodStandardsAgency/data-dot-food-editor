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
            <button type="button" class="btn btn-success" data-dismiss="modal">Done</button>
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
              <label for="csv" class="col-sm-2 form-label">HTML</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="element.html" id="html" placeholder="http://">
              </div>
            </div>
            <div class="form-group">
              <label for="csv" class="col-sm-2 form-label">JSON</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="element.json" id="json" placeholder="http://">
              </div>
            </div>
            <div class="form-group">
              <label for="csv" class="col-sm-2 form-label">XML</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="element.xml" id="xml" placeholder="http://">
              </div>
            </div>
            <div class="form-group">
              <label for="csv" class="col-sm-2 form-label">CSV</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="element.csv" id="csv" placeholder="http://">
              </div>
            </div>
            <div class="form-group">
              <label for="startdate">From Date</label>
              <input type="date" class="form-control" v-model="element.fromDate" id="startdate" placeholder="startDate">
            </div>
            <div class="form-group">
              <label for="enddate">To Date</label>
              <input type="date" class="form-control" v-model="element.toDate" id="enddate" placeholder="endDate">
            </div>
          </form>
          <a class="btn btn-danger" @click="del">Delete</a>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import 'bootstrap'
  import $ from 'jquery'

  export default {
    props: {
      element: Object, // Object literal of Element
      delFunction: Function // Callback function for delete action
    },
    data () {
      return {
        loading: false,
        error: null
      }
    },
    methods: {
      del () {
        this.delFunction(this.element)
        $('#elementModal').modal('hide')
      }
    }
  }
</script>

<style lang='scss' scoped>
</style>
