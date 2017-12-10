<template>
  <div id="container">
    <login-form title='지원서 조회' type='applicant'></login-form>
  </div>
</template>

<script>
  import loginForm from './LoginForm.vue'
  export default {
    name: 'applicantLogin',
    components: {loginForm},
    created(){
      // sessionStorage 있으면 로그인 할 필요 없음.
      if (sessionStorage.getItem('user_token')) {
        this.$router.push({name: 'status'})
        this.$store.state.token = sessionStorage.getItem('user_token')
        this.$store.state.applicantIdx = sessionStorage.getItem('user_idx')
      }
    }
  }
</script>

<style lang="scss" scoped>
  #container {
    margin: auto;
    width: 550px;
  }
</style>
