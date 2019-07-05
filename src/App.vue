<template>
  <div>
    <router-view name="default"></router-view>
    <Snackbar></Snackbar>
  </div>
</template>

<script>
  import Snackbar from './utils/Snackbar'

  export default {
    name: 'App',
    components: {Snackbar},
  }
</script>
