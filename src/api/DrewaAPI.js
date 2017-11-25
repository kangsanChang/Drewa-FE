import axios from 'axios';

// proxy table 에 /api 를 localhost:3000/api 으로 연결함
// 서버에서 설정한 하위 path 만 맞춰주면 된다.
const BASE_URL = '/api';

export default {
  addApplicant(user, recaptchaToken) {
      return axios.post(BASE_URL+'/applicants', {
         userEmail: user.email,
         userPassword: user.password,
         recaptchaToken
        });
  },
  // application 접근 시 마운트 전 필요한 데이터 (면접 시간, season, 기타등등 가져오기)
  getApplicationSetting() {
    return axios.get(BASE_URL) // 서버에서 URL 정해줘야 함.
  },
  // 지원자가 적어놓은 정보 가져옴. application 접근 시 무조건 한번 실행
  getApplicantData(applicantIdx, token) {
    // header Authorization 에서 token 설정
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ token
    return axios.get(BASE_URL+`/applicants/${applicantIdx}/application`)
  },
  postApplicantData(applicantIdx, token, userFormData) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    // Server에서 처리하는 변수명과 일치하면 가능 함.
    // return axios.post(BASE_URL + `/applicants/${applicantIdx}/application`, userFormData);

    // 일단은 가능한 버전으로
    return axios.post(BASE_URL + `/applicants/${applicantIdx}/application`,{
      applicantGender: userFormData.gender ,
      applicantBirthday: userFormData.birth ,
      applicantLocation: userFormData.residence ,
      applicantOrganization: userFormData.company ,
      applicantMajor: userFormData.major ,
      applicantPhone: userFormData.phone ,
      entryRoute: userFormData.knownFrom ,
      portfolioFileUrl: userFormData.portfolioFileUrl ,
      // personalUrl: userFormData.personalUrl , string 으로 바꾼 후 넣기
      answers: userFormData.answers ,
      interviewAvailableTime: userFormData.interviewAvailableTimes ,
    })
  },
  // Post 예시
  // Header: token

  // Body:
  //   --json type--
  //   {
  //     "userName": "김하하",
  //     "userPosition": "developer",
  //     "applicantGender": "M",
  //     "applicantBirthday": "1995-02-22",
  //     "applicantLocation": "서울",
  //     "applicantPhone": "01012341235",
  //     "applicantOrganization": "르르대학교",
  //     "applicantMajor": "컴퓨터공학과",
  //     "applicantGrade": "3",
  //     "entryRoute": "페이스북 디프만 계정 홍보영상보고 지원 했습니다.",
  //     "personalUrl": ["https://facebook.com/apple", "https://github.com/helloworld"],
  //     "answers": ["재밌어 보여서 지원했습니다 잘 부탁 드립니다.", "디프만 최고", "1231231234444"],
  //     "interviewAvailableTime": ["2017-08-25 10:00", "2017-08-26 12:00"]
  //   }


  // 사진 업로드

  // 포폴 업로드

  // 사진 삭제

  // 포폴 삭제
};


// 멀티플 요청!
// 지원서 가져올 떄 둘다 겟 이거 쓰면 좋을 듯
// 지원서 config 채워넣기 + 사용자 정보 불러오기

// function getUserAccount() {
//   return axios.get('/user/12345');
// }

// function getUserPermissions() {
//   return axios.get('/user/12345/permissions');
// }

// axios.all([getUserAccount(), getUserPermissions()])
//   .then(axios.spread(function (acct, perms) {
//     // Both requests are now complete
//   }));