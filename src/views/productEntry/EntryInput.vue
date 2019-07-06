<template>
  <md-content class="entry-input">
    <div class="entry-input__title">
      <h1 class="md-title">产品录入</h1>
      <md-button v-if="inputMethod !== 'none'" class="md-primary" @click="inputMethod='none'">
        <md-icon>undo</md-icon>
      </md-button>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="inputMethod==='none'" class="entry-input__types">
        <md-button class="md-raised md-primary" @click="inputMethod='manual'">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">手动录入</md-tooltip>
        </md-button>
        <md-button class="md-raised md-accent" @click="inputMethod='file'">
          <md-icon>attach_file</md-icon>
          <md-tooltip md-direction="bottom">文件导入</md-tooltip>
        </md-button>
      </div>
      <div v-else-if="inputMethod==='manual'" class="entry-input__manual">
        <!--      标题again-->
        <div class="entry-input__title">
          <h2 class="md-title">输入产品信息</h2>
        </div>
        <div class="entry-input__manual__form">
          <!--        主体(固有)信息-->
          <div class="entry-input__manual__form__half">
            <md-field>
              <label>产品名称</label>
              <md-input v-model="product.name"></md-input>
            </md-field>
            <md-field>
              <label for="catalog">产品类型</label>
              <md-select v-model="product.catalog" name="catalog" id="catalog">
                <md-optgroup label="金融类">
                  <md-option v-for="(catalog, index) in catalogs.financial" :key="index+'f'" :value="catalog">
                    {{catalog}}
                  </md-option>
                </md-optgroup>
                <md-optgroup label="服务类">
                  <md-option v-for="(catalog, index) in catalogs.service" :key="index+'s'" :value="catalog">
                    {{catalog}}
                  </md-option>
                </md-optgroup>
              </md-select>
            </md-field>
            <md-field>
              <label>对产品的介绍</label>
              <md-textarea v-model="product.intro" md-counter="200"></md-textarea>
            </md-field>
          </div>
          <!--        附加信息-->
          <div class="entry-input__manual__form__half"></div>
        </div>
        <div class="entry-input__manual__submit">
          <md-button class="md-primary md-raised" @click="submitProduct">提交产品</md-button>
        </div>
      </div>
      <div v-else class="entry-input__file">
        <div class="entry-input__file__operation">
          <md-field>
            <label>选择文件</label>
            <md-file v-model="fileName" @md-change="handleFileSelected($event)"></md-file>
          </md-field>
          <p v-if="fileName!==''">文件已加载, 准备发射</p>
          <md-button class="md-primary md-raised" @click="uploadFile">导入</md-button>
        </div>
        <div class="entry-input__file__preview"></div>
      </div>
    </transition>
    <div class="entry-input__title">
      <h1 class="md-title">我录入的产品</h1>
    </div>
  </md-content>
</template>

<script>
  import Vue from 'vue'

  import {
    MdAvatar,
    MdButton,
    MdField,
    MdIcon,
    MdRipple,
    MdTooltip,
    MdSubheader
  } from 'vue-material/dist/components'

  import apis from '@/apis/apis.js'

  Vue.use(MdButton)
  Vue.use(MdAvatar)
  Vue.use(MdRipple)
  Vue.use(MdIcon)
  Vue.use(MdTooltip)
  Vue.use(MdField)
  Vue.use(MdSubheader)

  export default {
    name: 'EntryInput',
    data() {
      return {
        inputMethod: 'none',// none, manual, file
        fileName: '',
        catalogs: {
          'financial': [
            '证券理财',
            '私募基金',
            '公募基金',
            '银行理财',
            '信托产品',
            '债券产品',
            '保险产品'],
          'service': [
            '咨询类产品',
            '投研类产品',
            '服务类产品',]
        },
        product: {
          name: '',
          catalog: '',
          intro: ''
        },
        options: [],
        importedFile: null
      }
    },
    mounted() {

    },
    methods: {
      goToPreselect() {
        this.$router.push('/main/entry/lib')
      },
      submitProduct() {
        apis.products.addOne({
          data: {
            productName: this.product.name,
            catalog: this.product.catalog,
            productIntro: this.product.intro,
            // todo: 做好风险等级的选择, 否则只能默认低风险
            riskRank: 1
          }
        }, () => {
          this.$snackbar({
            message: '录入成功'
          })
          this.$router.push('/main/entry/input')
        })
      },
      handleFileSelected(e) {
        this.importedFile = e[0]
      },
      uploadFile() {
        apis.products.addFile({file: this.importedFile}, () => {
          this.$snackbar({
            message: '导入成功'
          })
          this.$router.push('/main/entry/input')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-tooltip {
    font-size: 15px;
  }

  .entry-input {
    width: 1200px;
    margin: 20px auto;
    box-sizing: border-box;
    padding: 35px;

    .entry-input__title {
      display: flex;
      justify-content: space-between;
      border-bottom: solid 1px #b7b7b7;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 25px;
      }

      h2 {
        font-size: 20px;
      }
    }

    .entry-input__types {
      display: flex;
      justify-content: center;

      .md-button {
        height: 100px;
        width: 100px;
        border-radius: 100%;

        .md-icon {
          font-size: 60px !important;
        }
      }

      .md-button:first-child {
        margin-right: 200px;
      }
    }

    .entry-input__manual {
      margin-bottom: 50px;

      .entry-input__manual__form {
        display: flex;

        .entry-input__manual__form__half {
          width: 49%;
          box-sizing: border-box;
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);

          &:first-child {
            margin-right: 2%;
          }
        }
      }

      .entry-input__manual__submit {
        display: flex;
        justify-content: center;
        margin-top: 20px;

        .md-button {
          width: 300px;
          height: 50px;
          font-size: 25px;
        }
      }
    }

    .entry-input__file {
      margin-bottom: 50px;

      .entry-input__file__operation {
        box-sizing: border-box;
        padding: 10px;
        width: 300px;
        height: 200px;
        border-radius: 20px;
        border: dashed 1px #b7b7b7;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
      }

      .entry-input__file__preview {
      }

    }
  }
</style>