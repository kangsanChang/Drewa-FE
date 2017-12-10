<template>
  <div id="login-box">
    <h3>{{ title }}</h3>
    <div id="input-box">
      <span class="info">신규 지원서 작성 시 입력했던 정보를 입력해 주세요.</span>
      <span class="info">로그인을 위해 아래 정보를 입력해 주세요.</span>
      <el-form id="login-form" :model="loginForm" ref="loginForm">
        <el-form-item>
          <el-input id="email-input" type="text" placeholder="이메일" v-model="loginForm.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input id="password-input" type="password" placeholder="비밀번호" v-model="loginForm.password"></el-input>
        </el-form-item>
        <span>
          등록된 이메일/비밀번호가 없거나 잊어버린 경우
          <el-button type="text" @click="contactUs"><u>문의하기</u></el-button>
        </span>
        <el-form-item id="submit-box">
          <el-button class="submit" @click="submitForm">조회</el-button>
          <el-button class="submit" @click="submitForm">로그인</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title : { type:String, required:true },
  },
  name: 'loginForm',
  data () {
    return {
      loginForm: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    contactUs () {
      this.$alert(
        '계정을 잊은 경우 디프만 지원센터 (apply@depromeet.com)로 문의 메일 보내주시기 바랍니다.',
        '문의하기',
        {confirmButtonText: '확인'},
      )
    },
    submitForm () {
      if (this.loginForm.email === '' || this.loginForm.password === '') {
        this.$notify.error({message: '이메일, 비밀번호를 다 채운 후 조회하세요.', title: '오류'})
        return
      } else {
        this.$store.dispatch('loginApplicant', {loginForm: this.loginForm})
          .then((res) => {
            this.$router.push({name: 'status'})
            this.$notify.success({title: '성공', message: '로그인에 성공 하였습니다.'})
          })
          .catch((e) => {
            if (e === 'userEmail not exist') {
              this.$notify.error({title: '오류', message: '계정이 존재하지 않습니다.'})
            } else if (e === 'password not matching') {
              this.$notify.error({title: '오류', message: '패스워드가 일치하지 않습니다.'})
            } else {
              console.log(e)
            }
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  #login-box {
    background-color: white;
    padding: 40px 40px 30px 40px;
    margin-top: 100px;
    h3 {
      font-size: 16px;
      display: block;
      margin: 0;
    }
    #input-box {
      width: 270px;
      margin: auto;
      span.info {
        display: block;
        margin: 30px 0 10px 0;
        font-size: 12px;
      }
      #login-form {
        span {
          font-size: 10px;
        }
        button.el-button--text {
          margin-left: 5px;
          font-size: 12px;
          color: #FF8E7F;
          padding: 0;
        }
      }
      .el-form-item {
        margin-bottom: 10px;
      }
    }
    #submit-box {
      margin: auto;
      text-align: center;
      button {
        margin-top: 40px;
        width: 100px;
        height: 40px;
        background-color: #2b2b2b;
        color: white;
        font-size: 12px;
      }
    }
  }
</style>
