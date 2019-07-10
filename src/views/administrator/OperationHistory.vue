<template>
  <md-content class="operation-history">
    <md-table v-model="operations" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">操作历史</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="过程">{{ item.process }}</md-table-cell>
        <md-table-cell md-label="产品名称">{{ item.product.productName }}</md-table-cell>
        <md-table-cell md-label="产品介绍">{{ item.product.productIntro }}</md-table-cell>
        <md-table-cell md-label="产品种类">{{ item.product.catalog }}</md-table-cell>
        <md-table-cell md-label="风险等级">{{ item.product.riskRank === 2 ? '高' : '低' }}</md-table-cell>
        <md-table-cell md-label="产品所在库">
          <span v-if="item.store === 1">预选库</span>
          <span v-else-if="item.store === 2">标准库</span>
          <span v-else>配置库</span>
        </md-table-cell>
        <md-table-cell md-label="操作时间">N/A</md-table-cell>
      </md-table-row>
    </md-table>
  </md-content>
</template>

<script>
  import Vue from 'vue'
  import {MdContent, MdTable} from 'vue-material/dist/components'
  import apis from '@/apis/apis.js'

  Vue.use(MdContent)
  Vue.use(MdTable)

  export default {
    name: 'OperationHistory',
    components: {},
    data() {
      return {
        operations: []
      }
    },
    mounted() {
      apis.admin.getOperation((res) => {
        this.operations = res.data
      })
    }
  }
</script>
<style lang="scss" scoped>

  .operation-history {
    width: 1200px;
    margin: 20px auto;

    .md-table {
      width: 100%;
      margin: 0 auto;
    }
  }
</style>