<template>
  <md-content class="staff-analysis">
    <md-content class="staff-analysis__header">
      <h1 class="md-title">职员数据</h1>
    </md-content>
    <div class="staff-analysis__chart">
      <div class="staff-analysis__chart__figure" id="staff-analysis-chart"></div>
      <div class="staff-analysis__chart__table">
        <md-table v-model="table" md-sort="name" md-card>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="职员类型">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="职员人数">{{ item.value }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
  </md-content>
</template>

<script>
  import Vue from 'vue'
  import apis from '@/apis/apis.js'
  import echarts from 'echarts'
  import {MdTable} from 'vue-material/dist/components'

  Vue.use(MdTable)

  export default {
    name: 'StaffAnalysis',
    data() {
      return {
        table: []
      }
    },
    mounted() {
      let amount = echarts.init(document.getElementById('staff-analysis-chart'))
      apis.statistics.getStaff((res) => {
        // 修改后端返回数据以供前端渲染
        let staff = []
        for (let type in res.data) {
          if (res.data.hasOwnProperty(type)) {
            let name = ''
            let parsedInt = parseInt(type)
            switch (parsedInt) {
              case 0:
                name = '无岗位'
                break
              case 1:
                name = '系统管理员'
                break
              case 2:
                name = '供应商管理岗'
                break
              case 3:
                name = '产品录入岗'
                break
              case 4:
                name = '产品审核岗'
                break
              case 5:
                name = '产品配置岗'
                break
              default:
                name = '未知'
            }
            staff.push({
              value: parseInt(res.data[type]),
              name: name
            })
          }
        }
        this.table = staff
        let staffValues = staff.map(obj => {
          return obj.value
        })
        amount.setOption({
          title: {
            text: '职员类型分布',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#123456'
            }
          },

          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },

          visualMap: {
            show: false,
            min: Math.min(...staffValues) * 0.5,
            max: Math.max(...staffValues) * 1.5,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series: [
            {
              name: '职员类型人数',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: staff.sort(function (a, b) {
                return a.value - b.value
              }),
              roseType: 'radius',
              label: {
                normal: {
                  textStyle: {
                    color: '#123456'
                  }
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: '#123456'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
                }
              },
              itemStyle: {
                normal: {
                  color: '#123456'
                }
              },

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200
              }
            }
          ]
        })
      })
    }
  }
</script>

<style lang="scss" scoped>
  .staff-analysis {
    width: 1200px;
    margin: 20px auto;
    box-sizing: border-box;
    padding: 0 50px;

    .staff-analysis__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .md-field {
        width: 200px;
      }
    }

    .staff-analysis__chart {
      display: flex;
      width: 100%;
      height: 500px;

      .staff-analysis__chart__figure {
        width: 50%;
      }

      .staff-analysis__chart__table {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        .md-table {
          width: 100%;
        }
      }
    }
  }
</style>