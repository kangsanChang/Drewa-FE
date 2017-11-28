<template>
  <div id="container">
    <div id="login-box">
        <h3>지원서 조회</h3>
        <div id="input-box">
            <span id="info">신규 지원서 작성 시 입력했던 정보를 입력해 주세요.</span>
            <el-form id="login-form" :model="loginForm" ref="loginForm">
                <el-form-item>
                    <el-input id="email-input" type="text" placeholder="이메일" v-model="loginForm.email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input id="password-input" type="password" placeholder="비밀번호" v-model="loginForm.password"></el-input>
                </el-form-item>
                <span>등록된 이메일/비밀번호가 없거나 잊어버린 경우 <el-button type="text" @click="contactUs"><u>문의하기</u></el-button></span>
                <el-form-item id="submit-box">
                    <el-button id="submit" @click="submitForm">조회</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
  </div>
</template>

<script>
import Config from './../config'
export default {
    name: 'login',
    data() {
      return {
        //   invRecaptchaSiteKey : Config.INV_RECAPTCHA_SITE_KEY,
        //   recaptchaToken : "",
          loginForm : {
              email: "",
              password: "",
          },
      }
    },
    methods: {
        // recaptchaResCb() {
        //     const recaptchaToken = grecaptcha.getResponse();
        //     console.log('i gotta token \n', recaptchaToken);
        //     // Dispatch
        //     this.$store.dispatch('loginApplicant', {loginForm : this.loginForm, recaptchaToken})
        //     .then((res)=> {
        //             // Store에 토큰하고 applicantIdx 저장까지 된 회원 가입 성공 시
        //             // 작성 페이지로 redirect 할 예정
        //             // 현재 로그인 후 초기 화면으로 잘 가는지 테스트. 나중에 변경해야 함
        //             this.$router.push({ name: 'application'});
        //         })
        //     .catch((e) => {
        //         console.log('something failed : ', e);
        //     })
        // },
        contactUs() {
            this.$alert(
                "계정을 잊은 경우 디프만 지원센터 (apply@depromeet.com)로 문의 메일 보내주시기 바랍니다.",
                "문의하기",
                { confirmButtonText: "확인" },
            )
        },
        submitForm(event) {
            if (this.loginForm.email === "" || this.loginForm.password === ""){
                this.$notify.error({message:"이메일, 비밀번호를 다 채운 후 조회하세요.", title: "필드 오류"})
                return;
            } else {
                // validation 후 recaptcha 실행
                // event.preventDefault();
                // grecaptcha.execute(); // button 대신 programmically 하게 recaptcha 실행하는 경우
                this.$store.dispatch('loginApplicant', {loginForm : this.loginForm})
                .then((res)=> {
                        // Store에 토큰하고 applicantIdx 저장까지 된 회원 가입 성공 시
                        // 작성 페이지로 redirect 할 예정
                        // 현재 로그인 후 초기 화면으로 잘 가는지 테스트. 나중에 변경해야 함
                        this.$notify.success({title: '성공', message: '로그인에 성공 하였습니다.'})
                        this.$router.push({ name: 'status'});
                    })
                .catch((e) => {
                    if (e.msg === 'Email not exist') {
                        this.$notify.error({title: '오류', message:'계정이 존재하지 않습니다.'})
                    }else if (e.msg === 'Password not match') {
                        this.$notify.error({title: '오류', message:'패스워드가 일치하지 않습니다.'})
                    } else {
                        console.log(e);
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    #container {
        margin: auto;
        width: 550px;
    }
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
            span#info {
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
