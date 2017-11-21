<template>
<div id="container">
    <el-col :span="22" :offset="1">
        <v-header :title="title"></v-header>
        <div id="basic-info-wrapper" class="wrapper">
            <h3>기본 인적사항</h3>
            <div id="basic-info-box" class="box">
                <el-form :model="basicInfoForm" ref="basicInfoForm" :rules="rules">
                    <el-form-item prop="name">
                        <el-input v-model="basicInfoForm.name" placeholder="이름"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div id="cover-letter-wrapper" class="wrapper">
            <h3>자기소개서</h3>
        </div>
        <div id="attached-document-wrapper" class="wrapper">
            <h3>첨부 자료</h3>
        </div>
        <div id="interview-time-wrapper" class="wrapper">
            <h3>면접 시간 선택</h3>
        </div>
    </el-col>
</div>
</template>

<script>
import Config from '../config'
import API from './../api/DrewaAPI'

import vHeader from './header.vue'

export default {
    name: 'applicationForm',
    components : { vHeader },
    data(){
        return {
            season : '4',
            basicInfoForm: {
                
            }
        }
    },
    computed: {
        title() {
            return `디프만 ${this.season}기 지원서 작성하기`
        }
    },
}
</script>

<style lang="scss" scoped>
#container {
    margin: auto;
    max-width: 1250px;
    min-width: 960px;
}

.wrapper {
    background-color: white;
    margin-bottom: 7px;
    padding: 0 40px 40px 40px;

    h3 {
        display: inline-block;
        margin: 30px 0 20px 0;
    }
    &#basic-info-wrapper {
        margin-top: 10px;
    }
}
</style>

