<template>
  <div>
    <ProductToolbar></ProductToolbar>
    <Carousel></Carousel>
    <ScrollProducts></ScrollProducts>
  </div>
</template>

<script>
  // 部分加载组件
  import Vue from 'vue'
  import 'vue-material/dist/vue-material.min.css'

  import {
    MdApp, MdContent
  } from 'vue-material/dist/components'

  // Vue-Material的组件引入用Vue.use语句
  Vue.use(MdApp)
  Vue.use(MdContent)


  import Carousel from '../components/productCenter/Carousel'
  import ScrollProducts from '../components/productCenter/ScrollProducts'
  import ProductToolbar from '../components/productCenter/ProductToolbar'

  export default {
    name: 'ProductCenter.vue',
    components: {
      Carousel: Carousel,
      ScrollProducts: ScrollProducts,
      ProductToolbar: ProductToolbar
    }
  }
</script>

<style scoped>
  .md-app {
    max-height: 400px;
    border: 1px solid rgba(#000, .12);
  }
</style>