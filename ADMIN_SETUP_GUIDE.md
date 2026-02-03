# 관리자 설정 가이드

특정 사용자에게 관리자 권한을 부여하는 방법입니다.

---

## 🔑 관리자 권한 부여 방법

### 방법 1: Firebase Console에서 수동 부여 (권장)

#### 1단계: 사용자 가입
1. 먼저 관리자로 지정할 사용자가 사이트에 회원가입/로그인
2. http://localhost:3000 접속
3. Google 로그인 또는 이메일/비밀번호로 가입

#### 2단계: Firebase Console에서 사용자 확인
1. https://console.firebase.google.com/ 접속
2. `jeju-food-map` 프로젝트 선택
3. **Authentication** → **Users** 탭 클릭
4. 관리자로 지정할 사용자의 **UID** 복사

#### 3단계: Firestore에서 role 필드 추가
1. **Firestore Database** 클릭
2. **데이터** 탭에서 `users` 컬렉션 찾기
3. 관리자로 지정할 사용자의 문서 ID (UID) 클릭
4. **필드 추가** 클릭
5. 다음 정보 입력:
   - **필드 이름**: `role`
   - **필드 유형**: string
   - **값**: `admin`
6. **저장** 클릭

완료! 이제 해당 사용자는 관리자 권한을 가집니다.

---

### 방법 2: 코드로 이메일 기반 자동 부여

#### 1단계: 관리자 이메일 추가
`lib/admin.ts` 파일을 열고 `ADMIN_EMAILS` 배열에 이메일 추가:

```typescript
export const ADMIN_EMAILS = [
  'your-admin-email@gmail.com',  // 여기에 관리자 이메일 추가
  'another-admin@gmail.com',
];
```

#### 2단계: firebase-auth.ts 수정
회원가입 시 자동으로 admin role 부여하도록 수정:

```typescript
// lib/firebase-auth.ts의 signUp 함수에서
await setDoc(doc(dbInstance, 'users', user.uid), {
  email: user.email,
  name: name,
  role: ADMIN_EMAILS.includes(email.toLowerCase()) ? 'admin' : 'user', // 추가
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
});
```

---

## 📋 관리자 페이지 사용법

### 접근 방법
1. 관리자 계정으로 로그인
2. 브라우저 주소창에 입력: `http://localhost:3000/admin`
3. 관리자 대시보드 표시

### 주요 기능

#### 1. 대시보드 (`/admin`)
- 전체 통계 확인
- 맛집, 리뷰, 사용자 수 확인
- 빠른 메뉴 접근

#### 2. 맛집 관리 (`/admin/restaurants`)
- 맛집 추가
- 맛집 수정
- 맛집 삭제
- 맛집 목록 확인

#### 3. 리뷰 관리 (`/admin/reviews`)
- 전체 리뷰 확인
- 부적절한 리뷰 삭제
- 리뷰 통계

#### 4. 사용자 관리 (`/admin/users`)
- 가입 사용자 목록
- 사용자 권한 변경
- 사용자 통계

---

## 🔒 보안 설정

### Firestore 보안 규칙 업데이트

관리자만 특정 작업을 수행할 수 있도록 보안 규칙 추가:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // 관리자 확인 함수
    function isAdmin() {
      return request.auth != null && 
             exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // 사용자 컬렉션
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
      allow read: if isAdmin(); // 관리자는 모든 사용자 읽기 가능
    }
    
    // 맛집 컬렉션
    match /restaurants/{restaurantId} {
      allow read: if true;
      allow write: if isAdmin(); // 관리자만 쓰기 가능
    }
    
    // 리뷰 컬렉션
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (request.auth.uid == resource.data.user_id || isAdmin()); // 작성자 또는 관리자
    }
    
    // 즐겨찾기 컬렉션
    match /favorites/{favoriteId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.user_id;
      allow delete: if isAdmin(); // 관리자는 삭제 가능
    }
  }
}
```

Firebase Console에서:
1. **Firestore Database** → **규칙** 탭
2. 위 내용으로 교체
3. **게시** 클릭

---

## ✅ 테스트

### 1. 관리자 권한 확인
```bash
# 브라우저 콘솔에서 실행
fetch('/api/admin/check').then(r => r.json()).then(console.log)
```

### 2. 관리자 페이지 접근
1. 관리자 계정으로 로그인
2. `/admin` 접속
3. 대시보드 표시 확인

### 3. 일반 사용자로 테스트
1. 일반 사용자 계정으로 로그인
2. `/admin` 접속
3. "관리자 권한이 필요합니다" 메시지 확인
4. 자동으로 메인 페이지로 리다이렉트

---

## 🎯 관리자 확인 체크리스트

- [ ] 사용자 가입 완료
- [ ] Firebase Console → Authentication에서 UID 확인
- [ ] Firestore → users 컬렉션에서 해당 사용자 문서 찾기
- [ ] `role: admin` 필드 추가
- [ ] Firestore 보안 규칙 업데이트
- [ ] 로그아웃 후 재로그인
- [ ] `/admin` 페이지 접속 테스트
- [ ] 관리자 기능 테스트

---

## 🚨 문제 해결

### "관리자 권한이 필요합니다" 오류
1. Firebase Console → Firestore → users 컬렉션 확인
2. 해당 사용자 문서에 `role: admin` 필드가 있는지 확인
3. 브라우저 캐시 삭제 및 로그아웃/로그인
4. 개발 서버 재시작

### 관리자 페이지가 로딩되지 않음
1. 브라우저 콘솔(F12)에서 에러 확인
2. Firebase 환경 변수 확인
3. Firestore 보안 규칙 확인

### role 필드 추가가 안 됨
1. Firestore Database가 생성되어 있는지 확인
2. users 컬렉션이 존재하는지 확인
3. 사용자가 최소 1회 로그인했는지 확인

---

## 📝 추가 정보

### 여러 관리자 추가
여러 사용자에게 관리자 권한 부여:
1. 각 사용자가 먼저 가입
2. Firebase Console → Firestore에서 각 사용자에게 `role: admin` 추가

### 관리자 권한 제거
1. Firebase Console → Firestore
2. 해당 사용자 문서 클릭
3. `role` 필드 삭제 또는 `user`로 변경

### 관리자 목록 확인
Firebase Console → Firestore → users 컬렉션에서 `role` 필드가 `admin`인 사용자 확인

---

모든 설정이 완료되면 `/admin`에 접속하여 관리자 대시보드를 사용할 수 있습니다!


