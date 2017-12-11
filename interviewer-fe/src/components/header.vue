<template>
  <el-header>
    <img src="../assets/white-logo.png" height="34" width="34" alt="depromeet logo">
    <div id="header-info">
      <span>장강산</span>
      <a id="signout" href="/"><i class="fa fa-sign-out" aria-hidden="true"></i></a>
    </div>
  </el-header>
</template>

<script>
  export default {
  }
</script>


<style lang="scss" scoped>
  .el-header {
    background-color: #2b2b2b;
    color: white;
    text-align: center;
    line-height: 60px;
    img {
      display: inline-block;
      float: left;
      margin-left: 65px;
      margin-top: 13px;
    }
    #header-info {
      display: inline-block;
      float: right;
      #signout {
        display: inline-block;
        margin-left: 20px;
        text-decoration:none;
        color: inherit;
        cursor: pointer;
      }
    }
  }
</style>
