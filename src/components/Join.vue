<template>
    <div id="container">
        <div id="wrapper">
            <el-col :span="14" :offset="5" id="contents">
                <header class="header">
                    <div class="header-element">
                        <span>개인정보 수집 및 이용에 대한 안내</span>
                    </div>
                </header>
                <main id="content-body">
                    <div id="privacy-policy-wrapper">
                        <div id="privacy-policy-box">
                            <h3>개인정보 수집 및 이용 동의</h3>
                            <div id="privacy-policy-content">
                                <p>{{privacyPolicy}}</p>
                            </div>
                            <div id="privacy-policy-info">
                                지원서 등록을 위해 필요한 최소한의 개인정보이므로 동의를 해주셔야 지원서 등록이 가능합니다. 더 자세한 내용에 대해서는 <a href="/privacy-policy" style="color:black"><b>개인정보처리방침</b></a>을 참고해 주세요.
                            </div>
                        </div>
                        <div id="agree-box">
                            <button id="agree-btn" :class="{active: isAgreed}" @click="agree_toggle">동의합니다</button>
                        </div>
                    </div>
                    <hr>
                    <el-col :span="14" :offset="5">
                        <div id="register-box">
                            <h3>신규 지원자 등록</h3>
                            <span>지원서 작성을 위해 아래 정보를 입력해 주세요.</span>
                            <el-form id="register-form" :model="formRegister" status-icon :rules="rules" ref="formRegister">
                                <el-form-item prop="email">
                                    <el-input type="text" placeholder="이메일" v-model="formRegister.email"></el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input type="password" placeholder="비밀번호" v-model="formRegister.password"></el-input>
                                </el-form-item>
                                <el-form-item prop="confirm_password">
                                    <el-input type="password" placeholder="비밀번호 재입력" v-model="formRegister.confirm_password"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <div class="g-recaptcha" :data-sitekey="recaptchaSiteKey" align="center"></div>
                                </el-form-item>
                                <el-form-item id="submit-box">
                                    <!-- el-button 이어야 작동함... 삽질 2시간한듯 -->
                                    <el-button id="submit" @click="submitForm('formRegister')">완료</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>
                </main>
            </el-col>
        </div>
    </div>
</template>

<script>
import Config from '../config'

export default {
  name: 'join',
  data () {
      // async validator document 참고 : https://github.com/yiminghe/async-validator
      const checkPassword = (rule, value, cb) => {
          // 입력한 password 는 String 으로 들어옴
          // 정규식 리터럴을 이용한 pattern 생성
          // 8~15 자 사이의 영문 + 숫자 패턴
          const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
          if(password_pattern.test(value)) {
              cb();
          } else {
              cb(new Error('비밀번호는 8~15 사이의 영문+숫자 여야 합니다.'));
          }
      };
      const confirmPassword = (rule, value, cb) => {
          if (value !== this.formRegister.password) {
              cb(new Error('비밀번호와 일치하지 않습니다.'))
          } else {
              cb();
          }
      };
      return {
          isAgreed: false,
          recaptchaSiteKey: Config.RECAPTCHA_SITE_KEY,
          privacyPolicy: Config.PRIVACY_POLICY,
          formRegister : {
            email: '',
            password: '',
            confirm_password: '',
          },

          rules: {
              // validation 할 component 의 props 의 이름을 넣어준다.
              email: [
                  // required validator
                  { required: true, message: '이메일을 입력해 주세요.', trigger: 'blur'},
                  // email validator
                  { type: 'email', message: '정상적인 이메일을 입력해 주세요.', trigger: 'blur' }
              ],
              password: [
                  // required validator
                  { required: true, message: '비밀번호를 입력해 주세요.', trigger: 'blur'},
                  // 8~15 영문+숫자
                  { validator: checkPassword, trigger: 'blur'}
              ],
              confirm_password: [
                  // required validator
                  { required: true, message: '비밀번호를 다시 입력해 주세요.', trigger: 'blur'},
                  // password 와 맞아야 함
                  { validator: confirmPassword, trigger: 'blur'}
              ],
          },
      }
  },
  created() {
      // g-recaptcha-response 객체가 비어있는지 (recaptcha 안 누르고 redirect 된 경우) 확인
      // '-' hyphen 이 있는 객체는 배열처럼 접근한다.
      const recap_query = this.$route.query["g-recaptcha-response"];
      if (recap_query === "") {
          this.noRecaptchaError();
      } else {
          console.log(recap_query);
      }
  },
  methods: {
      agree_toggle(e) {
          this.isAgreed = !this.isAgreed
      },

      // Element UI Notification
      // http://element.eleme.io/#/en-US/component/notification
      duplicatedEmailError() {
          this.$notify.error({
              title: '중복 된 이메일이 존재합니다.',
              message: '다른 이메일 번호를 입력해 주세요.'
          });
      },
      noRecaptchaError() {
          this.$notify.error({
              title: '당신은 사람입니까?',
              message: 'reCAPTCHA 버튼을 클릭해 주세요.'
          });
      },
      agreedError() {
          this.$notify.error({
              title: '이용약관 미동의',
              message: '개인정보 수집 및 이용에 동의하셔야 추가적인 진행이 가능합니다.'
          });
      },
      formError() {
          this.$notify.error({
              title: '잘못 된 입력',
              message: '사용자 정보가 올바르게 입력되지 않았습니다.'
          });
      },
      
      submitForm(formName) {
        if (this.isAgreed === false) {
            this.agreedError();
            return;
        } else {
            // input validation
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    // check reCAPTCHA
                    // grecaptcha.getResponse() : reCAPTCHA 가 만들어낸 code
                    if(grecaptcha.getResponse()) {
                        // API CALL
                        alert('success!!')
                    } else {
                        this.noRecaptchaError();
                    }
                } else {
                    this.formError();
                    return false;
                }
            })
        }
        // 1. 중복되지 않는 이메일 계정이 맞는지
        //확인되면 API 서버에 post 날리기. (나머진 서버의 몫)
      }
  }
}
</script>


<style lang="scss" scoped>
// Set element basic style
button {
    // default button style
    margin: 30px 0;
    width: 120px;
    height: 50px;
    font-size: 16px;
    border-color: #2b2b2b;
    border-radius: 3px;
    background: white;
    color: #2b2b2b;

    &:focus {
        outline: none;
    }
    &:hover {
        cursor: pointer;
    }
}

hr {
    margin: 30px 0;
}

// Set layouts
#register-form {
    margin-top: 10px;
}

#wrapper {
    margin: auto;
    max-width: 1250px;
    min-width: 800px;
}

header {
    background-color: #2b2b2b;
    color: white;
    vertical-align: middle;
    height: 64px;
    padding-left: 30px;
    font-size: 16px;

    .header-element {
        display: inline-block;
        margin-top: 21px;
        margin-bottom: 24px;
        
        span {
            font-size: 1.2em;
        }
    }
}

#content-body {
    /* 양 옆 공간 */
    padding: 0 30px;
}

#contents {
    background-color: white;
}

#privacy-policy-box {
    div {
        font-size: 15px;
    }
    h3 {
        margin-top: 25px;
        margin-bottom: 10px;
    }

    #privacy-policy-content {
        border: 1px solid;
        border-color: #2b2b2b;

        p {
            margin: 1em 1em;
            font-size: 14px;
            font-family: inherit;
            white-space: pre-wrap;
        }
    }

    #privacy-policy-info {
        margin-top: 18px;
    }
}

#agree-box {
    text-align: center;

    button {
        margin-bottom: 0;

        &.active {
            background: #2b2b2b !important;
            color: white;
        }

        &:hover {
            background: gray;
            color: white;
        }
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

#register-box {
    h3 {
        text-align: center;
        margin-top: 0;
    }

    #input-box {
        .el-input {
            margin: 5px 0;
        }
    }
}

</style>
