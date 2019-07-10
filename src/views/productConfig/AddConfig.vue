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
          <config-menu v-if="item.configs" :configs="item.configs"></config-menu>
        </md-table-cell>
        <md-table-cell md-label="添加">
          <md-button @click="addConfig(item)">
            <md-icon>edit</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell md-label="确认">
          <md-button class="md-primary md-raised" @click="submitConfigs(item.productID)" :disabled="!item.modified">
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
        <md-button class="md-primary" @click="confirmConfigs">确定</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {MdTable, MdMenu, MdButton, MdIcon, MdField, MdContent} from 'vue-material/dist/components'
  import apis from '@/apis/apis.js'
  import ConfigMenu from '@/components/ConfigMenu'

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
    components: {
      ConfigMenu
    },
    mounted() {
      /**
       * @Description: 获取可配置的标准库产品, 同时给每个产品加上修改位, 用以判断是否有添加配置
       * @return:  Array
       * @Author: littlebugyang
       * @Date: 2019/7/3
       */
      apis.products.configs.getAvailable((res) => {
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
      confirmConfigs() {
        for (let i = 0; i < this.products.length; ++i) {
          if (this.products[i].productID === this.editingProduct.productID) {
            this.products[i].modified = true
            this.showConfigEditor = false
            break
          }
        }
      },
      submitConfigs(productId) {
        let targetProduct = null
        let targetIndex = 0
        for (let i = 0; i < this.products.length; ++i) {
          if (this.products[i].productID === productId) {
            targetProduct = this.products[i]
            targetIndex = i
            break
          }
        }
        let configsToSend = []
        for (let i = 0; i < targetProduct.configs.length; ++i) {
          let tempConfig = {
            productID: targetProduct.productID,
            configName: targetProduct.configs[i].configName,
            configIntro: targetProduct.configs[i].configIntro
          }
          if (targetProduct.configs[i].configID && targetProduct.configs[i].configID != 0) {
            tempConfig.configID = targetProduct.configs[i].configID
          }
          configsToSend.push(tempConfig)
        }
        // eslint-disable-next-line
        console.log(configsToSend, 'hello world')
        apis.products.configs.add({
          data: configsToSend
        }, (res) => {
          // eslint-disable-next-line
          console.log(res)
          this.$snackbar({
            message: '提交修改配置成功'
          })
          this.products[targetIndex].modified = false
        })
      },

      /**
       * @Description: 和下面的deleteItem, 都是用于在配置编辑器框中的方法
       * @Author: littlebugyang
       * @Date: 2019/7/5
       */
      addItem() {
        let configs = this.editingProduct.configs
        if (!configs) {
          configs = []
        }
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

  .md-table {
    width: 100%;
    margin: 0 auto;
  }

  .configs {
    box-sizing: border-box;
    padding: 0 20px;

    .config {
      border-bottom: solid 1px #bfbfbf;
    }
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