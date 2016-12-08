<template>
  <main>
  <div class="container">
    <h1>FSA open data catalogue</h1>
    <div class="pull-right">
      <router-link to="/dataset/new" class="btn btn-lg btn-round" title="add dataset">+</router-link>
    </div>
    <p class="text-muted">View and update Food Standards Agency open datasets and related assets.</p>

    <div class="row">
      <div class="col-sm-12" id="wrapper">
        <table id="dataset-catalogue" class="table"> </table>
      </div>
    </div>
  </div>
</main>
</template>

<script>
  import { getAll } from './api'
  import $ from 'jquery'
  import 'datatables.net/js/jquery.dataTables.js'
  import 'datatables.net-bs/js/dataTables.bootstrap.js'
  import CATALOGUE from './od-report-october-assets.json'

  /* Simple mockup of dataset editor list view */

  var DataSetEditor = (function () {
    var init = function () {
      initialiseDatatable()
      initialiseEvents()
    }

    var initialiseDatatable = function () {
      $('#dataset-catalogue').DataTable({
        data: CATALOGUE,
        columns: [
          {
            data: 'published',
            title: 'published?',
            render: function (data, type, row) {
              return data ? 'Y' : 'N'
            }
          },
          { data: 'notation', title: 'ID' },
          { data: 'title', title: 'Title' },
          { data: 'description', title: 'Description' }
        ]
      })
    }

    var initialiseEvents = function () {
      $('table')
        .on('click', 'tr', onRowClick)
        .on('mouseenter', 'tr', function (e) {
          if (isInTableBody(e.currentTarget)) {
            $(e.currentTarget).css('background-color', '#bbbb99')
          }
        })
        .on('mouseleave', 'tr', function (e) {
          $(e.currentTarget).css('background-color', 'white')
        })
    }

    var onRowClick = function (e) {
      if (isInTableBody(e.currentTarget)) {
        console.log(e.currentTarget)
        window.location = '/dataset/' + e.currentTarget
      }
    }

    var isInTableBody = function (elem) {
      return $(elem).parents('tbody').length > 0
    }

    return {
      init: init
    }
  })()

  $(function () {
    DataSetEditor.init()
  })

  export default {
    components: {
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.error = this.post = null
        this.loading = true
        getPost(this.$route.params.id, (err, dataset) => {
          this.loading = false
          if (err) {
            this.error = err.toString()
          } else {
            this.dataset = dataset
          }
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
