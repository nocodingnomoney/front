<template>
  <div class="productHouse">
    <md-table v-model="products" md-card>
      <md-table-toolbar>
        <h1 class="md-title">产品库</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-numeric>{{ item.productID }}</md-table-cell>
        <md-table-cell md-label="名称">{{ item.productName }}</md-table-cell>
        <!-- <md-table-cell md-label="介绍">{{ item.productIntro }}</md-table-cell> -->
        <md-table-cell md-label="库编号">{{item.storeID}}</md-table-cell>
        <md-table-cell md-label="流程编号">{{item.processID}}</md-table-cell>
        <md-table-cell md-label="种类">{{ item.catalog }}</md-table-cell>
        <md-table-cell md-label="风险等级">{{ item.riskRank }}</md-table-cell>
        <md-table-cell md-label="配置">
          <config-menu v-if="item.configs" :configs="item.configs"></config-menu>
        </md-table-cell>
        <md-table-cell md-label="销量">{{ item.sales }}</md-table-cell>
        <md-table-cell>
          <md-button @click="handleDelete(item.productID)">
            <md-icon>delete_outline</md-icon>
            <md-tooltip md-direction="top">删除该产品</md-tooltip>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <!--删除对话框 -->
    <md-dialog class="deleteDialog" :md-active.sync="showDeleteDialog">
      <md-dialog-title>删除产品</md-dialog-title>
      <p class="verify">确认删除ID为{{currentProductId}}的产品</p>
      <md-dialog-actions>
        <md-button class="md-primary" @click="verifyDelete()">确认</md-button>
        <md-button class="md-primary" @click="showDeleteDialog = false">取消</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  //名称 介绍 种类 风险等级 配置 销量 删除
  import Vue from 'vue'
  import {
    MdTable,
    MdMenu,
    MdButton,
    MdIcon,
    MdTooltip
  } from 'vue-material/dist/components'
  import apis from '@/apis/apis.js'
  import ConfigMenu from '@/components/ConfigMenu'

  Vue.use(MdTable)
  Vue.use(MdMenu)
  Vue.use(MdButton)
  Vue.use(MdIcon)
  Vue.use(MdTooltip)
  export default {
    name: 'ProductHouse',
    components: {
      ConfigMenu
    },
    data() {
      return {
        products: [],

        showDeleteDialog: false,
        currentProductId: null
      }
    },
    mounted() {
      //初始化表格
      this.fetchAllProduct()
    },

    methods: {
      fetchAllProduct: function () {
        apis.getAllProduct(
          {
            method: 'GET',
            url: `/products`
          },
          res => {
            var list = res.data
            this.products = list
          },
          () => {
          }
        )
      },

      deleteOneProduct: function () {
        apis.deleteOneProduct(
          {
            method: 'GET',
            url: `manage/delete/product/${this.currentProductId}`
          },
          () => {
            this.$snackbar({
              message: '删除成功'
            })
            this.fetchAllProduct()
          },
          () => {
          }
        )
      },

      handleDelete: function (id) {
        this.showDeleteDialog = true
        this.currentProductId = id
      },

      verifyDelete: function () {
        this.deleteOneProduct()
        this.showDeleteDialog = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .config-library {
    width: 1200px;
    margin: 20px auto;
    background: white;

    .md-table {
      width: 100%;
      margin: 0 auto;
    }
  }
</style>