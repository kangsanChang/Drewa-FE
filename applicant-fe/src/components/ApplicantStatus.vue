<template>
  <div id="container">
    <v-header :title="title" :logout="true"></v-header>
    <div id="contents-wrapper">
      <div id="step-box">
        <el-steps :active="active">
          <el-step title="서류" :status="docStatus" :description="docDesc"></el-step>
          <el-step title="면접" :status="interviewStatus" :description="interDesc"></el-step>
          <el-step title="최종" :status="finalStatus" :description="finalDesc"></el-step>
        </el-steps>
      </div>
      <div id="message-wrapper">
        <div id="message-box">{{ message }}</div>
      </div>
      <div id="info-wrapper">
        <div id="info-box">
          <label>지원서 조회 결과입니다.</label>
          <div id="result-box">
            <span id="season">4기 지원서</span>
            <span id="result">{{ status }}</span>
          </div>
        </div>
        <div class="buttons" align="center">
          <router-link v-if="this.status === '미제출'" :to="{name: 'application'}" class="button"
                       id="edit-btn">수정
          </router-link>
          <router-link v-else-if="this.status === ('제출 완료' || '서류 합격')" :to="{name: 'application'}"
                       class="button" id="edit-btn">지원서 확인
          </router-link>
          <a v-if="this.status === '미제출'" class="button" id="remove-btn"
             @click="removeConfirm">삭제</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Config from '../config'
  import API from './../api/DrewaAPI'

  import vHeader from './header.vue'

  export default {
    name: 'applicantStatus',
    components: {vHeader},
    data () {
      return {
        title: '내 지원정보',
        // steps icon
        docStatus: 'wait',
        interviewStatus: 'wait',
        finalStatus: 'wait',
        // steps desc
        docDesc: '',
        interDesc: '',
        finalDesc: '',

        status: '', // user status (미제출, 제출 완료, 서류 불합격, 서류 합격, 최종 불합격, 최종 합격)
        interviewPlace: '',
        deadline: '', 
        message: '',
        confirmedInterviewTime: '',
        active: 1, // 서류 진행상황 (step 에 binding 함) (~과정 진행 중 및 상태 그림)
      }
    },
    created () {
      // 모르고 새로고침 눌렀을 시 sessionStorage 에서 가져옴.
      if (this.$store.state.token === '' && sessionStorage.getItem('user_token')) {
        this.$store.state.token = sessionStorage.getItem('user_token')
        this.$store.state.applicantIdx = sessionStorage.getItem('user_idx')
      }
    },
    mounted () {
      const loading = this.$loading({lock: true, text: '로딩 중'})
      this.$store.dispatch('getApplicantStatus')
      .then((res) => {
        this.deadline = this.moment(res.deadline).format('YYYY-MM-DD / hh:mm');
        this.interviewPlace = res.interviewPlace;
        this.confirmedInterviewTime = res.confirmedInterviewTime;
        loading.close()
        if(!res.isSubmit){
          this.status = '미제출'
          this.docDesc = '서류 전형 진행 중'
          this.message = `지원서가 아직 제출되지 않았습니다.\n\n마감기한 (${this.deadline}) 까지 제출을 완료해주세요.`
          return;
        }

        if(res.isApplicationPass === null){
          this.status = '제출 완료'
          this.docDesc = '서류 전형 진행 중'
          this.active = 1
          this.docStatus = 'finish'
          this.message = `지원서를 제출 하셨습니다.\n\n서류 합격 여부 및 면접시간은 발표일 (${this.deadline}) 후 이곳에서 확인하실 수 있습니다.`
          return;
        } else if (!res.isApplicationPass) {
          this.status = '서류 불합격'
          this.message = `서류모집에 불합격하였습니다.\n\n다음번에 좋은 기회로 만날 수 있길 바랍니다.\n\n지원해주셔서 감사합니다.`
          return;
        } else {
          this.status === '서류 합격'
          this.interDesc = '면접 전형 진행 중'
          this.active = 2
          this.docStatus = 'success'
          this.interviewStatus = 'finish'
          this.message = `서류모집에 합격하였습니다.\n\n면접 시간과 장소는 아래와 같습니다. 정장이 아닌 편한 복장으로 참석해주시면 감사하겠습니다.\n\n${this.interviewPlace}, ${this.confirmedInterviewTime}`
          return;
        }

        if(!res.isFinalPass){
          this.status = '최종 불합격'
          this.finalDesc = '최종 결과 안내'
          this.message = `면접과정을 통과하지 못했습니다.\n\n다음번에 좋은 기회로 만날 수 있길 바랍니다.\n\n지원해주셔서 감사합니다.`
          return;
        } else {
          this.status = '최종 합격'
          this.finalDesc = '최종 결과 안내'
          this.active = 3
          this.docStatus = 'success'
          this.interviewStatus = 'success'
          this.finalStatus = 'success'
          this.message = `최종 합격하였습니다. 축하합니다!\n\n발대식 및 오리엔테이션은 ${this.openingTime} , 한국창의과학재단 11층 스카이라운지에서 진행 될 예정입니다.\n\n감사합니다.`
          return;
        }
      }).catch((e) => {
        loading.close()
        this.$notify.error({ message: "지원자 정보를 가져오는데 실패하였습니다."})
      })
    },
    methods: {
      removeConfirm () {
        this.$confirm('정말 디프만 지원을 포기하시겠습니까?\n 추후 재지원시 다시 가입하셔야 합니다', '주의!', {
          confirmButtonText: '네',
          cancelButtonText: '아니오',
          type: 'warning',
        }).then(() => {
          // Remove Applicant's all data
          const loading = this.$loading({lock: true, text: '삭제 중'})
          this.$store.dispatch('removeApplication')
            .then(()=> {
              loading.close()
              sessionStorage.removeItem('user_token')
              sessionStorage.removeItem('user_idx');
              this.$store.dispatch('removeStoreData')
              this.$router.push({name: 'intro'})
              this.$message({
                type: 'success',
                message: '삭제 완료',
              })
            })
            .catch((e) => {
              loading.close()
              if (e.response.status === 401) {
                this.$router.push({name: 'login'})
                this.$notify.info({
                  title: '접속 시간 만료',
                  message: '다시 로그인 해 주시기 바랍니다.',
                })
                return;
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '삭제를 취소였습니다.',
          })
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  #container {
    margin: auto;
    width: 550px;
  }

  #contents-wrapper {
    background-color: white
  }

  #step-box {
    background-color: #2b2b2b;
    height: 150px;
    padding: 10px 50px 0 50px;
    .el-step__title {
      font-size: 12px !important;
    }
  }

  #message-wrapper {
    background-color: #595959;
    display: inline-block;
    #message-box {
      white-space: pre-wrap;
      margin: 50px 90px;
      width: 370px;
      display: block;
      font-size: 13px;
      color: white;
    }
  }

  #info-wrapper {
    padding: 50px 1px 1px 1px;
    #info-box {
      margin: auto;
      width: 390px;
      label {
        font-size: 12px;
      }
      #result-box {
        margin-top: 10px;
        border: 1px solid #c4c4c4;
        padding: 20px 10px 20px 10px;
        font-size: 15px;
        display: block;

        #season {
          display: inline-block;
          margin-left: 20px;
        }
        #result {
          display: inline-block;
          float: right;
          margin-right: 20px;
        }
      }
    }
    #buttons {
      text-align: center;
      margin-top: 67px;
      margin-bottom: 34px;
      a {
        width: 100px;
        height: 40px;
        display: inline-block;
        font-size: 12px;
        cursor: pointer;
        &#edit-btn {
          background-color: white;
          color: #2b2b2b;
          margin-right: 10px;
          border: 1px solid #2b2b2b;
        }
        &#remove-btn {
          background-color: #2b2b2b;
          color: white;
        }
      }
    }
    .buttons {
      text-align: center;
      margin: 70px 0 30px 0;
      .button {
        text-align: center;
        font-size: 12px !important;
        display: inline-block;
        cursor: pointer;
        /* a tag text underline 삭제 */
        text-decoration: none;
        padding: 14px 37.5px;
        font-size: 16px;
        border: 1px solid;
        border-color: #2b2b2b;
        border-radius: 3px;
      }
      #edit-btn {
        background-color: white;
        color: #2b2b2b;
        margin-right: 10px;
        border: 1px solid #2b2b2b;
      }
      #remove-btn {
        background-color: #2b2b2b;
        color: white;
      }
    }

  }
</style>
