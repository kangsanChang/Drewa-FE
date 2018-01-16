<template>
  <div id="container">
    <div id="control-box">
      <router-link id="back-btn" title="뒤로가기" :to="{path: '/eval-application/'}"><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></router-link>
    </div>
    <div id="main-container">
      <div id="applicantion-box">
        <div id="contents-wrapper">
          <div id="submitted-application-wrapper">
            <div id="basic-info-wrapper" class="wrapper">
              <h3 class="wrapper-title">기본 인적사항</h3>
              <div id="basic-info-box" class="box">
                  <div id="name" class="submitted-form-box">
                    <span>{{ applicantFormData.name }}</span>
                  </div>
                  <div id="gender" class="selector submitted-form-box">
                    <span>{{ korGender }}</span>
                  </div>
                  <div id="birth" class="half endcol submitted-form-box">
                    <span>{{ applicantFormData.birth }}</span>
                  </div>
                  <div id="residence" class="half submitted-form-box">
                    <span>{{ applicantFormData.residence }}</span>
                  </div>
                  <div id="phone" class="half endcol submitted-form-box">
                    <span>{{ applicantFormData.phone }}</span>
                  </div>
                  <div id="company" class="half submitted-form-box">
                    <span>{{ applicantFormData.company }}</span>
                  </div>
                  <div id="major" class="half endcol submitted-form-box">
                    <span>{{ applicantFormData.major }}</span>
                  </div>
                  <div id="position" class="selector submitted-form-box">
                    <span>{{ korPosition }}</span>
                  </div>
                  <div id="knownFrom" class="endcol submitted-form-box">
                    <span>{{ applicantFormData.knownFrom }}</span>
                  </div>
                  <div id="personalUrl" class="full endcol submitted-form-box">
                    <span>{{ applicantFormData.personalUrl }}</span>
                  </div>
              </div>
              <div id="photo-box">
                <div id="photo-upload-box" class="box">
                    <img v-if="applicantFormData.applicantImageUrl" :src="applicantFormData.applicantImageUrl" class="avatar">
                </div>
              </div>
            </div>
            <div id="cover-letter-wrapper" class="wrapper">
              <h3 class="wrapper-title">자기소개서</h3>
              <div v-for="(question, index) in setApplicationData.questions.common" :key="index"
                  class="text-box">
                <h4 class="title">{{index + 1}}. {{ question }}</h4>
                <p class="answer-text-box">{{ applicantFormData.answers[index] }}</p>
              </div>
              <div v-if="applicantFormData.position==='developer'">
                <div v-for="(question, index) in setApplicationData.questions.developer" :key="index"
                    class="text-box">
                  <h4 class="title">{{index + setApplicationData.questions.common.length +
                  1}}. {{ question }}</h4>
                  <p class="answer-text-box">{{ applicantFormData.devAnswers[index] }}</p>
                </div>
              </div>
              <div v-if="applicantFormData.position==='designer'">
                <div v-for="(question, index) in setApplicationData.questions.designer" :key="index"
                    class="text-box">
                  <h4 class="title">{{index + setApplicationData.questions.common.length +
                  1}}. {{ question }}</h4>
                  <p class="answer-text-box">{{ applicantFormData.desAnswers[index] }}</p>
                </div>
              </div>
            </div>
            <div id="attached-document-wrapper" class="wrapper">
              <h3 class="wrapper-title">첨부 자료</h3>
              <div id="portfolio-upload-box" v-if="applicantFormData.applicantPortfolioUrl">
                <el-upload
                  :disabled="applicantFormData.isSubmit"
                  name="user_portfolio"
                  class="upload-portfolio"
                  action="#"
                  :headers="authorizationHeader"
                  :limit="1"
                  :file-list="fileList"
                  :on-preview="handleFilePreview"
                >
                </el-upload>
              </div>
              <div v-else>
                <span>없음</span>
              </div>
            </div>
            <div id="interview-time-wrapper" class="wrapper">
              <h3 class="wrapper-title">면접 시간 선택</h3>
              <div v-for="(interviewDay, index) in setApplicationData.interviewSchedule" :key="index"
                  class="interview-select-box">
                <span>{{interviewDateFormat(interviewDay.date)}}</span>
                <el-checkbox-group v-if="applicantFormData.interviewAvailableTimes[index]" v-model="applicantFormData.interviewAvailableTimes[index].times" disabled>
                  <el-checkbox v-for="(time, index) in applicantFormData.interviewAvailableTimes[index].times" :key="index" :label="time" border>
                    {{time}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="comments-box">
        <div id="comments-wrapper" class="wrapper">
          <h3 class="wrapper-title"># Comments</h3>
          <div v-for="(data,index) in comments" :key="index" class="comment-box">
            <div class="comment-info">
              <ul>
                <li><svg width="25" height="25" :data-jdenticon-value="data.userEmail"></svg></li>
                <li><span>{{ data.userName }}</span></li>
                <li><span id="createdAt">{{ CommentTime(data.createdAt) }}</span></li>
                <li><i @click="confirmDelete(data._id)" v-if="myEmail === data.userEmail" class="el-icon-delete"></i></li>
              </ul>
            </div>
            <div class="comment">
              <p>{{ data.comment }}</p>
            </div>
          </div>
          <div>
            <div id="comment-input">
              <el-input
                type="textarea"
                resize="none"
                :autosize="{ minRows: 1, maxRows: 3}"
                v-model="myComment"
              ></el-input>
            </div>
            <div id="comment-submit">
              <button @click="inputComment()">입력</button>
            </div>
          </div>
        </div>
        <div v-if="userType!=='admin'" id="evaluation-wrapper" class="wrapper">
          <h3 class="wrapper-title"># 평가</h3>
          <el-rate @change="sendPoint()" v-model="myPoint" :allow-half="true">
          </el-rate>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      applicantIdx: '',
      myPoint: null,
      myComment: '',
      setApplicationData: {
        season: '',
        questions: '',
        interviewSchedule: [],
        applicationPeriod: '',
      },
      applicantFormData: {
        name: '',
        gender: '',
        birth: '',
        residence: '',
        phone: '',
        company: '',
        major: '',
        position: '',
        knownFrom: '',
        personalUrl: '',
        portfolioFilename: '',
        applicantImageUrl: '',
        applicantPortfolioUrl: '',
        answers: [],
        devAnswers: [],
        desAnswers: [],
        interviewAvailableTimes: [],
        isSubmit: '',
      },
      comments: [],
    }
  },
  computed: {
    userType() {
      return this.$store.state.userType;
    },
    myEmail () {
      return this.$store.state.userEmail
    },
    authorizationHeader () {
        return {Authorization: 'Bearer ' + this.$store.state.token}
      },
    korGender() {
      if(!this.applicantFormData.gender){ return; }
      return this.applicantFormData.gender === 'M' ? '남자' : '여자'
    },
    korPosition() {
      if(!this.applicantFormData.position){ return; }
      return this.applicantFormData.position === 'designer' ? '디자이너' : '개발자'
    },
    fileList () {
      return [{ name: this.applicantFormData.portfolioFilename, url: this.applicantFormData.applicantPortfolioUrl }]
    },
  },
  mounted(){
    const loading = this.$loading({lock: true, text: '로딩 중'})
     this.applicantIdx = this.$route.params.applicantIdx;
     this.$store.dispatch('getApplicationSetting')
     .then((res)=> {
       this.setApplicationData = res;
     })
     this.$store.dispatch('getApplicationData', { applicantIdx: this.$route.params.applicantIdx})
     .then((res) => {
       this.applicantFormData = res;
       loading.close()
     })
     this.$store.dispatch('getEvalData', { applicantIdx: this.$route.params.applicantIdx})
     .then((res) => {
       this.comments = res.comments;
       this.myPoint = res.myPoint;
     })
     .finally(() => {
       jdenticon();
     })
  },
  methods: {
    CommentTime (time) {
      const created = this.moment(time)
      const now = this.moment()
      return created.from(now);
    },
    confirmDelete(id){
      this.$confirm('정말 삭제하시겠습니까?', '주의!', {
        confirmButttonText: '네',
        cancelButtonText: '취소',
        type: 'warning'
      }).then(() => {
        // API 콜 delete comment
        this.$store.dispatch('deleteComment', {id , applicantIdx: this.$route.params.applicantIdx })
        .then(() => {
          this.$store.dispatch('getEvalData', { applicantIdx: this.$route.params.applicantIdx})
          .then((res) => { this.comments = res.comments })
          this.$message.success('삭제 완료!')
        })
      }).catch(() => {
        this.$message.info('삭제가 취소되었습니다.')
      })
    },
    sendPoint(){
      this.$store.dispatch('sendPoint', { point: this.myPoint, applicantIdx: this.$route.params.applicantIdx })
    },
    interviewDateFormat (date) {
      return this.moment(date).format('YYYY/MM/DD (dddd)');
    },
    handleFilePreview () {
      window.open(this.applicantFormData.applicantPortfolioUrl, '_blank')
    },
    inputComment() {
      this.$store.dispatch('postComment', { comment:this.myComment, createdAt:Date.now() , applicantIdx: this.$route.params.applicantIdx })
      .then(()=> {
        this.myComment='';
        this.$store.dispatch('getEvalData', { applicantIdx: this.$route.params.applicantIdx})
        .then((res)=>{ this.comments = res.comments })
        .finally(() => {
          jdenticon();
        })
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  #container {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }
  #control-box {
    width: 40px;
    display: block;
    margin-left: 30px;
    margin-bottom: 20px;
    #back-btn {
      text-decoration: none;
      color: #2b2b2b;
      font-size: 35px;
    }
  }
  #main-container {
    display: flex;
    justify-content: space-around;
  }

  #applicantion-box {
    display: inline-block;
    width: 960px;
  }
  #comments-box {
    display: inline-block;
    width: 600px;
  }
  .comment-box {
    display: block;
    margin-bottom: 10px;
    padding: 5px;
    background-color: rgb(248, 244, 244);
  }
  #comment-input {
    width: 420px;
    display: inline-block;
  }
  #comment-submit {
    width: 80px;
    display: inline-block;
    vertical-align:top;
    button {
      &:focus {
        outline: none;
      }
      cursor: pointer;
      margin-left: 10px;
      width: 70px;
      height: 32px;
      border-radius: 5px;
      background-color: #2b2b2b;
      color: white;
    }
  }
  .comment-info {
    // display: block;
    ul {
      display: block;
      width: 100%;
      overflow: auto;
      list-style-type: none;
      padding: 0;
    }
    li:last-child { 
      float:right; 
      margin-right: 20px;
      cursor: pointer;
      }
    li {
      float: left;
      span {
        line-height: 25px;
        margin-right: 20px;
        &#createdAt {
          font-size: 12px;
          color: #a6a6a6;
        }
      }
      svg {
        display: inline-block;
        background-color: white;
        border-radius: 5px;
        margin-right: 5px; 
      }
    }
  }
  .comment {
    display: block;
    font-size: 14px;
  }

  #contents-wrapper {
    margin: auto;
    width: 870px;
  }

  .wrapper {
    background-color: white;
    margin-bottom: 7px;
    padding: 25px 40px 40px 40px;

    &#evaluation-wrapper {
      margin-top: 30px;
    }
    h3 {
      display: block;
      margin: 30px 0 20px 0;
    }

    .wrapper-title {
      margin: 0 0 25px 0;
    }
  }

  #basic-info-wrapper {
    h3.wrapper-title {
      margin-top: 0;
    }
    #basic-info-box {
      width: 550px;
      display: inline-block;
      
      .submitted-form-box {
        margin: 0 10px 8px 0;
        display: inline-block;
        float: left; // inline-block 의 기본 margin (잡히지도 않음) 을 제거하기 위함.

        span {
          display: inline-block;
          padding: 10px;
        }
        // Customize input size
        &#name {
          width: 150px;
        }
        &#knownFrom {
          width: 430px;
        }
        &.full {
          width: 550px;
        }
        &.half {
          width: 270px;
        }
        &.selector {
          width: 110px;
        }
        &.endcol {
          margin-right: 0;
        }
        &#personalUrl {
          margin-bottom: 0;
        }
      }
      .el-form-item {
        margin: 0 10px 8px 0;
        display: inline-block;
        float: left; // inline-block 의 기본 margin (잡히지도 않음) 을 제거하기 위함.

        // Customize input size
        &#name {
          width: 150px;
        }
        &#knownFrom {
          width: 430px;
        }
        &.full {
          width: 550px;
        }
        &.half {
          width: 270px;
        }
        &.selector {
          width: 110px;
        }
        &.endcol {
          margin-right: 0;
        }
        &#personalUrl {
          margin-bottom: 0;
        }
      }
    }

    #photo-box {
      display: inline-block;
      float: right;
      width: 150px;
      height: 239px;
    }

    #photo-upload-box {
      margin-bottom: 8px;
      float: right;
      display: inline-block;
      background-color: #c4c4c4;
      border-radius: 10px;

      .avatar-uploader-icon {
        font-size: 30px;
        color: white;
        width: 150px;
        height: 183px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 172px;
        height: 210px;
        display: block;
        border-radius: 10px;
      }
    }

    #picture-upload-desc {
      margin: auto;
      display: inline-block;
      font-size: 13px;
    }
  }
  #cover-letter-wrapper {
    h4 {
      margin: 30px 0 10px 0;
    }
    .answer-text-box {
      white-space: pre-wrap;
      line-height:160%;
    }
  }

  #attached-document-wrapper {
    h3.wrapper-title {
      display: inline-block;
      margin-right: 10px;
    }
    #portfolio-upload-box {
      width: 300px;
      .el-button {
        width: 110px;
      }
      .el-upload__tip {
        font-size: 11px;
      }
    }
  }

  #interview-time-wrapper {
    h3.wrapper-title {
      display: inline-block;
      margin-right: 10px;
    }
    .interview-select-box {
      width: 450px;
      margin-bottom: 20px;
      span {
        font-size: 15px;
        display: inline-block;
        margin-bottom: 20px;
      }
      .el-checkbox {
        margin: 0 10px 10px 0;
      }
    }
  }
</style>
