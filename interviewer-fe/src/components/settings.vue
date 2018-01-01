<template>
  <div id="settings-container">
    <h1 id="title">⚙️ 모집 설정</h1>
    <button id="create-button" @click="newSetting">새로운 모집 생성하기 🚀</button>
    <div id="current-setting-box">
      <h3>현재 진행중인 모집</h3>
      <card v-for="(elem, index) in this.seasons" v-if="elem.isFinished===false" :key="index" :title="cardTitle(elem.season)" :season="elem.season"></card>
    </div>
    <div id="prev-setting-box">
      <h3>이전 모집</h3>
      <div id="setting-cards">
        <card v-for="(elem, index) in this.seasons" v-if="elem.isFinished===true" :key="index" :title="cardTitle(elem.season)" :season="elem.season"></card>
      </div>
    </div>
  </div>
</template>

<script>
import card from './settingCard.vue'
export default {
  components: { card },
  data(){
    return{
      seasons: []
    }
  },
  computed: {
  },
  methods: {
    cardTitle(season){
      return `${season}기 모집 설정`
    },
    newSetting(){
      const onSeason = this.seasons.some((elem)=> {
        if(elem.isFinished === false ){ return true }
        return false;
      })
      if(onSeason){
        return this.$notify.error('현재 진행중인 시즌이 있습니다.')
      } else {
        this.$router.push({name:'settingForm'})
      }
    }
  },
  mounted(){
    const seasons = this.$store.dispatch('getRecruitmentSeasons')
      .then((res) => {
        res.sort((a,b) => { return b.season - a.season; })
        this.seasons = res;
      })
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
