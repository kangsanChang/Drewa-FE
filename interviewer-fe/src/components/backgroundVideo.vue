<template>
  <section id="video-container">
    <video autoplay loop>
      <source :src="videoSrcMp4" type="video/mp4">
    </video>
  </section>
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
    height: 100vh;
    overflow: hidden;    
  }
  #video-container video {
      object-fit: cover;
      width: 100%;
      height: 100%;    
  }
</style>
