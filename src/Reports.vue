<!--
Dataset list view
List all datasets from API
Search for a dataset (all keys)
Click dataset to open
Add new dataset
-->
<template>
  <main>
    <div class="container">
      <div class="pull-right" style="margin-top:15px;">
      </div>
      <h1>Reports</h1>
      <h3>Published datasets</h3>
      <div class="alert alert-warning text-center">
        <p>This is an idea of what could be shown on the reports page. Please <a href="mailto:fsa-support@epimorphics.com">send feedback</a> with ideas of what you'd like to see here.</p>
      </div>
      <chart :options="pubGraph" ref="pie"></chart>

      <div class="row">

        <h3>Keyword usage</h3>
        <div class="col-sm-12" id="wrapper">
          <grid
            :data="keywordTableData"
            :columns="headers"
            :rowsPerPage="10000"
            :filter-key="searchQuery"
            :isLoading="loading">
          </grid>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import { getDatasets } from './Api'
  import _ from 'lodash'

  export default {
    data () {
      return {
        keywordTableData: [],
        headers: [
          {
            title: 'title',
            path: 'name'
          },
          {
            title: 'count',
            path: 'count'
          }
        ],
        pubGraph: {
          title: {
            text: 'Published vs Draft',
            subtext: 'datasets',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Published', 'Draft']
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {value: 0, name: 'Published'},
                {value: 1, name: 'Draft'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },
    created: function () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        getDatasets({}).then((datasets) => {
          this.loading = false
          // Process data first
          this.processPub(datasets)
          this.processkeywords(datasets)
        }, (e) => {
          console.log('couldn\'t load datasets', e)
        })
      },
      processPub (datasets) {
        let publishedTotal = _.reduce(datasets, function (sum, n) {
          return sum + (n.published ? 1 : 0)
        }, 0)

        let unpublishedTotal = datasets.length - publishedTotal

        this.updatePub({pub: publishedTotal, unpub: unpublishedTotal})
      },
      processkeywords (datasets) {
        // Merge all keywords in to one large array
        let allKeywords = _.reduce(datasets, function (sum, el) {
          return sum.concat(el.keyword)
        }, [])

        // Count occurance of all keywords
        let counts = {}
        for (var i = 0; i < allKeywords.length; i++) {
          var num = allKeywords[i]
          if (!counts[num]) {
            counts[num] = {}
          }
          counts[num].count = counts[num].count ? counts[num].count + 1 : 1
          counts[num].name = num
        }

        this.updateKeywordData(counts, allKeywords)
      },
      updatePub (asyncData) {
        if (this.$refs.pie) {
          this.$refs.pie.mergeOptions({
            series: [{
              data: [
                {value: asyncData.pub, name: 'Published'},
                {value: asyncData.unpub, name: 'Draft'}
              ]
            }]
          })
        }
      },
      // eslint-disable-next-line no-unused-vars
      updateKeywordData (asyncData, keywords) {
        // eslint-disable-next-line no-unused-vars
        let k = _.map(asyncData, function (k, v, e) {
          return k
        })
        this.keywordTableData = k
      }
    }
  }
</script>

<style lang='scss' scoped>
.ct-chart{
  height: 300px;
}
</style>
