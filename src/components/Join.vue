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
                            <el-form id="register-form" :model="userInfo" status-icon :rules="rules" ref="userInfo">
                                <el-form-item prop="email">
                                    <el-input type="text" placeholder="이메일" v-model="userInfo.email"></el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input type="password" placeholder="비밀번호" v-model="userInfo.password"></el-input>
                                </el-form-item>
                                <el-form-item prop="confirm_password">
                                    <el-input type="password" placeholder="비밀번호 재입력" v-model="userInfo.confirm_password"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <div class="g-recaptcha" :data-sitekey="recaptchaSiteKey" align="center"></div>
                                </el-form-item>
                                <el-form-item id="submit-box">
                                    <el-button id="submit" @click="submitForm('userInfo')">완료</el-button>
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
import API from './../api/DrewaAPI'
export default {
  name: 'join',
  data () {
      // async validator document 참고 : https://github.com/yiminghe/async-validator
      const checkPassword = (rule, value, cb) => {
          // 입력한 password 는 String 으로 들어옴
          // 정규식 리터럴을 이용한 pattern 생성
          // 8~ 255 자 사이의 영문 + 숫자 패턴
          const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,255}$/;
          if(password_pattern.test(value)) {
              cb();
          } else {
              cb(new Error('비밀번호는 8 자리 이상의 영문+숫자 여야 합니다.'));
          }
      };
      const confirmPassword = (rule, value, cb) => {
          if (value !== this.userInfo.password) {
              cb(new Error('비밀번호와 일치하지 않습니다.'))
          } else {
              cb();
          }
      };
      return {
          isAgreed: false,
          recaptchaSiteKey: Config.RECAPTCHA_SITE_KEY,
          privacyPolicy: Config.PRIVACY_POLICY,
          userInfo : {
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
  methods: {
      agree_toggle(e) {
          this.isAgreed = !this.isAgreed
      },
      // Element UI Notification
      // http://element.eleme.io/#/en-US/component/notification
      noRecaptchaError() {
          this.$notify.error({
              title: '사람이시죠?',
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

      emailDuplicatedError() {
          // 폼 비우기
          this.$refs['userInfo'].resetFields();
          // recaptcha 다시 불러오기
          grecaptcha.reset();
          // noti 띄우기
          this.$notify.error({
              title: '이메일 중복',
              message: '이미 가입 된 이메일입니다.'
          });
      },

      submitForm(formName) {
        // agree validation
        if (this.isAgreed === false) {
            this.agreedError();
            return;
        }
        // input validation
        this.$refs[formName].validate((isValid) => {
            if(!isValid) {
                this.formError();
                return;
            }
            // check reCAPTCHA
            // grecaptcha.getResponse() : reCAPTCHA 가 만들어낸 code. 서버에서 검증
            // 여러 개의 폼을 검증 할 경우 () 안에 key 값 적어준다. 안적으면 첫번재 리캡챠만 가능.
            const recaptchaToken = grecaptcha.getResponse();

            // getResponse() 가 없으면 "" (비어있는 스트링) 으로 준다!!!
            if(recaptchaToken === "") {
                this.noRecaptchaError();
                return;
            }

            this.$store.dispatch('createApplicant', {userInfo : this.userInfo, recaptchaToken})
            .then((res)=> {
                    // Store에 토큰하고 applicantIdx 저장까지 된 회원 가입 성공 시
                    // 작성 페이지로 redirect 할 예정
                    // 현재 로그인 후 초기 화면으로 잘 가는지 테스트. 나중에 변경해야 함
                    this.$router.push({ name: 'intro'});
                })
            .catch((e) => {
                if (e === 'duplicated') {
                    this.emailDuplicatedError();
                } else {
                    console.log('something failed : ', e);
                }
            })
        })
      },
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
    .g-recaptcha {
        margin-top: 20px;
    }
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
    max-width: 300px;
    text-align: center;
    margin: 0 auto;

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
