<template>
  <div id="container">
    <div id="contents-wrapper">
        <div id="poster">
            <img src="../assets/depromeet-poster3.jpg">
        </div>
        <div id="notice-wrapper">
            <div id="notice-box">
                <div id="title">
                    <h2>{{ title }}</h2>
                </div>
                <div>
                    <p class="desc">{{ description }}</p>
                </div>
                <div class="buttons-wrapper">
                    <div class="buttons">
                        <a href="/login" class="button" id="find-btn">지원서 조회</a>
                        <a href="/join" class="button" id="create-btn">신규 작성</a>
                    </div>
                </div>                    
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Config from './../config'

export default {
  name: 'intro',
  data () {
    return {
      title: '디프만 4기 회원을 모집합니다',
      description : Config.DESCRIPTION,
    }
  }
}
</script>

<style lang="scss" scoped>
#container {
    /* auto 로 해야 크기 변화에 따라가면서 비율(grid offset = > 중앙) 유지 */
    margin: auto;
    width: 700px;
}

#notice-wrapper {
  background-color: white;
  padding: 30px 0;

  #notice-box {
      width: 400px;
      margin: auto;
  }
}

#contents-wrapper {
    margin: auto;
    width: 700px;
}

#title {
    margin: 20px 0 30px 0;
    text-align: center;
    h2 {
        margin-top: 0px;
    }
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
  white-space: pre-wrap;
  // 폰트 사이즈에 맞추어 비율로 동작
  line-height: 1.5;
}

.buttons-wrapper {
    margin-top: 70px;
    margin-bottom: 20px;
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