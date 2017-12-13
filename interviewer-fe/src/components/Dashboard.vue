<template>
<el-container id="container" direction="vertical">
  <v-header></v-header>
  <el-container id="contents">
    <nav-sidebar></nav-sidebar>
    <el-main>
      Main Text
    </el-main>
  </el-container>
</el-container>
</template>

<script>
  import vHeader from './header.vue'
  import navSidebar from './navigationSideBar.vue'

  export default {
    name: 'dashboard',
    components: {vHeader, navSidebar},
    created () {
      if (this.$store.state.token === '' && sessionStorage.getItem('user_token')) {
        this.$store.state.token = sessionStorage.getItem('user_token')
        this.$store.state.interviewerIdx = sessionStorage.getItem('user_idx')
      }
    },
  }
</script>

<style lang="scss" scoped>
  #container {
    height: 100%;
  }
  #contents {
    height: 100%;
    .el-main {
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
    }
  }

</style>
