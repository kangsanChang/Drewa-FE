<template>
  <header class="header">
    <div class="header-title">
      <span>{{ title }}</span>
    </div>
  </header>
</template>

<script>
  export default {
    // 간단하게 받아오려면 array 형태로 받으면 되고, 객체 형태로 받아도 된다.
    props: {
      title : { type:String, required:true },
    },
  }
</script>


<style lang="scss" scoped>
  header {
    background-color: #2b2b2b;
    color: white;
    vertical-align: middle;
    height: 61px;
    padding: 0 30px;

    .header-title {
      display: inline-block;
      margin-top: 21px;
      margin-bottom: 24px;

      span {
        font-size: 16px;
      }
    }
  }
</style>
