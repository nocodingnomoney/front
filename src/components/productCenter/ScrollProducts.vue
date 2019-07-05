<template>
  <div>
    <!--    offset的值跟产品导航栏的高度一致, 为了顶部留白, 加了15px-->
    <scrollactive
            class="scrollactive-btns"
            active-class="active"
            :offset="80"
            :duration="800"
            bezier-easing-value=".5,0,.35,1"
    >
      <a class="scrollactive-item scrollactive-btn" :class="{'scrollactive-btn_selected': index == selectedCatalog}"
         v-for="(catalog, index) in catalogs" :key="index"
         :href="'#catalog'+index" @click="selectedCatalog = index">{{catalog}}</a>
    </scrollactive>

    <div class="product-block" v-for="(productList, index) in productLists" :key="index" :id="'catalog'+index">
      <product-type>{{catalogs[index]}}</product-type>
      <!--      products-outline 缺少 products 属性-->
      <products-outline :products="productLists[index]"></products-outline>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueScrollactive from 'vue-scrollactive'
  import ProductType from './ProductType'
  import ProductsOutline from './ProductsOutline'

  import apis from '@/apis/apis.js'

  Vue.use(VueScrollactive)

  export default {
    name: 'ScrollProducts',
    components: {
      ProductType: ProductType,
      ProductsOutline: ProductsOutline
    },
    mounted() {
      apis.products.libraries.getPresented((res) => {
        this.processProductsFromServer(res.data)
      })
    },
    data() {
      return {
        catalogs: [],
        productLists: [],
        selectedCatalog: -1
      }
    },
    methods: {
      processProductsFromServer(products) {
        for (let product of products) {
          const catalogIndex = this.catalogs.indexOf(product.catalog)
          if (catalogIndex === -1) {
            // 创建新的类别
            let tempCatalogs = this.catalogs
            tempCatalogs.push(product.catalog)
            this.catalogs = tempCatalogs

            // 给新的类别添加一个专属的产品列表
            let newList = []
            newList.push(product)
            let tempProductLists = this.productLists
            tempProductLists.push(newList)
            this.productLists = tempProductLists
          } else {
            let tempProductLists = this.productLists
            let tempSubList = tempProductLists[catalogIndex]
            tempSubList.push(product)
            tempProductLists[catalogIndex] = tempSubList
            this.productLists = tempProductLists
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .scrollactive-btns {
    width: 100%;
    background: white;
    height: 65px;
    display: flex;
    justify-content: center;
    color: black;
    transition: 0.3s color;
    position: sticky;
    top: 0px;
    /*如果不够高的话, 会被md-button的字挡到...*/
    z-index: 7;

    .scrollactive-btn {
      font-size: 18px;
      height: calc(100% - 2px);
      margin: 0 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      word-break: keep-all;
      color: black;
      transition: 0.3s color;
      text-decoration: none;
      position: relative;

      &:after {
        content: "";
        background: #0f97ff;
        height: 2px;
        width: 0px;
        transition: 0.3s width;
        position: absolute;
        bottom: -2px;
      }

      &:hover {
        color: #0f97ff;
        transition: 0.3s color;
      }

      &:hover:after {
        width: 100%;
        transition: 0.3s width;
      }
    }

    .scrollactive-btn_selected {
      color: #0f97ff;

      &:after {
        width: 100%;
      }
    }

  }

  .product-block {
    max-width: 1200px;
    /*补15px,顶部留一些白*/
    margin: 15px auto 150px auto;
  }
</style>