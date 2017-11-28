<template>
    <div id="container">
        <div id="contents-wrapper">
            <v-header :title="title"></v-header>
            <div id="basic-info-wrapper" class="wrapper">
                <h3 class="wrapper-title">기본 인적사항</h3>
                <div id="basic-info-box" class="box">
                    <el-form :model="userFormData">
                        <el-form-item id="name">
                            <el-input v-model="userFormData.name" placeholder="이름"></el-input>
                        </el-form-item>
                        <el-form-item id="gender" class="selector">
                            <el-select v-model="userFormData.gender" placeholder="성별">
                                <el-option label="남자" value="M"></el-option>
                                <el-option label="여자" value="F"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item id="birth" class="half endcol">
                            <el-input v-model="userFormData.birth" placeholder="생년월일 (예: 950222)"></el-input>
                        </el-form-item>
                        <el-form-item id="residence" class="half">
                            <el-input v-model="userFormData.residence" placeholder="현 거주지 (시/도, 군/구)"></el-input>
                        </el-form-item>
                        <el-form-item id="phone" class="half endcol">
                            <el-input v-model="userFormData.phone" placeholder="휴대전화 ( - 없이 입력)"></el-input>
                        </el-form-item>
                        <el-form-item id="company" class="half">
                            <el-input v-model="userFormData.company" placeholder="소속"></el-input>
                        </el-form-item>
                        <el-form-item id="major" class="half endcol">
                            <el-input v-model="userFormData.major" placeholder="전공"></el-input>
                        </el-form-item>
                        <el-form-item id="position" class="selector">
                            <el-select v-model="userFormData.position" placeholder="지원분야">
                                <el-option label="디자이너" value="designer"></el-option>
                                <el-option label="개발자" value="developer"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item id="knownFrom" class="endcol">
                            <el-input v-model="userFormData.knownFrom" placeholder="모집 공고를 어디서 보았나요?"></el-input>
                        </el-form-item>
                        <el-form-item id="personalUrl" class="full endcol">
                            <el-input v-model="userFormData.personalUrl" placeholder="(선택사항) 블로그 or GitHub or 홈페이지 URL"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div id="photo-box">
                    <div id="photo-upload-box" class="box">
                        <el-upload
                        name="user_image"
                        class="avatar-uploader"
                        :headers="authorizationHeader"
                        :action="pictureUploadUrl"
                        :show-file-list="false"
                        :on-success="uploadPictureSuccess"
                        :before-upload="beforePictureUpload">
                        <img v-if="userFormData.applicantImageUrl" :src="userFormData.applicantImageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                    <div id="picture-upload-desc">프로필 사진<br>(jpg, png 최대 3MB)</div>
                </div>
            </div>
            <div id="cover-letter-wrapper" class="wrapper">
                <h3 class="wrapper-title">자기소개서</h3>
                <div v-for="(question, index) in setApplicationData.questions" :key="index" class="text-box">
                    <h4 class="title">{{index + 1}}. {{ question }}</h4>
                    <el-input
                    type="textarea"
                    resize="none"
                    :rows="15"
                    v-model="userFormData.answers[index]"
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
                    name="user_portfolio"
                    class="upload-portfolio"
                    :headers="authorizationHeader"
                    :action="portfolioUploadUrl"
                    :before-upload="beforeFileUpload"
                    :on-success="uploadFileSuccess"
                    :limit = 1
                    :on-exceed="handleFileLimitexceed"
                    >
                    <el-button size="small" type="primary">파일 업로드</el-button>
                    <div slot="tip" class="el-upload__tip">15MB 이하의 PDF파일</div>
                    </el-upload>
                </div>
            </div>
            <div id="interview-time-wrapper" class="wrapper">
                <h3 class="wrapper-title">면접 시간 선택</h3>
                <span class="subtitle">면접 가능한 시간을 <u>모두</u> 선택해 주세요.</span>
                <div v-for="(interviewDay, index) in setApplicationData.interviewTimes" :key="index" class="interview-select-box">
                    <span>{{interviewDay.date}}</span>
                    <el-checkbox-group v-model="userFormData.interviewAvailableTimes">
                        <el-checkbox v-for="(time, index) in interviewDay.times" :key="index" :label="interviewDay.date+'-'+time" border>{{time}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <div id="submit-box" align="center">
                <button id="save" @click="saveApplication">임시 저장</button>
                <button id="submit">최종 제출</button>
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
            setApplicationData: {
                season : '',
                questions : [],
                interviewTimes : [],
            },
            userFormData: {
                name:"",
                gender:"",
                birth:"",
                residence:"",
                phone:"",
                company:"",
                major:"",
                position:"",
                knownFrom:"",
                personalUrl:"",
                pictureFilename:"",
                portfolioFilename:"",
                applicantImageUrl: "",
                applicantPortfolioUrl: "",
                answers : [],
                interviewAvailableTimes : [],
            },
        }
    },
    computed: {
        title() {
            return `디프만 ${this.setApplicationData.season}기 지원서 작성하기`
        },
        authorizationHeader() {
            return { Authorization : 'Bearer '+this.$store.state.token }
        },
        pictureUploadUrl() {
            return `/api/applicants/${ this.$store.state.applicantIdx }/application/picture`
        },
        portfolioUploadUrl() {
            return `/api/applicants/${ this.$store.state.applicantIdx }/application/portfolio`
        }
    },
    mounted(){
        // Axios 를 통한 API call 은 여기서 하면 된다.
        this.setApplicationData.questions = ['지원 동기', '협업 경험', '기억에 남는 프로젝트', '좋아하는 서비스',],
        this.setApplicationData.interviewTimes = [
            {date: '11/25 (토)', times: ['14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30']},
            {date: '11/26 (일)', times: ['14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30']},
        ]
        this.setApplicationData.season = '4'

        // 서버에서 가져온 setApplicationData 를 바인딩 해야 함

        this.$store.dispatch('getApplicantData')
        .then((res) => {
            // 서버에서 가져온 내 지원서를 바인딩.
            this.userFormData = res;
        })
        .catch((e) => {
            console.log('error occured in dispatch when getApplicantData\n', e);
        })
    },
    methods: {
        // Picture Upload handler
        beforePictureUpload(file) {
            const isImage = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt3M = file.size / 1024 / 1024 < 3;

            if (!isImage) {
                this.$notify.error({
                    title: '잘못 된 형식!',
                    message: '프로필 사진은 jpg 또는 png 확장자여야 합니다.'
                });
            }
            if (!isLt3M) {
                this.$notify.error({
                    title: '너무 큰 파일!',
                    message: '이미지는 3MB 이하여야 합니다.'
                });
            }
            return isImage && isLt3M;
        },
        uploadPictureSuccess(res, file) {
            this.$notify({
                title: "성공!",
                message: "정상적으로 사진을 업로드하였습니다.",
                type:"success"
            })
            this.userFormData.applicantImageUrl = res.data.url;
        },

        // Portfolio Upload Handler
        beforeFileUpload(file) {
            const isPdf = file.type === 'application/pdf';
            const isLt15M = file.size / 1024 / 1024 < 15;

            if (!isPdf) {
                this.$notify.error({
                    title: '잘못 된 형식!',
                    message: '파일은 pdf 확장자여야 합니다.'
                });
            }
            if (!isLt15M) {
                this.$notify.error({
                    title: '너무 큰 파일!',
                    message: '파일은 15MB 이하여야 합니다.'
                });
            }
            return isPdf && isLt15M;
        },
        handleFileLimitexceed(files, fileList){
            this.$notify.error({
                title: '파일 개수 초과!',
                message: '파일 업로드는 1개만 가능합니다.'
            })
        },
        uploadFileSuccess(res, file) {
            this.$notify({
                title: "성공!",
                message: "정상적으로 파일을 업로드하였습니다.",
                type:"success"
            })
            this.userFormData.applicantPortfolioUrl = res.data.url;
        },

        // Save Application
        saveApplication() {
            this.$store.dispatch('postApplicantData', { userFormData: this.userFormData });
            this.$notify({
                title: "성공!",
                message: "지원서를 저장하였습니다.",
                type:"success"
            })
        },
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
        u {
            color: #FF8E7F;
        }
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
        background-color: #c4c4c4;
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
    }
}

#submit-box {
    margin: 60px 0;
    button {
        width: 100px;
        height: 40px;
        border: 1px solid #2b2b2b;
        font-size: 14px;
        border-radius: 3px;

        &:hover{
            cursor: pointer;
            background-color: gray !important;
        }

        &:focus {
            outline: none;
        }

        &#save {
            background-color: white;
            color: #2b2b2b;
            margin-right: 10px;
        }

        &#submit {
            background-color: #2b2b2b;
            color: white;
        }
    }
}
</style>
