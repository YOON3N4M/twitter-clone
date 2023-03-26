

# React Twitter Clone

배포 https://yoon3n4m.github.io/twitter-clone/

### 스택
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
<hr>

### 앱소개

#### firebase
* 사용자 정보 기억과 구글, 깃허브 계정을 연동해 로그인 가능
* 자체적인 회원가입 서비스 또한 제공하며 가입된 새 계정의 정보는 firebase storage에 저장
* 실시간으로 firebase storage의 변화를 감지하며 게시글을 출력해 이용자들에게 제공
* 사용자 이름(닉네임) 변경 기능 제공

#### styled-components
* 재사용성 높고 수정이 용이한 컴포넌트 형식의 스타일링

#### redux
* 로그인 여부, firebase 초기화 여부, 간단한 계정 정보등을 store에 저장해 여러 컴포넌트에 제공

![image](https://user-images.githubusercontent.com/115640584/227752317-5a7cfbcb-527a-4ebc-915b-67ddcc4f0727.png)
![image](https://user-images.githubusercontent.com/115640584/227752327-10f09b93-01c1-4589-832f-1f19098392c3.png)

<hr>

### 추가/수정 예정
* 반응형 스타일링
* 기타 세부 스타일링
* 개별 닉네임 설정 (완료)
* 다크모드 설정
