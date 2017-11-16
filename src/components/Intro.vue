<template>
  <div id="container">
    <div id="wrapper">
        <el-row>
            <el-col :span="12" :offset="6">
                <div id="poster">
                    <img src="../assets/depromeet-poster3.jpg">
                </div>
                <el-row id="notice-wrapper">
                    <el-col :span="16" :offset="4">
                        <div id="title">
                            <h2>{{ title }}</h2>
                        </div>
                        <div>
                            <p class="desc">{{ description }}</p>
                        </div>
                        <div class="buttons-wrapper">
                            <div class="buttons">
                                <router-link to="/login" class="button" id="find-btn">지원자 로그인</router-link>
                                <a href="/join" class="button" id="create-btn">지원자 등록</a>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'intro',
  data () {
    return {
      title: '디프만 3기 회원을 모집합니다',
      description : '✔ 디프만은 20대 디자이너, 프로그래머 네트워크로서 디자이너와 프로그래머 간의 생산적인 모임을 지향합니다.\n\n✔ 모집 일정\n- 8/16(수) ~ 8/30(수) 서류 지원 마감\n- 8/31(목) 서류합격자 발표\n- 9/2(토)~9/3(일) 면접\n- 9/6(수) 최종합격자 발표\n\n✔ 지원 방법\n1. www.depromeet.com 디프만 모집 홈페이지에 접속한다.\n2. 계정 생성 후 지원서를 작성한다.\n\n✔ 지원 문의 \n- admin@depromeet.com\n- 카카오톡 플러스친구 "디프만"',
    }
  }
}
</script>

<style lang="scss" scoped>
#wrapper {
    /* auto 로 해야 크기 변화에 따라가면서 비율(grid offset = > 중앙) 유지*/
    margin: auto;
    max-width: 1250px;
    min-width: 800px;
}

#notice-wrapper {
  background-color: white;
  padding: 30px 0;
}

#title {
  text-align: center;
}

#poster img {
  /* 비율 유지하며 box 크기 그대로 들어 감 */
  max-width: 100%;
  height: auto;
}
.main {
  background-color: white;
}
.enter {
  margin-top: 50px;
}
.desc {
  white-space: pre-line;
}

.buttons-wrapper {
    margin-top: 40px;
}

.buttons {
    text-align: center;
}

.button {
    text-align: center;

    /* a tag text underline 삭제 */
    text-decoration: none;

    padding: 14px 21px 14px 21px;
    font-size: 16px;
    border: 1px solid;
    border-color: #2b2b2b;
    border-radius: 3px;
    /* 부모 선택자 reference : & 
    &#find-btn 은 .button#find-btn 을 의미.
    */
    &#find-btn {
    background-color: white;
    color: black;
    margin-right: 10px;
    }

    &#create-btn {
    padding: 14px 28px 14px 28px;
    background-color: #2b2b2b;
    color: white;
    }
}

</style>