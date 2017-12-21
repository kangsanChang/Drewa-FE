<template>
  <div id="card">
    <h1>{{title}}</h1>
    <router-link class="detail-link" title="상세보기" to="#"><i class="el-icon-d-arrow-right"></i></router-link>
  </div>  
</template>

<script>
export default {
  props:{
    title : { type:String, required:true },
  }
}
</script>


<style lang="scss" scoped>
  #card{
    display: inline-block;
    width: 250px;
    height: 100px;
    border: 1px solid black;
    border-radius: 2px;
    margin: 10px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);

    h1{
      margin-left: 10px
    }

    .detail-link{
      margin: 0 15px;
      float: right;
      font-size: 30px;
      text-decoration: none;
      color: #2b2b2b;
    }
    #detail-info-btn {
      float: right;
    }
  }
</style>
