<template>
<el-container id="container" direction="vertical">
  <v-header></v-header>
  <el-container id="contents">
    <!-- <el-aside width="200px">Aside</el-aside> -->
    <nav-sidebar></nav-sidebar>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
  import vHeader from './header.vue'
  import navSidebar from './navigationSideBar.vue'

  export default {
    name: 'applicantStatus',
    components: {vHeader, navSidebar},
  }
</script>

<style lang="scss" scoped>
  #container {
    width: 100%;
    height: 100%;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    min-height: 960px;
  }
</style>
