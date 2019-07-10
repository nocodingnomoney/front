<template>
  <div>
    <router-view name="default"></router-view>
    <Snackbar></Snackbar>
    <LoadingDialog></LoadingDialog>
  </div>
</template>

<script>
  import Snackbar from './utils/Snackbar'
  import LoadingDialog from './utils/LoadingDialog'

  export default {
    name: 'App',
    components: {Snackbar, LoadingDialog},
  }
</script>
