<template>
  <div id="main-container">
    <div id="info-box">
      <h1>
        전체
      </h1>
      <span>{{applicants.length}}</span>
    </div>
    <div id="table-container">
      <el-table :data="applicants" height="800" style="width: 100%" :row-key="getRowKeys">
        <el-table-column
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
  mounted(){
     this.$store.dispatch('getApplications')
      .then((res) => {
        this.applicants = res.data.data;
      })
  },
}
</script>

<style lang="scss" scoped>
  #main-container {
    padding-top: 20px;
    margin: auto;
    width: 1300px;
  }
  #info-box {
    h1 {
      display: inline-block;
      margin: 0;
    }
    span {
      display: inline-block;
      font-size: 10px;
    }
  }
  #table-container {
    margin-top: 24px;
    .showApplicationBtn {
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
