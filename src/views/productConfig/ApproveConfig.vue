<template>
  <!--  待审批的产品配置在这里-->
  <div class="approve-config">
    <md-table v-model="products" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">待审批配置</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-numeric>{{ item.productID }}</md-table-cell>
        <md-table-cell md-label="名称" md-sort-by="name">{{ item.productName }}</md-table-cell>
        <md-table-cell md-label="介绍" md-sort-by="email">{{ item.productIntro }}</md-table-cell>
        <md-table-cell md-label="种类" md-sort-by="gender">{{ item.catalog }}</md-table-cell>
        <md-table-cell md-label="风险等级" md-sort-by="title">{{ item.riskRank }}</md-table-cell>
        <md-table-cell md-label="配置">
          <config-menu v-if="item.configs" :configs="item.configs"></config-menu>
        </md-table-cell>
        <md-table-cell md-label="操作">
          <md-button class="md-primary md-raised" @click="approveConfig(item.productID)" :disabled="item.approved">
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
  import ConfigMenu from '@/components/ConfigMenu'


  Vue.use(MdTable)
  Vue.use(MdMenu)
  Vue.use(MdButton)
  Vue.use(MdIcon)

  export default {
    name: 'ApproveConfig',
    data() {
      return {
        products: []
      }
    },
    components: {
      ConfigMenu
    },
    mounted() {
      /**
       * @Description: 获取正在配置审核阶段的产品
       * @return:  Array
       * @Author: littlebugyang
       * @Date: 2019/7/6
       */
      apis.products.configs.configuring((res) => {
        this.products = res.data.map((product) => {
          return Object.assign(product, {approved: false})
        })
      })
    },
    methods: {
      /**
       * @Description: 提交审核产品的请求, 并且在审核成功后向用户提示
       * @Param:  id
       * @return: Unknown
       * @Author: littlebugyang
       * @Date: 2019/7/6
       */
      approveConfig(id) {
        apis.products.configs.approve(id, () => {
          for (let i = 0; i < this.products.length; ++i) {
            if (this.products[i].productID === id) {
              let tempProducts = this.products
              tempProducts[i].approved = true
              break
            }
          }
          this.$snackbar({message: '通过配置审批成功'})
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .approve-config {
    width: 1200px;
    margin: 20px auto;

    .md-table {
      width: 100%;
      margin: 0 auto;
    }
  }
</style>