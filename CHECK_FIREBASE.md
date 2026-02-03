# Firebase 설정 확인 체크리스트

현재 Firebase SDK 정보가 입력되었습니다. 이제 Firebase Console에서 나머지 설정을 완료하세요.

---

## ✅ 완료된 작업

- [x] Firebase 프로젝트 생성 (`jeju-food-map`)
- [x] 웹 앱 등록 및 SDK 정보 확인
- [x] `.env.local` 파일 준비

---

## 🔴 Firebase Console에서 해야 할 작업

### 1. Authentication (인증) 설정 - 필수!

#### 1-1. 이메일/비밀번호 인증 활성화
1. https://console.firebase.google.com/ 접속
2. `jeju-food-map` 프로젝트 선택
3. 좌측 메뉴: **빌드(Build)** → **Authentication** 클릭
4. **시작하기** 버튼 클릭
5. **Sign-in method** 탭 클릭
6. **이메일/비밀번호** 클릭
7. **사용 설정** 토글을 켬
8. **저장** 클릭

#### 1-2. Google 로그인 활성화
1. **Sign-in method** 탭에서 **Google** 클릭
2. **사용 설정** 토글을 켬
3. **프로젝트 공개용 이름**: `제주도 푸드맵` 입력
4. **프로젝트 지원 이메일**: 본인 이메일 선택
5. **저장** 클릭

---

### 2. Firestore Database 생성 - 필수!

#### 2-1. 데이터베이스 만들기
1. 좌측 메뉴: **빌드(Build)** → **Firestore Database** 클릭
2. **데이터베이스 만들기** 버튼 클릭
3. **프로덕션 모드에서 시작** 선택
4. **다음** 클릭

#### 2-2. 위치 선택
1. 위치: **asia-northeast3 (Seoul)** 선택
2. **사용 설정** 클릭
3. 생성 완료까지 대기 (1-2분)

#### 2-3. 보안 규칙 설정
1. **규칙** 탭 클릭
2. 기존 내용을 지우고 다음 내용으로 교체:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // 사용자 컬렉션
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 맛집 컬렉션
    match /restaurants/{restaurantId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // 리뷰 컬렉션
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.user_id;
    }
    
    // 즐겨찾기 컬렉션
    match /favorites/{favoriteId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.user_id;
    }
  }
}
```

3. **게시** 버튼 클릭

---

### 3. 승인된 도메인 확인

1. **Authentication** → **Settings** 탭 클릭
2. **Authorized domains** 섹션 확인
3. `localhost`가 목록에 있는지 확인
4. 없다면:
   - **도메인 추가** 클릭
   - `localhost` 입력
   - **추가** 클릭

---

## 🚀 .env.local 파일 생성

### 방법 1: 자동 생성 (권장)
프로젝트 폴더에서 `setup-firebase.bat` 파일을 더블클릭하세요.

### 방법 2: 수동 생성
프로젝트 폴더에 `.env.local` 파일을 만들고 다음 내용을 복사:

```env
# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDZ8SS-ElsJHYtpJO9zg8WumFsqJY8daOo
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=jeju-food-map.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=jeju-food-map
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=jeju-food-map.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=15626536102
NEXT_PUBLIC_FIREBASE_APP_ID=1:15626536102:web:c31693ca76441f3d822067
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-TCPEKC32XV

# 카카오맵 API 키 (나중에 설정)
NEXT_PUBLIC_KAKAO_MAP_API_KEY=
```

---

## ✅ 완료 후 테스트

### 1. 서버 시작
```bash
npm run dev
```

또는 `start-dev.bat` 더블클릭

### 2. 브라우저에서 확인
1. http://localhost:3000 접속
2. 우측 상단 **회원가입** 클릭
3. **Google로 계속하기** 버튼 클릭
4. Google 계정 선택
5. 로그인 성공 확인

### 3. Firebase Console에서 확인
1. **Authentication** → **Users** 탭
2. 방금 가입한 사용자 정보 확인
3. **Firestore Database** → **데이터** 탭
4. `users` 컬렉션에 사용자 문서 생성 확인

---

## 📋 최종 체크리스트

Firebase Console:
- [ ] Authentication - 이메일/비밀번호 활성화
- [ ] Authentication - Google 로그인 활성화
- [ ] Firestore Database 생성
- [ ] Firestore 보안 규칙 설정
- [ ] 승인된 도메인에 localhost 추가

로컬 프로젝트:
- [ ] .env.local 파일 생성
- [ ] Firebase SDK 정보 입력
- [ ] npm run dev 실행
- [ ] Google 로그인 테스트

---

## 🆘 문제 해결

### "Firebase: Error (auth/unauthorized-domain)"
→ Firebase Console → Authentication → Settings → Authorized domains에 `localhost` 추가

### ".env.local 파일을 읽지 못함"
→ 파일 위치 확인 (프로젝트 루트), 서버 재시작

### "Missing or insufficient permissions"
→ Firestore 보안 규칙 확인 및 재설정

모든 설정을 완료하면 Google 로그인이 정상 작동합니다!


