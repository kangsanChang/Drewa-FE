<template>
  <div id="main-container">
    <div id="info-box">
      <h1>
        전체
      </h1>
      <span>{{applicants.length}}</span>
    </div>
    <div id="control-box">
      <el-button v-if="userType==='admin'" type="success" plain @click="savePass()">합격자 저장하기 <i class="el-icon-success"></i></el-button>
    </div>
    <div id="table-container">
      <el-table ref="applicationTable" :data="applicants" height="800" style="width: 100%" :row-key="getRowKeys" @selection-change="handleSelectionChange">
        <el-table-column
          v-if="userType==='admin'"
          prop="isApplicationPass"
          type="selection"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          type="index"
          label="#"
          sortable
          width="70"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="userName"
          label="이름"
          sortable
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="userPosition"
          label="직군"
          sortable
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="averagePoint"
          label="평균 점수"
          sortable
          width="300"
          align="center"
        >
        <template slot-scope="props">
          <el-rate v-model="props.row.averagePoint" 
          show-score  
          text-color="#ff9900"
          score-template="({value})"
          disabled>
          </el-rate>
        </template>
        </el-table-column>
        <el-table-column
          prop="evalCount"
          label="평가자 수"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          v-if="userType!=='admin'"
          prop="myPoint"
          label="내 점수"
          width="300"
          align="center"
        >
          <template slot-scope="props">
            <el-rate v-model="props.row.myPoint" disabled></el-rate>
          </template>
        </el-table-column>
        <el-table-column label="지원서" align="center">
          <template slot-scope="props">
            <router-link tag="button" class="showApplicationBtn" title="보기" :to="{path: '/eval-application/'+ props.row.applicantIdx}">보기</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      applicants: [],
      getRowKeys(row) {
        return row.applicantIdx;
      }
    }
  },
  computed: {
    userType(){
      return this.$store.state.userType
    }
  },
  mounted(){
     this.$store.dispatch('getApplications')
      .then((res) => {
        this.applicants = res;
        if(this.userType === 'admin'){
          this.$nextTick(() => {
            this.initSelection()
          })
        }
      })
  },
  methods: {
    savePass(){
      const selected = this.applicants.filter(x => x.isApplicationPass === true)
      this.$confirm(`합격자를 저장 하시겠습니까? 총 ${selected.length}명의 합격자를 선택 하셨습니다.`, '확인', {
        confirmButttonText: '네',
        cancelButtonText: '취소',
        type: 'info'
      }).then(() => {
        this.$store.dispatch('postApplications', { applicants : this.applicants })
        .then((res) => {
          this.$notify.success('서류 합격자를 저장 하였습니다.');
        })
      })
    },
    initSelection() {
      const passed = this.applicants.filter(x => x.isApplicationPass === true)
      passed.forEach(row => {
        this.$refs.applicationTable.toggleRowSelection(row);
      });
    },
    handleSelectionChange(selected) {
      this.applicants.forEach((applicant) => {
        applicant.isApplicationPass = false;
      })
      selected.forEach((applicant) => {
        applicant.isApplicationPass = true;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #main-container {
    padding-top: 20px;
    margin: auto;
    width: 1300px;
  }
  #info-box {
    display: inline-block;
    h1 {
      display: inline-block;
      margin: 0;
    }
    span {
      display: inline-block;
      font-size: 10px;
    }
  }
  #control-box {
    display: inline-block;
    float: right;
    margin-bottom: 20px;
  }
  #table-container {
    margin-top: 24px;
    .showApplicationBtn {
      &:focus {
        outline: none;
      }
      cursor: pointer;
      width: 66px;
      height: 28px;
      background-color: #fa5455;
      color: white;
      border: 0;
      border-radius: 3px;
    }
  }
</style>
