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
                            <el-input v-model="userFormData.birth" placeholder="생년월일 (YYMMDD)"></el-input>
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
                        v-loading="picLoading"
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
                <div v-for="(question, index) in setApplicationData.questions.commonQ" :key="index" class="text-box">
                    <h4 class="title">{{index + 1}}. {{ question }}</h4>
                    <el-input
                    type="textarea"
                    resize="none"
                    :rows="15"
                    v-model="userFormData.answers[index]"
                    >
                    </el-input>
                </div>
                <div v-if="userFormData.position==='developer'">
                    <div v-for="(question, index) in setApplicationData.questions.devQ" :key="index" class="text-box">
                        <h4 class="title">{{index + setApplicationData.questions.commonQ.length + 1}}. {{ question }}</h4>
                        <el-input
                        type="textarea"
                        resize="none"
                        :rows="15"
                        v-model="userFormData.devAnswers[index]"
                        >
                        </el-input>
                    </div>
                </div>
                <div v-if="userFormData.position==='designer'">
                    <div v-for="(question, index) in setApplicationData.questions.desQ" :key="index" class="text-box">
                        <h4 class="title">{{index + setApplicationData.questions.commonQ.length + 1}}. {{ question }}</h4>
                        <el-input
                        type="textarea"
                        resize="none"
                        :rows="15"
                        v-model="userFormData.desAnswers[index]"
                        >
                        </el-input>
                    </div>
                </div>
            </div>
            <div id="attached-document-wrapper" class="wrapper">
                <h3 class="wrapper-title">첨부 자료</h3>
                <span class="subtitle">(선택사항) 추가 자료나 포트폴리오를 첨부해 주세요.</span>
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
                <button id="submit"@click="sumbitApplication">최종 제출</button>
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
            picLoading: false,
            fullscreenLoading: false,
            setApplicationData: {
                season : '',
                questions : '',
                interviewTimes : [],
                deadline : '',
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
                portfolioFilename:"",
                applicantImageUrl: "",
                applicantPortfolioUrl: "",
                answers : [],
                devAnswers : [],
                desAnswers : [],
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
    created(){
        // 모르고 새로고침 눌렀을 시 sessionstorage 에서 가져옴.
        if(this.$store.state.token === "" && sessionStorage.getItem('user_token')){
            this.$store.state.token = sessionStorage.getItem('user_token');
            this.$store.state.applicantIdx = sessionStorage.getItem('user_idx');
        }
    },
    mounted(){
        const loading = this.$loading({ lock: true, text: '로딩 중' })
        // Axios 를 통한 API call 은 여기서 하면 된다.

        this.$store.dispatch('getApplicationSetting')
        .then((res) => {
            this.setApplicationData = res;
            loading.close()
        })
        .catch((e) => {
            console.log('error occured in dispatch when getApplicationSetting\n', e);
            loading.close()
        })

        this.$store.dispatch('getApplicantData')
        .then((res) => {
            // 서버에서 가져온 내 지원서를 바인딩.
            this.userFormData = res;
            loading.close()
        })
        .catch((e) => {
            console.log('error occured in dispatch when getApplicantData\n', e);
            loading.close()
        })
    },
    methods: {
        // Validator
        // Birth
        birthValidator(){
            const pattern = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))$/
            if(pattern.test(this.userFormData.birth)){
                return true;
            }else{
                this.$notify.error({
                    title: '지원서 형식 오류',
                    message: '생년월일은 올바른 YYMMDD 형식으로 작성해야 합니다.'
                })
                return false;
            }
        },
        // Phone 
        phoneValidator(){
            const pattern = /^(?:(010\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})$/
            if(pattern.test(this.userFormData.phone)){
                return true;
            }else{
                this.$notify.error({
                    title: '지원서 형식 오류',
                    message: '올바른 휴대 전화 번호를 기입해 주세요.'
                })
                return false;
            }
        },
        isEmptyArray(arr){
            // arr 이 비었거나, element 중 빈 곳이 있는 경우 true를 return
            if(arr.length === 0 || arr === null){
                return true;
            }else if (arr.some((val) => ((val === null) || (val === "")))){
                // array 에서 비어있는 값이 있을 경우
                return true;
            }
            return false;
        },
        // Required Input Checker
        inputChecker(){
            // 객체 복사
            const requiredData = this.$clone(this.userFormData);
            // not required.
            delete requiredData.personalUrl
            delete requiredData.applicantPortfolioUrl
            delete requiredData.portfolioFilename

            if(this.isEmptyArray(requiredData.answers)){
                this.$notify.error({title: '제출 오류', message: '자기소개서 중 비어있는 항목이 있습니다.'})
                return false;
            }else if(this.isEmptyArray(requiredData.interviewAvailableTimes)){
                this.$notify.error({title: '제출 오류', message: '면접시간이 선택되지 않았습니다.'})
                return false;
            }else{
                // property 중 통과한 array 제거. 남은건 object
                delete requiredData.answers
                delete requiredData.interviewAvailableTimes
                // Object.values(obj) 는 value 로만 이루어진 array
                if(this.isEmptyArray(Object.values(requiredData))){
                    this.$notify.error({title: "제출 오류", message: '제출하기 위해선 선택 사항을 제외한 모든 항목이 채워져야 합니다.'})
                    return false;
                }
                return true;
            }
        },

        // Picture Upload handler
        beforePictureUpload(file) {
            const isImage = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt3M = file.size / 1024 / 1024 < 3;
            // spinner on
            this.picLoading = true;
            if (!isImage) {
                this.$notify.error({
                    title: '잘못 된 형식!',
                    message: '프로필 사진은 jpg 또는 png 확장자여야 합니다.'
                });
                this.picLoading = false;
            }
            if (!isLt3M) {
                this.$notify.error({
                    title: '너무 큰 파일!',
                    message: '이미지는 3MB 이하여야 합니다.'
                });
                this.picLoading = false;
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
            this.picLoading = false;
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

        saveApplication() {
            // birth 나 phone의 값이 있을 때만 (null 아니면서 "" 아닐 때) validator 돌려서 체크함
            if((this.userFormData.birth !== "") && (this.userFormData.birth !== null)){
                if(!this.birthValidator()) return;
            }
            if(!(this.userFormData.phone === "") && !(this.userFormData.phone === null)){
                if(!this.phoneValidator()) return;
            }
            const loading = this.$loading({ lock: true, text: '전송 중' });
            this.$store.dispatch('postApplicantData', { userFormData: this.userFormData })
            .then(()=> {
                loading.close()
                this.$notify({
                    title: "성공!",
                    message: "지원서를 저장하였습니다.",
                    type:"success"
                })
            })
            .catch(() => {
                loading.close();
                this.$notify.error({
                    message: '제출 중 문제가 발생 하였습니다.'
                });
            });
        },
        sumbitApplication(){
            // validation
            if(!this.inputChecker()) return;
            if(!this.birthValidator()) return;
            if(!this.phoneValidator()) return;

            this.$confirm('지원서를 제출하시겠습니까? 제출 후에는 수정이 불가능합니다.', '확인', {
                confirmButtonText: '네',
                cancelButtonText: '아니오',
                type: 'info'
            }).then(() => {
                const loading = this.$loading({ lock: true, text: '전송 중' });
                this.$store.dispatch('submitApplicantData', { userFormData: this.userFormData })
                .then(()=> {
                    loading.close();
                    this.$notify.success({
                        title: "성공!",
                        message: "지원서를 제출하였습니다. 감사합니다!",
                    })
                    this.$router.push({ name: 'status'});
                }).catch(() => {
                    loading.close();
                    this.$notify.error({
                        message: '제출 중 문제가 발생 하였습니다.'
                    });
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '제출을 취소하였습니다.'
                });
            })
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
