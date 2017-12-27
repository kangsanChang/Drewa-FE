<template>
  <div id="container">
    <router-link id="back" title="상세보기" :to="{name: 'settings'}"><i class="el-icon-d-arrow-left"></i><span>뒤로가기</span></router-link>
    <h1 id="title">모집 생성 및 수정</h1>
    <div id="control-box">
      <el-button-group>
        <el-button id="download">이전 기수 설정 불러오기</el-button>
        <el-button id="save">저장</el-button>
        <el-button id="initialize" @click="resetForm()">초기화</el-button>
        <el-button id="delete">삭제</el-button>
      </el-button-group>
    </div>
    <div id="setting-box-wrapper">
      <div id="basic-setting-box" class="setting-box">
        <el-form label-position="top" ref="basicSettings">
          <el-form-item label="모집 기수" id="season" class="inline-box">
            <el-input type="text" v-model="settingForm.season"><template slot="append">기</template></el-input>
          </el-form-item>
          <el-form-item label="면접관 초대 코드" id="invitationCode" class="inline-box">
            <el-input type="text" v-model="settingForm.invitationCode"></el-input>
          </el-form-item>
          <el-form-item label="서류 모집 기간" id="applicationDue">
            <el-date-picker
              v-model="settingForm.applicationPeriod"
              type="datetimerange"
              range-separator="~"
              start-placeholder="서류 모집 시작일"
              end-placeholder="서류 모집 마감일"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="서류 발표일" class="inline-box">
            <el-date-picker
              v-model="settingForm.announcementDate.application"
              type="datetime"
              placeholder="날짜, 시간 선택">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="최종 발표일" class="inline-box">
            <el-date-picker
              v-model="settingForm.announcementDate.final"
              type="datetime"
              placeholder="날짜, 시간 선택">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="면접일 선택">
            <el-date-picker
              v-model="settingForm.pickDate"
              type="date">
            </el-date-picker>
            <el-button @click="addDate">추가</el-button>
          </el-form-item>
          <el-form-item label="면접 세부설정" id="interview-time-box">
            <div v-for="(elem, dateIndex) in settingForm.interviewSchedule" :key="dateIndex" class="time-pick-box">
              <div class="subtitle-box">
                <span>{{ dateFormat(elem.date) }}</span>
                <el-button @click="removeDate(dateIndex)" size="mini" icon="el-icon-delete" type="info"></el-button>
              </div>
              <div class="interview-setting-box">
                <span>면접장소</span>
                <div>
                  <el-input type="text" size="mini" v-model="settingForm.interviewSchedule[dateIndex].place"></el-input>
                </div>
                <span>면접 시간</span>
                <div class="time-tag-box">
                  <el-tag v-for="(time, timeIndex) in settingForm.interviewSchedule[dateIndex].times" :key="timeIndex" closable @close="removeTime(dateIndex, timeIndex)" size="medium">{{ time }}</el-tag>
                </div>
                <el-time-select
                  v-model="settingForm.pickTime[dateIndex]"
                  :picker-options="{
                    start: '09:00',
                    step: '00:30',
                    end: '19:30'
                  }"
                  placeholder="시간 선택"
                  size="mini">
                </el-time-select>
                <el-button size="mini" @click="addTime(elem, dateIndex)">추가</el-button>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="메인 페이지 타이틀">
            <el-input type="text" v-model="settingForm.mainTitle"></el-input>
          </el-form-item>
          <el-form-item label="메인 페이지 설명">
            <el-input
              type="textarea"
              :autosize="{ minRows:5 }"
              resize="none"
              v-model="settingForm.mainDescription">
            </el-input>
          </el-form-item>
          <el-form-item label="메인 페이지 포스터">
            <div id="poster-upload-box">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :show-file-list="false"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="settingForm.mainPosterUrl" alt="poster image">
              </el-dialog>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div id="message-setting-box" class="setting-box">
        <el-form label-position="top" ref="messageSettings">
          <el-form-item class="question-input" label="공통 질문">
            <div v-for="(commonQ, index) in settingForm.questions.common" :key="index">
              <el-tag closable @close="removeQuestion('common', index)" type="info">{{ commonQ }}</el-tag>
            </div>
            <el-input type="text" v-model="settingForm.inputQuestion.common"></el-input>
            <el-button class="addQuestionBtn" @click="addQuestion('common')">추가</el-button>
          </el-form-item>
          <el-form-item class="question-input" label="개발자 질문">
            <div v-for="(developerQ, index) in settingForm.questions.developer" :key="index">
              <el-tag closable @close="removeQuestion('developer', index)" type="info">{{ developerQ }}</el-tag>
            </div>
            <el-input type="text" v-model="settingForm.inputQuestion.developer"></el-input>
            <el-button class="addQuestionBtn" @click="addQuestion('developer')">추가</el-button>
          </el-form-item>
          <el-form-item class="question-input" label="디자이너 질문">
            <div v-for="(designerQ, index) in settingForm.questions.designer" :key="index">
              <el-tag closable @close="removeQuestion('designer', index)" type="info">{{ designerQ }}</el-tag>
            </div>
            <el-input type="text" v-model="settingForm.inputQuestion.designer"></el-input>
            <el-button class="addQuestionBtn" @click="addQuestion('designer')">추가</el-button>
          </el-form-item>
          <el-form-item label="지원자 제출 상태 메시지">
            <el-input
              type="textarea"
              :autosize="{ minRows:3 }"
              resize="none"
              v-model="settingForm.infoMessages.submitted">
            </el-input>
          </el-form-item>
          <el-form-item label="지원자 미제출 상태 메시지">
            <el-input
              type="textarea"
              :autosize="{ minRows:3 }"
              resize="none"
              v-model="settingForm.infoMessages.notSubmitted">
            </el-input>
          </el-form-item>
          <el-form-item label="지원자 서류 합격 상태 메시지">
            <el-input
              type="textarea"
              :autosize="{ minRows:3 }"
              resize="none"
              v-model="settingForm.infoMessages.applicationAccept">
            </el-input>
          </el-form-item>
          <el-form-item label="지원자 서류 탈락 상태 메시지">
            <el-input
              type="textarea"
              :autosize="{ minRows:3 }"
              resize="none"
              v-model="settingForm.infoMessages.applicationReject">
            </el-input>
          </el-form-item>
          <el-form-item label="지원자 최종 합격 상태 메시지">
            <el-input
              type="textarea"
              :autosize="{ minRows:3 }"
              resize="none"
              v-model="settingForm.infoMessages.finalAccept">
            </el-input>
          </el-form-item>
          <el-form-item label="지원자 최종 탈락 상태 메시지">
            <el-input
              type="textarea"
              :autosize="{ minRows:3 }"
              resize="none"
              v-model="settingForm.infoMessages.finalReject">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="finish-box">
      <el-button-group>
        <el-button id="finish">모집 종료 및 박제</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dialogImageUrl: '',
      dialogVisible: false,
      settingForm: {
        season: '',
        mainTitle: '',
        mainDescription: '',
        mainPosterUrl: '',
        applicationPeriod: [],
        announcementDate: {
          application: '',
          final: '',
        },
        pickDate:'',
        pickTime:[],
        interviewSchedule: [],
        inputQuestion:{
          common: '',
          developer: '',
          designer: '',
        },
        questions: {
          common: [],
          developer: [],
          designer: [],
        },
        infoMessages: {
          submitted: '',
          notSubmitted: '',
          applicationAccept: '',
          applicationReject: '',
          finalAccept: '',
          finalReject: '',
        },
        invitationCode: '',
      }
    }
  },
  mounted(){
    this.$store.dispatch('getRecruitmentInfo', {season:this.$route.params.season})
    .then((res) => {
      const data = res.data.data;
      delete data.interviewGroup
      this.assign(this.settingForm, data);
    })
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    dateFormat(date){
      return this.moment(date).format('YYYY/MM/DD (dddd)');
    },
    addDate(){
      const date = this.settingForm.pickDate
      if((date == null) || (date == '')){
        return this.$notify.error('면접일을 선택하지 않았습니다.');
      }
      const isDuplicate = this.settingForm.interviewSchedule.some((elem) => {
        if(elem.date === date){ return true }
        return false;
      })
      if(isDuplicate){
        return this.$notify.error('중복된 날짜가 있습니다.');
      }
      this.settingForm.interviewSchedule.push({date, place:'', times:[]});
      this.settingForm.interviewSchedule.sort((a, b)=> {
        return a.date - b.date
      });
      return;
    },
    removeDate(index){
      return this.settingForm.interviewSchedule.splice(index, 1)
    },
    addTime(interviewDate, dateIndex){
      const inputTime = this.settingForm.pickTime[dateIndex];
      if(inputTime == null){
        return this.$notify.error('시간을 선택하지 않았습니다.');
      }
      if(interviewDate.times.includes(inputTime)){
        return this.$notify.error('중복된 시간이 있습니다.');
      }
      interviewDate.times.push(inputTime);
      interviewDate.times.sort((a,b)=>{
        return a.localeCompare(b);
      })
      return;
    },
    removeTime(dateIndex, timeIndex){
      return this.settingForm.interviewSchedule[dateIndex].times.splice(timeIndex, 1)
    },
    addQuestion(type){
      const inputQuestion = this.settingForm.inputQuestion[type]
      if(!inputQuestion){
        return this.$notify.error('질문을 입력하지 않았습니다.');
      }
      if(this.settingForm.questions[type].includes(inputQuestion)){
        return this.$notify.error('중복된 질문이 있습니다.')
      }
      return this.settingForm.questions[type].push(inputQuestion);
    },
    removeQuestion(type, index){
      return this.settingForm.questions[type].splice(index, 1)
    }
  }
}
</script>


<style lang="scss" scoped>
  #container{
    padding: 0 20px;

    #title {
      font-size: 20px;
    }
    #back {
      font-size: 20px;
      text-decoration: none;
      color: black;
      span {
        display: inline-block;
        margin-left: 5px;
        margin-bottom: 20px;
        font-size: 15px;
      }
    }
  }
  #control-box {
    margin: 20px 0;
  }
  #setting-box-wrapper{
    display: flex;
    justify-content: space-around;
  }
  .setting-box{
    display: inline-block;
    width: 45%;
    min-width: 700px;
    padding: 0 20px;
  }
  .el-form-item{
    &#season{
      width: 110px;
    }
    &#invitationCode{
      width: 300px;
      margin-left: 40px;
    }
    &.inline-box{
      display: inline-block;
    }
    &#interview-time-box{
      label {
        display: block;
      }
    }
    &#poster-upload-box{
      width:300px;
    }
    .interview-setting-box {
      margin-left: 20px;
    }
    .time-pick-box{
      float: left;
      width: 100%;
      margin-bottom: 20px;
      margin-left: 20px;
      .el-input{
        width: 220px;
      }
      .subtitle-box {
        span {
          margin-right: 10px;
        }
      }
      .time-tag-box {
        width: 50%;
        margin-bottom: 10px;
        .el-tag {
          margin-right: 5px;
        }
      }
    }
    // message setting box
    &.question-input{
      width: 100%;
      .el-input {
        width:300px;
      }
      .el-tag {
        margin-bottom: 10px;
      }
    }
  }

  #finish-box{
    margin: 50px 0;
    text-align: center;
    #save{
      display: block;
      text-align: center;
    }
  }
</style>
