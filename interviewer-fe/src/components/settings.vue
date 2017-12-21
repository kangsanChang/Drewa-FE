<template>
  <div id="settings-container">
    <h1 id="title">모집 설정 &#x1F680;</h1>
    <button id="create-button" @click="newSetting">새로운 모집 생성하기 ✨</button>
    <div id="current-setting-box">
      <h3>현재 진행중인 모집</h3>
      <card title="4기 모집 설정"></card>
    </div>
    <div id="prev-setting-box">
      <h3>이전 모집</h3>
      <div id="setting-cards">
        <card title="1기 모집 설정"></card>
        <card title="2기 모집 설정"></card>
        <card title="3기 모집 설정"></card>
        <card title="4기 모집 설정"></card>
        <card title="5기 모집 설정"></card>
        <card title="6기 모집 설정"></card>
        <card title="7기 모집 설정"></card>
        <card title="8기 모집 설정"></card>
        <card title="9기 모집 설정"></card>
        <card title="10기 모집 설정"></card>
        <card title="11기 모집 설정"></card>
      </div>
    </div>
  </div>
</template>

<script>
import card from './settingCard.vue'
export default {
  components: { card },
  methods: {
    newSetting(){
      this.$router.push({name:'settingForm'})
    }
  }
}
</script>

<style lang="scss" scoped>
  h1#title {
    font-size: 25px;
    margin-top: 0px;
  }
  #settings-container {
    padding: 10px 30px;
    #current-setting-box {
      margin-bottom: 40px;
    }
    #create-button {
      margin-right: 30px;
      float: right;
      padding: 10px;
      font-size: 20px;
      margin-bottom: 20px;
      background-color: black;
      color: white;
      cursor: pointer;
    }
    #setting-cards{
      width: 80%;
    }
  }
</style>
