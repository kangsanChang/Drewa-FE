<template>
  <div id="container">
    <div v-if="info.season" id="contents-wrapper">
      <div id="poster">
        <img :src="info.mainPosterUrl">
      </div>
      <div id="notice-wrapper">
        <div id="notice-box">
          <div id="title">
            <h2>{{ info.mainTitle }}</h2>
          </div>
          <div>
            <p class="desc">{{ info.mainDescription }}</p>
          </div>
          <div class="buttons-wrapper">
            <div class="buttons">
              <a href="/login" class="button" id="find-btn">지원서 조회</a>
              <a href="/signup" class="button" id="create-btn">신규 작성</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else id="contents-wrapper">
      <h1>현재 모집중이 아닙니다.</h1>
    </div>
  </div>
</template>

<script>
  import Config from './../config'

  export default {
    name: 'intro',
    data () {
      return {
        info: {
          mainTitle: '',
          mainDescription: '',
          season: '',
          mainPosterUrl: ''
        }
      }
    },
    mounted () {
      if (typeof(Storage) === 'undefined') {
        alert('최신 브라우저를 설치한 후 이용해주시기 바랍니다.')
      }
      this.$store.dispatch('getMainRecruitment')
        .then((res) => {
          this.info = res;
        })
        .catch((e)=> {
          this.$notify.error('알 수 없는 오류가 발생하였습니다.')
        })
    },
  }
</script>

<style lang="scss" scoped>
  #container {
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
