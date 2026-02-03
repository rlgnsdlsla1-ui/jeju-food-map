# Firebase 설정 가이드

제주도 푸드맵 프로젝트에 Firebase 데이터베이스와 Google 로그인을 설정하는 방법입니다.

---

## 1단계: Firebase 프로젝트 생성

### 1-1. Firebase Console 접속
1. 브라우저에서 https://console.firebase.google.com/ 접속
2. Google 계정으로 로그인

### 1-2. 새 프로젝트 만들기
1. **"프로젝트 추가"** 또는 **"Add project"** 클릭
2. 프로젝트 이름 입력: `jeju-food-map` (원하는 이름 입력)
3. **계속** 클릭
4. Google Analytics 활성화 여부 선택 (권장: 활성화)
5. Analytics 계정 선택 또는 새로 만들기
6. **프로젝트 만들기** 클릭
7. 프로젝트 준비가 완료되면 **계속** 클릭

---

## 2단계: 웹 앱 추가

### 2-1. 웹 앱 등록
1. Firebase 프로젝트 대시보드에서 **웹 아이콘 (</>)** 클릭
2. 앱 닉네임 입력: `제주도 푸드맵` 또는 `Jeju Food Map`
3. **Firebase Hosting 설정** 체크박스는 선택하지 않음
4. **앱 등록** 클릭

### 2-2. Firebase SDK 설정 정보 복사
다음과 같은 코드가 표시됩니다:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "jeju-food-map.firebaseapp.com",
  projectId: "jeju-food-map",
  storageBucket: "jeju-food-map.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef",
  measurementId: "G-XXXXXXXXXX"
};
```

**이 정보를 복사해두세요!** (나중에 3단계에서 사용)

5. **콘솔로 이동** 클릭

---

## 3단계: Authentication (인증) 설정

### 3-1. Authentication 활성화
1. 왼쪽 메뉴에서 **빌드(Build)** → **Authentication** 클릭
2. **시작하기** 버튼 클릭

### 3-2. 이메일/비밀번호 인증 활성화
1. **Sign-in method** 탭 클릭
2. **이메일/비밀번호** 클릭
3. 첫 번째 토글 **사용 설정** (이메일/비밀번호)
4. **저장** 클릭

### 3-3. Google 로그인 활성화
1. **Sign-in method** 탭에서 **Google** 클릭
2. **사용 설정** 토글을 켬
3. **프로젝트 공개용 이름** 입력: `제주도 푸드맵`
4. **프로젝트 지원 이메일** 선택 (본인 이메일)
5. **저장** 클릭

---

## 4단계: Firestore Database 설정

### 4-1. Firestore 생성
1. 왼쪽 메뉴에서 **빌드(Build)** → **Firestore Database** 클릭
2. **데이터베이스 만들기** 버튼 클릭

### 4-2. 보안 규칙 설정
1. **프로덕션 모드에서 시작** 선택 (권장)
2. **다음** 클릭

### 4-3. Cloud Firestore 위치 선택
1. 위치 선택: **asia-northeast3 (Seoul)** (한국 서버)
2. **사용 설정** 클릭
3. 데이터베이스 생성 완료까지 대기 (1-2분)

### 4-4. 보안 규칙 수정
데이터베이스가 생성되면 **규칙** 탭으로 이동:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // 사용자 문서: 본인만 읽기/쓰기 가능
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 맛집 문서: 모두 읽기 가능, 인증된 사용자만 쓰기 가능
    match /restaurants/{restaurantId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // 리뷰 문서: 모두 읽기 가능, 작성자만 수정/삭제 가능
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.user_id;
    }
    
    // 즐겨찾기: 본인만 읽기/쓰기 가능
    match /favorites/{favoriteId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.user_id;
    }
  }
}
```

**게시** 버튼 클릭하여 저장

---

## 5단계: 프로젝트에 환경 변수 설정

### 5-1. .env.local 파일 생성
프로젝트 루트 폴더에 `.env.local` 파일을 만들고 다음 내용을 입력하세요:

```env
# Firebase 설정 (2단계에서 복사한 정보)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=jeju-food-map.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=jeju-food-map
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=jeju-food-map.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcdef
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# 카카오맵 API 키 (나중에 설정)
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_kakao_map_api_key_here
```

**주의:** 위의 `XXXXX` 부분을 2단계에서 복사한 실제 값으로 바꾸세요!

### 5-2. .env.local 파일 위치
```
제주도 푸드맵/
├── app/
├── components/
├── lib/
├── node_modules/
├── .env.local  ← 여기에 생성
├── package.json
└── ...
```

---

## 6단계: Firebase Console에서 승인된 도메인 추가 (로컬 테스트용)

### 6-1. 승인된 도메인 확인
1. **Authentication** → **Settings** → **Authorized domains** 탭
2. 기본적으로 다음이 추가되어 있어야 합니다:
   - `localhost` (로컬 개발용)
   - `[프로젝트명].firebaseapp.com`
   - `[프로젝트명].web.app`

3. `localhost`가 없다면:
   - **도메인 추가** 클릭
   - `localhost` 입력 후 **추가**

---

## 7단계: 테스트

### 7-1. 개발 서버 시작
```bash
npm run dev
```

### 7-2. 브라우저에서 테스트
1. http://localhost:3000 접속
2. 우측 상단 **회원가입** 클릭
3. **Google로 계속하기** 버튼 클릭
4. Google 계정으로 로그인
5. 로그인 성공 후 프로필 표시 확인

### 7-3. Firebase Console에서 확인
1. **Authentication** → **Users** 탭 이동
2. 방금 가입한 사용자 정보 확인
3. **Firestore Database** → **데이터** 탭 이동
4. `users` 컬렉션에 사용자 문서 생성 확인

---

## 문제 해결

### "Firebase: Error (auth/unauthorized-domain)"
- Firebase Console → Authentication → Settings → Authorized domains
- `localhost` 추가

### ".env.local 파일을 읽지 못함"
- 파일 이름 확인: `.env.local` (앞에 점 포함)
- 위치 확인: 프로젝트 루트 폴더
- 서버 재시작: `Ctrl + C` 후 `npm run dev`

### "Firebase가 초기화되지 않았습니다"
- `.env.local` 파일의 환경 변수 값 확인
- `NEXT_PUBLIC_` 접두사 확인
- 따옴표 없이 값만 입력했는지 확인

### Google 로그인 팝업이 닫힘
- 팝업 차단 해제
- 시크릿/프라이빗 모드에서 테스트

---

## 추가 설정 (선택사항)

### Analytics 대시보드
- Firebase Console → Analytics → Dashboard
- 사용자 행동 추적 및 분석

### Storage (이미지 업로드용)
- Firebase Console → Storage
- 시작하기 클릭
- 맛집 사진 업로드 기능 추가 가능

---

## 요약 체크리스트

- [ ] Firebase 프로젝트 생성
- [ ] 웹 앱 등록 및 SDK 정보 복사
- [ ] Authentication 활성화 (이메일/비밀번호, Google)
- [ ] Firestore Database 생성
- [ ] Firestore 보안 규칙 설정
- [ ] `.env.local` 파일 생성 및 환경 변수 입력
- [ ] 승인된 도메인에 localhost 추가
- [ ] 개발 서버 시작 및 테스트

설정이 완료되면 Google 로그인으로 회원가입/로그인할 수 있습니다!


