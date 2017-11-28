<template>
  <div id="container">
      <v-header :title="title"></v-header>
      <div id="contents-wrapper">
        <div id="step-box">
            <el-steps finish-status="success">
                <el-step title="서류" description="서류 전형 진행 중"></el-step>
                <el-step title="면접"></el-step>
                <el-step title="최종"></el-step>
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
                    <span id="result">미제출</span>
                </div>
            </div>
            <div class="buttons" align="center">
                <router-link :to="{name: 'application'}" class="button" id="edit-btn">수정</router-link>
                <a class="button" id="remove-btn" @click="removeConfirm">삭제</a>
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
  components : { vHeader },
  data(){
      return {
          title: "내 지원정보",
          status: "", // user status (제출, 미제출, 서류 불합격, 서류 합격, 최종 불합격, 최종 합격)
          message: "지원서가 아직 제출되지 않았습니다.\n마감기한(2017.2.14 밤12시) 까지 제출을 완료해주세요.", // 공지사항 ()
          deadline: "", // 서류 마감 기한
          fixedTime: "", // 면접 확정 시간
          active: "", // 서류 진행상황 (step 에 binding 함) (~과정 진행 중 및 상태 그림)
      }
  },
  methods: {
      removeConfirm(){
          this.$confirm('정말 디프만 지원을 포기하시겠습니까?', '주의!', {
          confirmButtonText: '네',
          cancelButtonText: '아니오, 잘못 눌렀습니다.',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '삭제 완료'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '휴~ 삭제 취소'
          });
        });
      }
  }
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
