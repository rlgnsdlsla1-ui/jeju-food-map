# 빠른 시작 가이드

제주도 푸드맵 프로젝트를 시작하는 가장 빠른 방법입니다.

---

## 1. Firebase 설정 (5분)

### 필수 단계
1. https://console.firebase.google.com/ 접속
2. 프로젝트 만들기 (이름: `jeju-food-map`)
3. 웹 앱 추가 (</>아이콘 클릭)
4. SDK 설정 정보 복사
5. Authentication 활성화:
   - 이메일/비밀번호 ✓
   - Google ✓
6. Firestore Database 생성 (위치: Seoul)

**자세한 내용:** `FIREBASE_SETUP_GUIDE.md` 참조

---

## 2. 환경 변수 설정 (2분)

### .env.local 파일 생성
프로젝트 폴더에 `.env.local` 파일을 만들고:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=복사한_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=프로젝트명.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=프로젝트명
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=프로젝트명.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=복사한_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=복사한_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=복사한_measurement_id

NEXT_PUBLIC_KAKAO_MAP_API_KEY=나중에_설정
```

---

## 3. 개발 서버 시작

### 방법 1: 배치 파일 (가장 간단)
`start-dev.bat` 파일 더블클릭

### 방법 2: 명령어
```bash
npm install
npm run dev
```

---

## 4. 테스트

1. 브라우저에서 http://localhost:3000 접속
2. 우측 상단 **회원가입** 클릭
3. **Google로 계속하기** 클릭
4. Google 계정으로 로그인
5. 성공! 🎉

---

## 다음 단계

- [ ] 카카오맵 API 키 발급 및 추가
- [ ] 맛집 데이터 추가
- [ ] 사이트 디자인 커스터마이징
- [ ] Vercel 배포

---

## 문제가 발생하면

1. `FIREBASE_SETUP_GUIDE.md` - Firebase 설정 상세 가이드
2. `INSTALL_GUIDE.md` - 패키지 설치 문제 해결
3. `.env.local` 파일 위치 및 값 확인
4. 서버 재시작: `Ctrl + C` 후 `npm run dev`


