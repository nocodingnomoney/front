<template>
  <md-content class="catalog-analysis">
    <md-content class="catalog-analysis__header">
      <h1 class="md-title">产品类别销量</h1>
      <md-field>
        <md-select v-model="type" name="type" id="type" @md-selected="handleSelected">
          <md-option value="normal">普通</md-option>
          <md-option value="withRisk">考虑风险</md-option>
        </md-select>
      </md-field>
    </md-content>
    <div class="chart" id="catalog-analysis-chart"></div>
  </md-content>
</template>

<script>
  import apis from '@/apis/apis.js'
  import echarts from 'echarts'

  let chart = null

  export default {
    name: 'CatalogAnalysis',
    data() {
      return {
        type: 'normal',
        options: {
          'normal': {
            title: {
              text: '产品销量(按类别)'
            },
            xAxis: {
              data: [],
              axisTick: {
                show: false
              },
              axisLine: {
                show: false
              },
              z: 10
            },
            yAxis: {
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: '#999'
                }
              }
            },
            dataZoom: [
              {
                type: 'inside'
              }
            ],
            series: [
              { // For shadow
                type: 'bar',
                itemStyle: {
                  normal: {color: 'rgba(0,0,0,0.05)'}
                },
                barGap: '-100%',
                barCategoryGap: '40%',
                data: [],
                animation: false
              },
              {
                type: 'bar',
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        {offset: 0, color: '#83bff6'},
                        {offset: 0.5, color: '#188df0'},
                        {offset: 1, color: '#188df0'}
                      ]
                    )
                  },
                  emphasis: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        {offset: 0, color: '#2378f7'},
                        {offset: 0.7, color: '#2378f7'},
                        {offset: 1, color: '#83bff6'}
                      ]
                    )
                  }
                },
                data: []
              }
            ]
          },
          'withRisk':
            {
              title: {text: '产品销量(按风险及类别)'},
              tooltip: {
                trigger: 'axis',
                axisPointer:
                  {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
              }
              ,
              legend: {
                data: ['低风险产品', '高风险产品']
              }
              ,
              grid: {
                left: '3%',
                right:
                  '4%',
                bottom:
                  '3%',
                containLabel:
                  true
              }
              ,
              yAxis: {
                type: 'value'
              }
              ,
              xAxis: {
                type: 'category',
                data: '' // catalogs
              }
              ,
              series: [
                {
                  name: '低风险产品',
                  type: 'bar',
                  stack: '总量',
                  label: {
                    normal: {
                      show: true,
                      position: 'insideRight'
                    }
                  },
                  data: '' // lowRisk
                },
                {
                  name: '高风险产品',
                  type: 'bar',
                  stack: '总量',
                  label: {
                    normal: {
                      show: true,
                      position: 'insideRight'
                    }
                  },
                  data: '' // highRisk
                }
              ]
            }
        }
      }
    },
    mounted() {
      chart = echarts.init(document.getElementById('catalog-analysis-chart'))
      apis.statistics.getSalesNormal((res) => {
        let dataShadow = []
        const sales = res.data[1].filter((sale) => {
          return parseInt(sale)
        })
        let maximum = Math.max(...sales)
        for (let i = 0; i < sales.length; ++i) {
          dataShadow.push(maximum)
        }
        this.options.normal.xAxis.data = res.data[0]
        this.options.normal.series[0].data = dataShadow
        this.options.normal.series[1].data = res.data[1]
        chart.setOption(this.options.normal)
      })
      apis.statistics.getSalesWithRisks((res) => {
        // 解析数据为可用于 option 中的
        let catalogs = []
        let lowRisk = []
        let highRisk = []
        let lastCatalog = null
        for (let i = 0; i < res.data.length; ++i) {
          let catalog = res.data[i]
          if (!lastCatalog || catalog[0] !== lastCatalog[0]) {
            // 这是个全新处理的类别
            catalogs.push(catalog[0])

            if (lastCatalog && parseInt(lastCatalog[1]) === 1) {
              // 上个类别只有低风险产品, 没有高风险产品
              highRisk.push(0)
            }
            if (parseInt(catalog[1]) === 1) {
              // 现在是该类别低风险产品销量
              lowRisk.push(parseInt(catalog[2]))
            } else {
              // 这个类别只有高风险, 没有低风险产品
              highRisk.push(parseInt(catalog[2]))
              lowRisk.push(0)
            }
          } else {
            // 如果与上个类别同样, 则风险一定为2(数据库读取出来已排序)
            highRisk.push(parseInt(catalog[2]))
          }
          lastCatalog = catalog
        }
        this.options.withRisk.xAxis.data = catalogs
        this.options.withRisk.series[0].data = lowRisk
        this.options.withRisk.series[1].data = highRisk
      })
    },
    methods: {
      handleSelected(type) {
        chart = echarts.init(document.getElementById('catalog-analysis-chart'))
        chart.clear()
        chart = echarts.init(document.getElementById('catalog-analysis-chart'))
        chart.setOption(this.options[type])
      }
    }
  }
</script>

<style lang="scss" scoped>
  .catalog-analysis {
    width: 1200px;
    margin: 20px auto;
    box-sizing: border-box;
    padding: 0 50px;

    .catalog-analysis__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .md-field {
        width: 200px;
      }
    }

    .chart {
      width: 800px;
      height: 500px;
      margin: 50px auto;
    }
  }
</style>