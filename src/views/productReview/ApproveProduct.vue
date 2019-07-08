<template>
  <!--  入库审批, 对应风险级别较低的产品或者经过评估的产品会出现在这里-->
  <div class="approve-product">
    <md-table v-model="products" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">待审批产品</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-numeric>{{ item.productID }}</md-table-cell>
        <md-table-cell md-label="名称" md-sort-by="name">{{ item.productName }}</md-table-cell>
        <md-table-cell md-label="介绍" md-sort-by="email">{{ item.productIntro }}</md-table-cell>
        <md-table-cell md-label="种类" md-sort-by="gender">{{ item.catalog }}</md-table-cell>
        <md-table-cell md-label="风险等级" md-sort-by="title">{{ item.riskRank }}</md-table-cell>
        <md-table-cell md-label="配置">
          <md-menu v-if="item.configs" md-size="big" md-direction="top-start">
            <md-button class="md-icon-button" md-menu-trigger>
              <md-icon>apps</md-icon>
            </md-button>

            <md-menu-content>
              <div class="configs">
                <div v-for="(config, index) in item.configs" :key="index">
                  <div class="config__name">配置名称: {{config.configName}}</div>
                  <div class="config__value">配置介绍: {{config.configIntro}}</div>
                </div>
              </div>
            </md-menu-content>
          </md-menu>
        </md-table-cell>
        <md-table-cell md-label="操作">
          <md-button class="md-primary md-raised" @click="approvePassed(item.productID)" :disabled="item.approved">
            {{item.approved ? '已审批' : '通过审批'}}
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {MdTable, MdMenu, MdButton, MdIcon} from 'vue-material/dist/components'
  import apis from '@/apis/apis.js'

  Vue.use(MdTable)
  Vue.use(MdMenu)
  Vue.use(MdButton)
  Vue.use(MdIcon)

  export default {
    name: 'ApproveProduct',
    data: () => ({
      products: []
    }),
    mounted() {
      apis.products.approve.getAll({}, (res) => {
        this.products = res.data.map((product) => {
          return Object.assign(product, {approved: false})
        })
      })
    },
    methods: {
      approvePassed(id) {
        apis.products.approve.pass(id, () => {
          for (let i = 0; i < this.products.length; ++i) {
            if (this.products[i].productID === id) {
              let tempProducts = this.products
              tempProducts[i].approved = true
              break
            }
          }
          this.$snackbar({message: '通过产品审批成功'})
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .approve-product {
    width: 1200px;
    margin: 20px auto;
    background: white;

    .md-table {
      width: 100%;
      margin: 0 auto;
    }
  }
</style>