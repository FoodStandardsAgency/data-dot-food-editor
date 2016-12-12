<template>
  <main>
    <div id="details" v-if="dataset" :key="dataset.id">
      <div class="container">
        <form>
          <div class="pull-right">
            <a href="dataset-editor-list.html" class="btn btn-danger">Cancel</a>
            <a href="dataset-editor-list.html" class="btn btn-success">Save</a>
          </div>
          <div class="form-group" style="clear:right;">
            <label for="title">Title</label>
            <input type="text" class="form-control input-lg" id="text" placeholder="" v-model="dataset.title">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Description</label>
            <textarea class="form-control" rows="4" v-model="dataset.description"></textarea>
          </div>
          <div class="form-group">
            <label for="exampleInputFile">Directorate</label>
            <select class="form-control input-lg">
              <option>Chief Executive & Directors</option>
              <option>Chief Operating Officer Group</option>
              <option>Finance & Performance</option>
              <option>Northern Ireland & Organisational Development</option>
              <option>Openness, Digital & Data</option>
              <option>Policy & Science</option>
              <option>Regulatory & Legal Strategy</option>
              <option>Wales & Local Delivery</option>
            </select>
          </div>
          <div class="form-group assets-group">
            <button type="button" class="btn btn-success pull-right" aria-label="Add" data-toggle="modal" data-target="#myModal">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </button>
            <label for="assets">Elements</label>
            <div class="asset-table" style="clear:right; height:200px;overflow:scroll;border: 1px solid #ddd">
              <table id="assets" class="display" cellspacing="0" width="100%">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Format</th>
                    <th>URL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><a data-toggle="modal" data-target="#myModal">FSA Board and directors registered gifts and hospitality 2012-2013</a></td>
                    <td>FSA Board and directors registered gifts and hospitality 2012-2013</td>
                    <td>CSV</td>
                    <td>http://www.food.gov.uk/sites/default/files/csv/fsa-board-directors-gifts-hosp-2014-15q1.csv</td>
                  </tr>
                  <tr>
                    <td><a data-toggle="modal" data-target="#myModal">FSA Board and directors registered gifts and hospitality 2013-14 Quarter 1</a></td>
                    <td>FSA Board and directors registered gifts and hospitality 2013-14 Quarter 1</td>
                    <td>CSV</td>
                    <td>http://www.food.gov.uk/sites/default/files/csv/fsa-board-directors-gifts-hosp-2014-15q1.csv</td>
                  </tr>
                  <tr>
                    <td><a data-toggle="modal" data-target="#myModal">FSA Board and directors registered gifts and hospitality 2013-14 Quarter 2</a></td>
                    <td>FSA Board and directors registered gifts and hospitality 2013-14 Quarter 2 </td>
                    <td>CSV</td>
                    <td>http://www.food.gov.uk/sites/default/files/csv/fsa-board-directors-gifts-hosp-2014-15q1.csv</td>
                  </tr>
                  <tr>
                    <td><a data-toggle="modal" data-target="#myModal">FSA Board and directors registered gifts and hospitality 2013-14 Quarter 3</a></td>
                    <td>FSA Board and directors registered gifts and hospitality 2013-14 Quarter 3 </td>
                    <td>CSV</td>
                    <td>http://www.food.gov.uk/sites/default/files/csv/fsa-board-directors-gifts-hosp-2014-15q1.csv</td>
                  </tr>
                  <tr>
                    <td><a data-toggle="modal" data-target="#myModal">FSA Board and directors registered gifts and hospitality 2013-14 Quarter 4</a></td>
                    <td>FSA Board and directors registered gifts and hospitality 2013-14 Quarter 4</td>
                    <td>CSV</td>
                    <td>http://www.food.gov.uk/sites/default/files/csv/fsa-board-directors-gifts-hosp-2014-15q1.csv</td>
                  </tr>
                  <tr>
                    <td><a data-toggle="modal" data-target="#myModal">FSA Board and directors registered gifts and hospitality 2014-15 Quarter 1</a></td>
                    <td>FSA Board and directors registered gifts and hospitality 2014-15 Quarter 1 </td>
                    <td>CSV</td>
                    <td>http://www.food.gov.uk/sites/default/files/csv/fsa-board-directors-gifts-hosp-2014-15q1.csv</td>
                  </tr>
                  <tr>
                    <td><a data-toggle="modal" data-target="#myModal">FSA Board and directors registered gifts and hospitality 2014-15 Quarter 2</a></td>
                    <td>FSA Board and directors registered gifts and hospitality 2014-15 Quarter 2</td>
                    <td>CSV</td>
                    <td>http://www.food.gov.uk/sites/default/files/csv/fsa-board-directors-gifts-hosp-2014-15q2.csv</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <span class="daterange">Spans April 2012 - April 2015</span>
          </div>
          <div class="form-group">
            <label for="exampleInputFile">Domain</label>
            <select class="form-control input-lg">
              <option>Safety</option>
              <option>Accountability</option>
              <option>Health</option>
              <option>Alerts</option>
            </select>
          </div>
        </form>
        <form class="form-inline">
          <div class="form-group form-group-lg">
            <label class="radio">
              <label class="control-label col-sm-2" for="inlineRadio1">Publish</label>
              <input type="radio" name="inlineRadioOptions" id="inlineRadio1" class="input-lg" v-model="dataset.published" v-bind:value="true">
            </label>
            <label class="radio">
              <label class="control-label col-sm-2" for="inlineRadio2">Draft</label>
              <input type="radio" name="inlineRadioOptions" id="inlineRadio2" class="input-lg" v-model="dataset.published" v-bind:value="false">
            </label>
          </div>
        </form>
        <form>
          <div class="form-group">
            <label for="tags">Tags</label>
            <input type="text" v-model="dataset.tags" id="tags" />
          </div>
          <div class="form-group">
            <label for="owner">Owner</label>
            <textarea class="form-control input-lg" rows="3" v-model="dataset.owner"></textarea>
          </div>
          <div class="form-group">
            <label for="title">Notes</label>
            <textarea class="form-control input-lg" rows="2" v-model="dataset.notes"></textarea>
          </div>
        </form>
      </div>
    </div>
    <div id="details" v-else>
      Sorry, we can't find that dataset
    </div>
  </main>
</template>

<script>
  /* global $ confirm */
  import { getPost } from './api'
  import 'bootstrap'
  import 'bootstrap-tagsinput'
  import 'datatables.net/js/jquery.dataTables.js'
  import 'datatables.net-bs/js/dataTables.bootstrap.js'

  // import Bloodhound from 'bloodhound'
// <!-- ''
// <!-- 'js/typeahead.js'
// <!-- Include all compiled plugins (below), or include individual files as needed -->
// <!--
  //   var tags = [{
  //     label: 'registered'
  //   }, {
  //     label: 'gifts'
  //   }, {
  //     label: 'hospitality'
  //   }, {
  //     label: 'alerts'
  //   }, {
  //     label: 'allergy'
  //   }, {
  //     label: 'alerts'
  //   }, {
  //     label: 'audits'
  //   }, {
  //     label: 'approved'
  //   }, {
  //     label: 'meat'
  //   }, {
  //     label: 'establishments'
  //   }, {
  //     label: 'Radiological'
  //   }, {
  //     label: 'Monitoring'
  //   }, {
  //     label: 'local'
  //   }, {
  //     label: 'authority'
  //   }, {
  //     label: 'food'
  //   }, {
  //     label: 'law'
  //   }, {
  //     label: 'enforcement'
  //   }, {
  //     label: 'hygiene'
  //   }, {
  //     label: 'transactions'
  //   }, {
  //     label: 'expenditure'
  //   }, {
  //     label: 'evidence'
  //   }, {
  //     label: 'science'
  //   }, {
  //     label: 'scheme'
  //   }, {
  //     label: 'food'
  //   }, {
  //     label: 'rating'
  //   }, {
  //     label: 'gpc'
  //   }]
    // var engine = new Bloodhound({
    //   datumTokenizer: Bloodhound.tokenizers.obj.whitespace('label'),
    //   queryTokenizer: Bloodhound.tokenizers.whitespace,
    //   local: tags,
    //   identify: function (obj) { return obj.label }
    // })
    // engine.initialize()

  export default {
    created () {
      this.fetchData()
    },
    mounted () {
      this.initComponents()
    },
    watch: {
      '$route': 'fetchData'
    },
    data () {
      return {
        loading: false,
        dataset: null,
        error: null
      }
    },
    methods: {
      fetchData () {
        if (this.$route.params.id === 'new') {
          this.loading = false
          this.dataset = {} // Empty dataset object
        } else {
          let cleanedId = decodeURIComponent(this.$route.params.id)
          this.error = null
          this.loading = true
          getPost(cleanedId, (err, dataset) => {
            this.loading = false
            if (err) {
              this.error = err.toString()
            } else {
              this.dataset = dataset
            }
          })
        }
      },
      initComponents () {
        console.log('Initing components')
        $('#tags').tagsinput({
          // typeaheadjs: {
          //   name: 'users',
          //   displayKey: 'label',
          //   valueKey: 'label'// ,
          //   // source: engine.ttAdapter()
          // }
        })

        $('#tags').on('beforeItemAdd', function (event) {
          event.item = event.item.toLowerCase()
          if (event.item === 'something') {
            if (!confirm('Are you sure you want to create a new tag?')) {
              event.cancel = true
            }
          }
          // event.item: contains the item
          // event.cancel: set to true to prevent the item getting added
        })

        $('#assets').DataTable({
          'paging': false,
          'ordering': true,
          'info': false,
          'searching': false
        })
      }
    }
  }
</script>

<style lang='scss'>
  @import "~datatables/media/css/jquery.dataTables.css";
  @import "~datatables.net-bs/css/dataTables.bootstrap.css";
  @import "~bootstrap-tagsinput/dist/bootstrap-tagsinput.css";

  .bootstrap-tagsinput{
    width:100%;
    /* Copied from input-lg in BS */
    height: 46px;
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
    border-radius: 6px;
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
