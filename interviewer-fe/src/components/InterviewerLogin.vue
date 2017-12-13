<template>
  <div id="container">
    <background-video></background-video>
    <div id="login-container">
      <h1 align="center">디프만 지원 평가 시스템</h1>
      <login-form title='면접관 로그인'></login-form>
    </div>
  </div>
</template>

<script>
  import backgroundVideo from './backgroundVideo.vue';
  import loginForm from './LoginForm.vue';

  export default {
    name: 'interviewerLogin',
    components: {backgroundVideo, loginForm},
  }
</script>

<style lang="scss" scoped>
  #login-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    h1 {
      display: block;
      margin-top: 80px;
      margin-bottom: 60px;
    }
    #login-box {
      width: 550px;
      margin: auto;
    }
  }
</style>
