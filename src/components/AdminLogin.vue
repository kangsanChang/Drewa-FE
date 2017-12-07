<template>
  <div id="container">
    <background-video></background-video>
    <div id="login-container">
      <login-form title='면접관 로그인' type='interviewer'></login-form>
    </div>
  </div>
</template>

<script>
  import backgroundVideo from './backgroundVideo.vue';
  import loginForm from './LoginForm.vue';

  export default {
    name: 'adminLogin',
    components: {backgroundVideo, loginForm}
  }
</script>

<style lang="scss" scoped>
  #login-container {
    margin: auto;
    width: 550px;
  }
</style>
