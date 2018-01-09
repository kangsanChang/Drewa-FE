<template>
<el-container id="container" direction="vertical">
  <v-header></v-header>
  <el-container id="contents">
    <nav-sidebar></nav-sidebar>
    <el-main>
      <component :is="currentView"></component>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
  import vHeader from './header.vue'
  import navSidebar from './navigationSideBar.vue'
  import overview from './overview.vue'
  import applicationTable from './ApplicationTable.vue'
  import intervieweeTable from './IntervieweeTable.vue'
  import evalApplication from './EvalApplication.vue'
  import evalInterview from './EvalInterview.vue'
  import result from './result.vue'
  import settings from './settings.vue'
  import settingForm from './settingForm.vue'

  export default {
    name: 'dashboard',
    components: {vHeader, navSidebar, overview, applicationTable, intervieweeTable, evalApplication, evalInterview, result, settings, settingForm},
    created () {
      if (this.$store.state.token === '' && sessionStorage.getItem('user_token')) {
        this.$store.state.token = sessionStorage.getItem('user_token')
        this.$store.state.userIdx = sessionStorage.getItem('user_idx')
      }
    },
    mounted(){
      console.log(this.$route.name);
      console.log(this.currentView);
    },
    computed: {
      currentView(){
        return this.$route.name;
      }
    }
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
    }
  }

</style>
