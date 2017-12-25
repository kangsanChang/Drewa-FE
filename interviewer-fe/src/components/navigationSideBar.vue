<template>
  <el-aside width="200px">
    <el-menu background-color="#2b2b2b" text-color="white" active-text-color="#ffd04b" :default-active="activeIdx" :router="true">
      <el-menu-item index="/overview">
        <span>요약</span>
      </el-menu-item>
      <el-menu-item index="/eval-application">
        <span>서류 평가</span>
      </el-menu-item>
      <el-menu-item index="/eval-interview">
        <span>면접 평가</span>
      </el-menu-item>
      <el-menu-item index="/result">
        <span>결과 보기</span>
      </el-menu-item> 
      <el-menu-item index="/settings">
        <span>모집 설정</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  computed: {
    activeIdx(){
      if(this.$route.name === 'settingForm'){
        return '/settings'
      }
      return this.$route.path
    }
  }
}
</script>


<style lang="scss" scoped>
  .el-aside {
    background-color: #2b2b2b;
    color: white;
    height: 100%;
    text-align: center;
    line-height: 200px;
    .el-menu {
      border: 0;
    }
  }
</style>
