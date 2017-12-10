<template>
  <div id="video-container">
    <video autoplay loop>
      <source :src="videoSrcMp4" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: 'backgroundVideo',
  computed: {
    videoSrcMp4(){
      return require('../assets/whiteKeyboard.mp4')
    }
  }
}
</script>

<style lang="scss" scoped>
  #video-container {
    width: 100%;
    height: 100%;
    overflow: hidden;    
  }
  #video-container video {
    position: fixed; right: 0; bottom: 0;
    min-width: 100%; min-height: 100%;
    width: auto; height: auto; z-index: -100;
    background-size: cover;
  }
</style>
