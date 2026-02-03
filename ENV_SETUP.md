# 환경 변수 설정 가이드

프로젝트에서 사용할 환경 변수를 설정하는 방법입니다.

---

## .env.local 파일 생성

### 1단계: 파일 생성
프로젝트 루트 폴더에 `.env.local` 파일을 만듭니다.

**위치:**
```
제주도 푸드맵/
├── app/
├── components/
├── .env.local  ← 여기!
├── package.json
└── ...
```

### 2단계: Firebase 정보 입력

Firebase Console에서 복사한 정보를 다음 형식으로 입력하세요:

```env
# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDZ8SS-ElsJHYtpJO9zg8WumFsqJY8daOo
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=jeju-food-map.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=jeju-food-map
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=jeju-food-map.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=15626536102
NEXT_PUBLIC_FIREBASE_APP_ID=1:15626536102:web:c31693ca76441f3d822067
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-TCPEKC32XV

# 카카오맵 API (나중에 추가)
NEXT_PUBLIC_KAKAO_MAP_API_KEY=
```

**⚠️ 주의사항:**
- 따옴표 없이 값만 입력
- 띄어쓰기 없이 입력
- `=` 앞뒤로 공백 없음
- 각 줄은 엔터로 구분

---

## Firebase 정보 찾기

### Firebase Console에서 확인
1. https://console.firebase.google.com/ 접속
2. 프로젝트 선택
3. 좌측 상단 톱니바퀴 아이콘 → **프로젝트 설정** 클릭
4. 아래로 스크롤하여 **내 앱** 섹션 찾기
5. 웹 앱 (</>)의 **SDK 설정 및 구성** 선택
6. **구성** 선택 후 값 복사

```javascript
const firebaseConfig = {
  apiKey: "복사",           // ← NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: "복사",       // ← NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  projectId: "복사",        // ← NEXT_PUBLIC_FIREBASE_PROJECT_ID
  storageBucket: "복사",    // ← NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "복사", // ← NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  appId: "복사",            // ← NEXT_PUBLIC_FIREBASE_APP_ID
  measurementId: "복사"     // ← NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};
```

---

## 예제

### 올바른 예시 ✅
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDZ8SS-ElsJHYtpJO9zg8WumFsqJY8daOo
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=jeju-food-map.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=jeju-food-map
```

### 잘못된 예시 ❌
```env
# 따옴표 사용 (X)
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyDZ8SS-ElsJHYtpJO9zg8WumFsqJY8daOo"

# 공백 포함 (X)
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyDZ8SS-ElsJHYtpJO9zg8WumFsqJY8daOo

# 주석과 값이 같은 줄 (X)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy... # API Key
```

---

## 설정 확인

### 1. 서버 재시작
환경 변수를 수정한 후에는 반드시 서버를 재시작해야 합니다:

```bash
# Ctrl + C로 서버 중지
npm run dev
```

### 2. 브라우저 콘솔 확인
1. http://localhost:3000 접속
2. F12를 눌러 개발자 도구 열기
3. Console 탭 확인
4. 에러 메시지가 없으면 성공!

---

## 문제 해결

### "Firebase가 초기화되지 않았습니다"
- `.env.local` 파일 이름 확인 (앞에 점 포함)
- 파일 위치 확인 (프로젝트 루트)
- 환경 변수 이름 확인 (`NEXT_PUBLIC_` 접두사 필수)
- 서버 재시작

### ".env.local 파일이 보이지 않음"
- Windows에서 숨김 파일 표시 설정
- VS Code에서 파일 생성 권장
- 파일 탐색기에서 "새 텍스트 문서"로 만들면 안 됨!

### 환경 변수가 적용되지 않음
1. 서버 완전히 종료 (Ctrl + C)
2. `.next` 폴더 삭제
3. 서버 재시작

```bash
rmdir /s /q .next
npm run dev
```

---

## 카카오맵 API 설정 (선택사항)

### 1. 카카오 개발자 계정 생성
1. https://developers.kakao.com/ 접속
2. 로그인 또는 회원가입

### 2. 애플리케이션 추가
1. **내 애플리케이션** 클릭
2. **애플리케이션 추가하기** 클릭
3. 앱 이름: `제주도 푸드맵`
4. 회사명: (선택사항)
5. **저장** 클릭

### 3. JavaScript 키 복사
1. 생성한 앱 클릭
2. **앱 키** 섹션에서 **JavaScript 키** 복사
3. `.env.local` 파일에 추가:

```env
NEXT_PUBLIC_KAKAO_MAP_API_KEY=복사한_JavaScript_키
```

### 4. 플랫폼 설정
1. **플랫폼 설정하기** 클릭
2. **Web 플랫폼 등록** 클릭
3. 사이트 도메인: `http://localhost:3000`
4. **저장** 클릭

---

## 완성된 .env.local 예시

```env
# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDZ8SS-ElsJHYtpJO9zg8WumFsqJY8daOo
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=jeju-food-map.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=jeju-food-map
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=jeju-food-map.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=15626536102
NEXT_PUBLIC_FIREBASE_APP_ID=1:15626536102:web:c31693ca76441f3d822067
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-TCPEKC32XV

# 카카오맵 API
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_kakao_javascript_key_here
```

설정 완료!


