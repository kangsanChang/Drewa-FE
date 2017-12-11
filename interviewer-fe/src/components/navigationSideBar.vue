<template>
  <el-aside width="200px">
    <el-menu background-color="#2b2b2b" text-color="white">
      <el-menu-item index="1">
        <span>요약</span>
      </el-menu-item>
      <el-menu-item index="2">
        <span>서류 평가</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span>면접 평가</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span>결과 보기</span>
      </el-menu-item>
      <el-menu-item index="5">
        <span>모집 설정</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style lang="scss" scoped>
  .el-aside {
    background-color: #2b2b2b;
    color: white;
    height: 100%;
    text-align: center;
    line-height: 200px;
    min-height: 1000px;
    // position: absolute;
    .el-menu {
      border: 0;
    }
  }
</style>
