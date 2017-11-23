<template>
    <div id="container">
        <div id="contents-wrapper">
            <v-header :title="title"></v-header>
            <div id="basic-info-wrapper" class="wrapper">
                <h3 class="wrapper-title">기본 인적사항</h3>
                <div id="basic-info-box" class="box">
                    <el-form :model="basicInfoForm" ref="basicInfoForm" :rules="rules">
                        <el-form-item id="name" prop="name">
                            <el-input v-model="basicInfoForm.name" placeholder="이름"></el-input>
                        </el-form-item>
                        <el-form-item id="gender" class="selector">
                            <el-select v-model="basicInfoForm.gender" placeholder="성별">
                                <el-option label="남자" value="male"></el-option>
                                <el-option label="여자" value="female"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item id="birth" class="half endcol" prop="birth">
                            <el-input v-model="basicInfoForm.birth" placeholder="생년월일 (예: 950222)"></el-input>
                        </el-form-item>
                        <el-form-item id="residence" class="half">
                            <el-input v-model="basicInfoForm.residence" placeholder="현 거주지 (시/도, 군/구)"></el-input>
                        </el-form-item>
                        <el-form-item id="phone" class="half endcol" prop="birth">
                            <el-input v-model="basicInfoForm.phone" placeholder="휴대전화 ( - 없이 입력)"></el-input>
                        </el-form-item>
                        <el-form-item id="job" class="selector">
                            <el-select v-model="basicInfoForm.job" placeholder="직업">
                                <el-option label="학생" value="student"></el-option>
                                <el-option label="직장인" value="worker"></el-option>
                                <el-option label="기타" value="guitar"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item id="company" prop="company">
                            <el-input v-model="basicInfoForm.company" placeholder="학교명 또는 직장명"></el-input>
                        </el-form-item>
                        <el-form-item id="work" class="endcol" prop="work">
                            <el-input v-model="basicInfoForm.work" placeholder="전공 또는 직무"></el-input>
                        </el-form-item>
                        <el-form-item id="position" class="selector">
                            <el-select v-model="basicInfoForm.position" placeholder="지원분야">
                                <el-option label="디자이너" value="designer"></el-option>
                                <el-option label="개발자" value="developer"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item id="knownFrom" class="endcol" prop="knownFrom">
                            <el-input v-model="basicInfoForm.knownFrom" placeholder="모집 공고를 어디서 보았나요?"></el-input>
                        </el-form-item>
                        <el-form-item id="personalUrl" class="full endcol" prop="personalUrl">
                            <el-input v-model="basicInfoForm.personalUrl" placeholder="(선택) 블로그 or Github or 홈페이지 URL"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div id="photo-box">
                    <div id="photo-upload-box" class="box">
                        <el-upload 
                        class="avatar-uploader" 
                        :action="pictureUploadUrl" 
                        :show-file-list="false" 
                        :on-success="handleAvatarSuccess" 
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                    <div id="picture-upload-desc">프로필 사진<br>(jpg, png 최대 2MB)</div>
                </div>
            </div>
            <div id="cover-letter-wrapper" class="wrapper">
                <h3 class="wrapper-title">자기소개서</h3>
                <div v-for="(question, index) in questions" :key="index" class="text-box">
                    <h4 class="title">{{index + 1}}. {{ question }}</h4>
                    <el-input
                    type="textarea"
                    resize="none"
                    :rows="15"
                    v-model="answers[index]"
                    >
                    <!-- 필요하면 @blur attribute 사용 -->
                    </el-input>
                </div>
            </div>
            <div id="attached-document-wrapper" class="wrapper">
                <h3 class="wrapper-title">첨부 자료</h3>
                <span class="subtitle">(선택) 추가 자료나 포트폴리오를 첨부해 주세요.</span>
                <div id="portfolio-upload-box">
                    <el-upload
                    class="upload-portfolio"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    >
                    <!-- :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :file-list="fileList" -->
                    <el-button size="small" type="primary">파일 업로드</el-button>
                    <div slot="tip" class="el-upload__tip">30MB 이하의 PDF파일</div>
                    </el-upload>
                </div>
            </div>
            <div id="interview-time-wrapper" class="wrapper">
                <h3 class="wrapper-title">면접 시간 선택</h3>
                <span class="subtitle">면접 가능한 시간을 모두 선택해 주세요.</span>
                <div v-for="(interviewDay, index) in interviewTimes" :key="index" class="interview-select-box">
                    <span>{{interviewDay.date}}</span>
                    <el-checkbox-group v-model="interviewAvaliableTimes">
                        <el-checkbox v-for="(time, index) in interviewDay.times" :key="index" :label="interviewDay.date+'-'+time" border>{{time}}</el-checkbox>
                    </el-checkbox-group>
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
    name: 'applicationForm',
    components : { vHeader },
    data(){
        return {
            season : '4',
            imageUrl : "",
            questions : [],
            answers : [],
            interviewTimes : [],
            interviewAvaliableTimes : [],
            basicInfoForm: {
                name:"",
                gender:"",
                birth:"",
                residence:"",
                phone:"",
                job:"",
                company:"",
                work:"",
                position:"",
                knownFrom:"",
                personalUrl:"",
            },
            rules: {

            }
        }
    },
    computed: {
        title() {
            return `디프만 ${this.season}기 지원서 작성하기`
        },
        pictureUploadUrl() {
            return `/applicants/${ this.$store.state.applicantIdx }/application/picture`
        },
        portfolioUploadUrl() {
            return `/applicants/${ this.$store.state.applicantIdx }/application/portfolio`
        }
    },
    mounted(){
        this.questions = ['지원 동기', '협업 경험', '기억에 남는 프로젝트', '좋아하는 서비스',],
        this.answers = ["지원 동기 입니다 동기동기","협업 경험 입니다 협업협업","기억에 남는 프로젝트","좋아하는 서비스으으"],
        this.interviewTimes = [
            {date: '11/25/토', times: ['14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30']},
            {date: '11/26/일', times: ['14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30']},
        ]
        // API call 해서 Axios 로 가져와야 함.
        //        this.$axios.get('http://127.0.0.1:8003/api/test').then((response) => {
        //            console.log(response.body);
        //            this.users = response.body;
        //        }, function() {
        //            alert('hi');
        //        });
    },
    methods: {
        helloworld(it){
            // 블러 이벤트 발생 시 this.questions.answer 를 업데이트 하도록.
            // 이걸론 좀 부족한 것 같고... debounce 로 자동저장하는게 적절할듯..
            // _.debounce( function () )...
            console.log('blurblurblur hello world!!');
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isImage = file.type === ('image/jpeg' || 'image/png');
            const isLt3M = file.size / 1024 / 1024 < 3;

            if (!isImage) {
                this.$notify.error({
                    title: '이미지 형식 오류!',
                    message: '프로필 사진은 jpg 또는 png 확장자여야 합니다.'
                });
            }
            if (!isLt3M) {
                this.$notify.error({
                    title: '이미지 크기 오류!',
                    message: '이미지는 3MB 이하여야 합니다.'
                });
            }
            return isImage && isLt3M;
        }
    },
}
</script>

<style lang="scss" scoped>

#container {
    margin: auto;
    width: 960px;
}

#contents-wrapper {
    margin:auto;
    width: 870px;
}

.wrapper {
    background-color: white;
    margin-bottom: 7px;
    padding: 25px 40px 40px 40px;

    h3 {
        display: block;
        margin: 30px 0 20px 0;
    }

    .wrapper-title {
        margin: 0 0 25px 0;
    }
    span.subtitle {
        font-size: 13px;
        color: #a6a6a6;
    }
}

#basic-info-wrapper {
    margin-top: 10px;
    #basic-info-box {
        width: 550px;
        display: inline-block;

        .el-form-item {
            margin: 0 10px 8px 0;
            display: inline-block;
            float: left; // inline-block 의 기본 margin (잡히지도 않음) 을 제거하기 위함.

            // Customize input size
            &#name {
                width: 150px;
            }
            &#company {
                width: 190px;
            }
            &#work {
                width: 230px;
            }
            &#knownFrom {
                width: 430px;
            }
            &.full {
                width: 550px;
            }
            &.half {
                width: 270px;
            }
            &.selector {
                width: 110px;
            }
            &.endcol {
                margin-right: 0;
            }
            &#personalUrl {
                margin-bottom: 0;
            }
        }
    }

    #photo-box {
        display: inline-block;
        float: right;
        width: 150px;
        height: 239px;
    }

    #photo-upload-box {
        margin-bottom: 8px;
        float: right;
        display: inline-block;
        background-color: gray;
        border-radius: 10px;

        .avatar-uploader-icon {
            font-size: 30px;
            color: white;
            width: 150px;
            height: 183px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 172px;
            height: 178px;
            display: block;
        }
    }

    #picture-upload-desc {
        margin: auto;
        display: inline-block;
        font-size: 13px;
    }
}

#cover-letter-wrapper {
    h4 {
        margin: 30px 0 10px 0;
    }
}

#attached-document-wrapper {
    h3.wrapper-title {
        display: inline-block;
        margin-right: 10px;
    }
    #portfolio-upload-box {
        width: 300px;
        .el-button {
            width: 110px;
        }
        .el-upload__tip {
            font-size: 11px;
        }
    }
}

#interview-time-wrapper {
    h3.wrapper-title {
        display: inline-block;
        margin-right: 10px;
    }
    .interview-select-box {
        width: 450px;
        margin-bottom: 20px;
        span {
            font-size: 15px;
            display: inline-block;
            margin-bottom: 20px;
        }
        .el-checkbox {
            margin: 0 10px 10px 0;
        }
        .el-checkbox.is-checked {
            border-color: black;
            color: black;
        }
    }
}
</style>
