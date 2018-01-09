<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>

<style>
  /* 기본 margin (8px) 제거하기 위함 */
  body {
    margin: 0;
    font-family: 'Nanum Square', 'NanumSquare', 'Apple SD Gothic Neo', 'Nanum Gothic', sans-serif;
    background-color: rgb(235, 237, 239);
  }
</style>
