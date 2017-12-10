<template>
  <div id="container">
    <div id="register-box">
      <h3>면접관 신규 등록</h3>
      <span>면접관 가입을 위한 정보를 입력해 주세요.</span>
      <el-form id="register-form" :model="userInfo" status-icon :rules="rules" ref="userInfo">
        <el-form-item label="이메일" prop="email">
          <el-input type="text" v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="비밀번호" prop="password">
          <el-input type="password" v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="비밀번호 재입력" prop="confirm_password">
          <el-input type="password" v-model="userInfo.confirm_password"></el-input>
        </el-form-item>
        <el-form-item label="이름" prop="name">
          <el-input type="text" v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item prop="position">
          <el-radio-group v-model="userInfo.position">
            <el-radio-button label="designer">디자이너</el-radio-button>
            <el-radio-button label="developer">개발자</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="면접관 가입 코드" prop="invitation_code">
          <el-input type="text" v-model="userInfo.invitation_code"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="g-recaptcha" :data-sitekey="recaptchaSiteKey" align="center"></div>
        </el-form-item>
        <el-form-item id="submit-box">
          <el-button id="submit" @click="submitForm('userInfo')">제출</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Config from '../config'
  import API from './../api/DrewaAPI'

  export default {
    name: 'interviewerSignUp',
    data () {
      // async validator document 참고 : https://github.com/yiminghe/async-validator
      const checkPassword = (rule, value, cb) => {
        const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,255}$/
        if (password_pattern.test(value)) {
          cb()
        } else {
          cb(new Error('비밀번호는 8 자리 이상의 영문+숫자 여야 합니다.'))
        }
      }
      const confirmPassword = (rule, value, cb) => {
        if (value !== this.userInfo.password) {
          cb(new Error('비밀번호와 일치하지 않습니다.'))
        } else {
          cb()
        }
      }
      return {
        recaptchaSiteKey: Config.RECAPTCHA_SITE_KEY,
        privacyPolicy: Config.PRIVACY_POLICY,
        userInfo: {
          name: '',
          position: '',
          email: '',
          password: '',
          confirm_password: '',
          invitation_code: '',
        },

        rules: {
          // validation 할 component 의 props 의 이름을 넣어준다.
          email: [
            // required validator
            {required: true, message: '이메일을 입력해 주세요.', trigger: 'blur'},
            // email validator
            {type: 'email', message: '정상적인 이메일을 입력해 주세요.', trigger: 'blur'},
          ],
          password: [
            // required validator
            {required: true, message: '비밀번호를 입력해 주세요.', trigger: 'blur'},
            // 8~15 영문+숫자
            {validator: checkPassword, trigger: 'blur'},
          ],
          confirm_password: [
            // required validator
            {required: true, message: '비밀번호를 다시 입력해 주세요.', trigger: 'blur'},
            // password 와 맞아야 함
            {validator: confirmPassword, trigger: 'blur'},
          ],
          invitation_code: [
            {required: true, message: '가입 코드를 입력해 주세요.', trigger: 'blur'},
          ],
          name: [
            // required validator
            {required: true, message: '이름을 입력해 주세요.', trigger: 'blur'},
          ],
          position: [
            // required validator
            {required: true, message: '포지션을 선택해 주세요.', trigger: 'change'},
          ],
        },
      }
    },
    methods: {
      notExistRecaptchaError () {
        this.$notify.error({
          title: 'reCAPTCHA 위젯이 존재하지 않습니다',
          message: '새로고침 하여 다시 진행 해 주세요.',
        })
      },
      unCheckedRecaptchaError () {
        this.$notify.error({
          title: '사람이시죠?',
          message: 'reCAPTCHA 버튼을 클릭해 주세요.',
        })
      },
      formError () {
        this.$notify.error({
          title: '잘못 된 입력',
          message: '사용자 정보가 올바르게 입력되지 않았습니다.',
        })
      },
      emailDuplicatedError () {
        // 폼 비우기
        this.$refs['userInfo'].resetFields()
        // recaptcha 다시 불러오기
        grecaptcha.reset()
        // noti 띄우기
        this.$notify.error({
          title: '이메일 중복',
          message: '이미 가입 된 이메일입니다.',
        })
      },
      invitationCodeError() {
        // recaptcha 다시 불러오기
        grecaptcha.reset()
        this.$notify.error({
          title: '잘못 된 입력',
          message: '가입 코드가 올바르게 입력되지 않았습니다.',
        })
      },

      submitForm (formName) {
        // input validation
        this.$refs[formName].validate((isValid) => {
          if (!isValid) {
            this.formError()
            return
          }
          try {
            var recaptchaToken = grecaptcha.getResponse()
          } catch (error) {
            this.notExistRecaptchaError()
          }

          // getResponse() 가 없으면 "" (비어있는 스트링) 으로 준다!!!
          if (recaptchaToken === '') {
            this.unCheckedRecaptchaError()
            return
          }

          // Start Spinner
          const loading = this.$loading({
            lock: true,
            text: '전송 중',
          })
          this.$store.dispatch('interviewerSignUp', {userInfo: this.userInfo, recaptchaToken})
            .then((res) => {
              this.$router.push({name: 'InterviewerLogin'})
              loading.close()
              this.$notify.success({title: '가입 완료', message: '가입이 성공적으로 완료 되었습니다.'})
            })
            .catch((e) => {
              if (e.message === 'duplicated') {
                this.emailDuplicatedError()
                loading.close()
              } else if(e.message === 'wrongCode'){
                this.invitationCodeError()
                loading.close()
              } else {
                console.log('something failed : ', e)
                loading.close()
              }
            })
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  #container {
    width: 500px;
    margin: auto;
    background-color: white;
  }
  #register-box {
    margin-top: 30px;
    padding: 30px 50px 10px 50px;

    h3 {
      text-align: center;
      margin-top: 0;
      margin-bottom: 30px;
    }
    
    span {
      font-size: 14px;
    }
    
    #input-box {
      .el-input {
        margin: 5px 0;
      }
    }
  }
  #register-form {
    margin-top: 10px;
    .g-recaptcha {
      margin-top: 20px;
    }
  }
  #submit-box {
    text-align: center;
    .el-button {
      margin-top: 10px;
      color: white;
      background-color: #2b2b2b;
    }
  }
</style>
