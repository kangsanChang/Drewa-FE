<template>
  <div>
    <h1>hello world!</h1>
    <h2>This is applicant No.{{ applicantIdx }}</h2>
  </div>
</template>

<script>
export default {
  data(){
    return {
      applicantIdx: '',
    }
  },
  mounted(){
     this.applicantIdx = this.$route.params.applicantIdx;
  },
}
</script>

