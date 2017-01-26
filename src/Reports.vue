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
      <p class="text-muted">One</p>
      <chart :options="pubGraph" ref="pie"></chart>
      <chart :options="keywordGraph" ref="bar"></chart>
    </div>
  </main>
</template>

<script>
  import { getDatasets } from './Api'
  import _ from 'lodash'

  export default {
    data () {
      return {
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
        },
        keywordGraph: {
          title: {
            text: 'Keywords',
            subtext: 'usage',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['Usage']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 1]
          },
          yAxis: {
            type: 'category',
            data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
          },
          series: [
            {
              name: 'Usage',
              type: 'bar',
              data: [18203, 23489, 29034, 104970, 131744, 630230]
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
          counts[num] = counts[num] ? counts[num] + 1 : 1
        }

        this.updateKeywordData(counts, allKeywords)
      },
      updatePub (asyncData) {
        this.$refs.pie.mergeOptions({
          series: [{
            data: [
              {value: asyncData.pub, name: 'Published'},
              {value: asyncData.unpub, name: 'Draft'}
            ]
          }]
        })
      },
      updateKeywordData (asyncData, keywords) {
        let k = _.map(asyncData, function (k, v, e) {
          return k
        })

        this.$refs.bar.mergeOptions({
          yAxis: {
            type: 'category',
            data: keywords
          },
          series: [{
            name: 'Usage',
            type: 'bar',
            data: k
          }]
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
.ct-chart{
  height: 300px;
}
</style>
