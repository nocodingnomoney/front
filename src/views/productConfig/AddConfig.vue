<template>
  <!--  标准库中可供配置的产品-->
  <div class="add-config">
    <md-table v-model="products" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">标准库-可配置产品</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-numeric>{{ item.productID }}</md-table-cell>
        <md-table-cell md-label="名称" md-sort-by="name">{{ item.productName }}</md-table-cell>
        <md-table-cell md-label="介绍" md-sort-by="email">{{ item.productIntro }}</md-table-cell>
        <md-table-cell md-label="种类" md-sort-by="gender">{{ item.catalog }}</md-table-cell>
        <md-table-cell md-label="风险等级" md-sort-by="title">{{ item.riskRank }}</md-table-cell>
        <md-table-cell md-label="配置">
          <md-menu md-size="big" md-direction="top-start">
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
        <md-table-cell md-label="添加">
          <md-button @click="addConfig(item)">
            <md-icon>edit</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell md-label="确认">
          <md-button class="md-primary md-raised" @click="confirmConfig(item.productID)" :disabled="!item.modified">
            确认提交配置
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-dialog class="config-editor" :md-active.sync="showConfigEditor">
      <md-dialog-title>添加配置: {{editingProduct.productName}}</md-dialog-title>

      <md-content class="md-scrollbar config-editor__items">
        <div class="config-editor__item" v-for="(config, index) in editingProduct.configs" :key="index">
          <md-field>
            <label>名称</label>
            <md-input v-model="config.configName"></md-input>
          </md-field>
          <md-field>
            <label>简介</label>
            <md-input v-model="config.configIntro"></md-input>
          </md-field>
          <md-button class="md-primary md-accent" @click="deleteItem(index)">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
        <md-button class="md-primary" @click="addItem">
          <md-icon>add</md-icon>
        </md-button>
      </md-content>


      <md-dialog-actions>
        <md-button class="md-primary" @click="showConfigEditor = false">取消</md-button>
        <md-button class="md-primary" @click="confirmConfig">确定</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {MdTable, MdMenu, MdButton, MdIcon, MdField, MdContent} from 'vue-material/dist/components'
  import apis from '@/apis/apis.js'

  Vue.use(MdTable)
  Vue.use(MdMenu)
  Vue.use(MdButton)
  Vue.use(MdIcon)
  Vue.use(MdField)
  Vue.use(MdContent)

  export default {
    name: 'AddConfig',
    data() {
      return {
        editingProduct: {},
        showConfigEditor: false,
        products: []
      }
    },
    mounted() {
      /**
       * @Description: 获取可配置的标准库产品, 同时给每个产品加上修改位, 用以判断是否有添加配置
       * @return:  Array
       * @Author: littlebugyang
       * @Date: 2019/7/3
       */
      apis.products.libraries.getStandard((res) => {
        this.products = res.data.map((product) => {
          return Object.assign(product, {modified: false})
        })
      })
    },
    methods: {
      addConfig(product) {
        this.showConfigEditor = true
        this.editingProduct = product
      },
      confirmConfig() {
        for (let i = 0; i < this.products.length; ++i) {
          if (this.products[i].productID === this.editingProduct.productID) {
            this.products[i].modified = true
            this.showConfigEditor = false
            break
          }
        }
      },
      submitConfigs() {
      },
      addItem() {
        let configs = this.editingProduct.configs
        configs.push({
          configName: '',
          configIntro: ''
        })
        this.editingProduct.configs = configs
      },
      deleteItem(index) {
        let configs = this.editingProduct.configs
        configs.splice(index, 1)
        this.editingProduct.configs = configs
      }
    }
  }
</script>

<style lang="scss" scoped>
  .add-config {
    width: 1200px;
    margin: 20px auto;
    background: white;
  }

  .config-editor {
    padding: 30px;
    box-sizing: border-box;


    .config-editor__items {
      box-sizing: border-box;
      width: 100%;
      max-height: 100%;
      padding: 20px;
      overflow: auto;

      .config-editor__item {
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: dashed 1px #b7b7b7;

        .md-field {

          &:first-child {
            margin-right: 20px;
          }
        }
      }

      .md-button {
        width: 100%;
      }
    }
  }
</style>