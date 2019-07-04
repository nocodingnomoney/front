<template>
  <div class="product-type">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'ProductType'
  }
</script>

<style lang="scss" scoped>
  .product-type {
    width: 100%;
    height: 50px;
    font-size: 24px;
  }
  
</style>