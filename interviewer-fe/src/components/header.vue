<template>
  <el-header height="75px">
    <img src="../assets/white-logo.png" height="35" width="35" alt="depromeet logo">
    <div id="header-nav">
      <ul>
        <li>
          <span>{{ this.$store.state.userName }}</span>
        </li>
        <li>
          <svg width="25" height="25" :data-jdenticon-value="this.$store.state.userEmail"></svg>
        </li>
        <li>
          <a id="signout" href="/" title="로그아웃"><i class="fa fa-sign-out" aria-hidden="true"></i></a>
        </li>
      </ul>
    </div>
  </el-header>
</template>

<script>
export default {
  mounted(){
    jdenticon();
  },
}
</script>

<style lang="scss" scoped>
  .el-header {
    background-color: #2b2b2b;
    color: white;
    text-align: center;
    padding: 20px;

    img {
      display: inline-block;
      float: left;
      margin-left: 65px;
    }
    
    #header-nav {
      display: inline-block;
      float: right;
      font-size: 1.0em;
      overflow: hidden;

      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
      }

      li {
        float: left;
        span {
          line-height: 30px;
        }
        svg {
          display: inline-block;
          background-color: white;
          border-radius: 5px;
          margin-left: 10px;
        }
        #signout {
          margin-left: 40px;
          display: inline;
          font-size: 25px;
          text-decoration:none;
          color: inherit;
          cursor: pointer;
        }
      }
    }
  }
</style>
