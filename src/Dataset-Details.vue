<template>
  <div id="details">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <nav class="navbar navbar-default">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">
            <img src="assets/img/logo.png" alt="Food Standards Agency" height="50"/>
          </a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><h2>Dataset catalogue</h2></li>

            <li class="active"><a href="dataset-editor-list.html">Home <span class="sr-only">(current)</span></a></li>
            <li><a href="#">Reports</a></li>
            <li><a href="#">Admin</a></li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>

    <main>
      <div class="container">
        <form>
          <div class="pull-right">
            <a href="dataset-editor-list.html" class="btn btn-danger">Cancel</a>
            <a href="dataset-editor-list.html" class="btn btn-success">Save</a>
          </div>
          <div class="form-group" style="clear:right;">
            <label for="title">Title</label>
            <input type="text" class="form-control input-lg" id="text" placeholder="" value="Register of Gifts and Hospitality">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Description</label>
            <textarea class="form-control" rows="4">A quarterly-update of the gifts and hospitality received and registered by Food Standards Agency Board members and Directors</textarea>
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
            <label for="assets">Assets</label>
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
              <input type="radio" name="inlineRadioOptions" id="inlineRadio1" class="input-lg" checked value="option1">
            </label>
            <label class="radio">
              <label class="control-label col-sm-2" for="inlineRadio2">Draft</label>
              <input type="radio" name="inlineRadioOptions" id="inlineRadio2" class="input-lg" value="option2">
            </label>
          </div>
        </form>
        <form>
          <div class="form-group">
            <label for="tags">Tags</label>
            <input type="text" value="registered,gifts,hospitality" id="tags" />
          </div>
          <div class="form-group">
            <label for="owner">Owner</label>
            <input type="text" class="form-control input-lg" id="owner" placeholder="">
          </div>
          <div class="form-group">
            <label for="title">Notes</label>
            <textarea class="form-control input-lg" rows="2"></textarea>
          </div>
        </form>
    </main>

    <footer>
      <div class="container">
        For help and support, please contact <a href="mailto:support@epimorphics.com">Epimorphics Ltd</a>
      </div>
    </footer>

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> -->

            <div class="pull-right">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-success">Save</button>
            </div>

            <h4 class="modal-title" id="myModalLabel">Asset editor</h4>


          </div>

          <div class="modal-body">
            <div>
              <form>
                <!-- <div class="pull-right">
                  <button type="submit" class="btn btn-danger">Cancel</button>
                  <button type="submit" class="btn btn-success">Save</button>
                </div> -->
                <div class="form-group" style="clear:left">
                  <label for="title">Title</label>
                  <input type="text" class="form-control" value="FSA Board and directors registered gifts and hospitality 2012-2013" id="text" placeholder="">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Description</label>
                  <textarea class="form-control" rows="3">FSA Board and directors registered gifts and hospitality 2012-2013</textarea>
                </div>
                <div class="form-group">
                  <label for="csv" class="col-sm-2 form-label">HTML</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="csv" placeholder="http://">
                  </div>
                </div>
                <div class="form-group">
                  <label for="csv" class="col-sm-2 form-label">JSON</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="csv" placeholder="http://">
                  </div>
                </div>
                <div class="form-group">
                  <label for="csv" class="col-sm-2 form-label">XML</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="csv" placeholder="http://">
                  </div>
                </div>
                <div class="form-group">
                  <label for="csv" class="col-sm-2 form-label">CSV</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="csv" placeholder="http://" value="http://www.food.gov.uk/sites/default/files/csv/fsa-board-directors-gifts-hosp-2014-15q1.csv">
                  </div>
                </div>
                <div class="form-group">
                  <label for="startdate">Start Date</label>
                  <input type="date" class="form-control" id="startdate" placeholder="startDate" value="2012-04-01">
                </div>
                <div class="form-group">
                  <label for="startdate">End Date</label>
                  <input type="date" class="form-control" id="startdate" placeholder="startDate" value="2013-03-31">
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import 'bootstrap'
  import 'bootstrap-tagsinput'
  import 'datatables.net/js/jquery.dataTables.js'
  import 'datatables.net-bs/js/dataTables.bootstrap.js'

  // import Bloodhound from 'bloodhound'
/* global confirm */
// <!-- ''
// <!-- 'js/typeahead.js'
// <!-- Include all compiled plugins (below), or include individual files as needed -->
// <!--
  $(document).ready(function () {
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
  })

  export default {}
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
