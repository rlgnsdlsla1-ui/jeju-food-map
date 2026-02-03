# 🚨 카카오맵 "로딩 중" 문제 해결 가이드

지도가 "로딩 중..."으로만 표시되고 실제 지도가 나타나지 않는 경우 해결 방법입니다.

---

## 🔍 원인 확인

### 1단계: 브라우저 개발자 도구 확인

1. 브라우저에서 **F12** 키 누르기
2. **Console** 탭 클릭
3. 오류 메시지 확인

#### 가능한 오류 메시지들:

**A. "카카오맵 API 키가 설정되지 않았습니다"**
→ `.env.local` 파일에 API 키가 없거나 잘못됨

**B. "Kakao Maps API key is invalid"**
→ API 키가 유효하지 않음

**C. "Platform domain is not registered"**
→ 카카오 개발자 콘솔에 도메인 미등록

**D. 아무 오류도 없음**
→ 스크립트 로딩 문제 또는 환경 변수 문제

---

## ✅ 해결 방법

### 방법 1: 카카오맵 API 키 확인 및 설정

#### 1-1. `.env.local` 파일 확인

프로젝트 폴더의 `.env.local` 파일을 메모장으로 열기:

```
마우스 우클릭 → 연결 프로그램 → 메모장
```

다음 줄이 있는지 확인:
```env
NEXT_PUBLIC_KAKAO_MAP_API_KEY=여기에_실제_키_값
```

**확인 사항:**
- ✅ `NEXT_PUBLIC_KAKAO_MAP_API_KEY=` 뒤에 실제 키 값이 있어야 함
- ❌ `your_kakao_map_api_key` 또는 `your_kakao_map_api_key_here`는 안 됨
- ❌ 공백이나 따옴표 없이 키만 입력
- ✅ 예시: `NEXT_PUBLIC_KAKAO_MAP_API_KEY=abcdef1234567890abcdef1234567890`

#### 1-2. 카카오맵 API 키 발급 (아직 안 받았다면)

1. **https://developers.kakao.com** 접속
2. **로그인** (카카오 계정)
3. **내 애플리케이션** 클릭
4. **애플리케이션 추가하기** 클릭
5. 정보 입력:
   - 앱 이름: `제주도 푸드맵` (또는 원하는 이름)
   - 사업자명: 개인 이름
6. **저장** 클릭
7. 생성된 앱 클릭
8. **앱 키** 탭에서 **JavaScript 키** 복사
9. `.env.local` 파일에 붙여넣기:
   ```env
   NEXT_PUBLIC_KAKAO_MAP_API_KEY=복사한_키_붙여넣기
   ```

#### 1-3. 플랫폼 도메인 등록

카카오 개발자 콘솔에서:

1. 애플리케이션 선택
2. **플랫폼** 탭 클릭
3. **Web 플랫폼 등록** 클릭
4. **사이트 도메인** 입력:
   ```
   http://localhost:3000
   ```
   **주의:** `https`가 아닌 `http`입니다!
5. **저장** 클릭

---

### 방법 2: 개발 서버 재시작 (필수!)

환경 변수를 변경했으면 **반드시** 개발 서버를 재시작해야 합니다!

#### 현재 실행 중인 서버 종료:
1. 개발 서버가 실행 중인 터미널/명령창 찾기
2. **Ctrl + C** 키 누르기
3. "종료하시겠습니까?" → **Y** 입력

#### 서버 다시 시작:

**방법 A: 배치 파일 (추천)**
```
start-dev.bat 파일 더블클릭
```

**방법 B: 명령 프롬프트**
1. **시작 메뉴** → `cmd` 검색 → **명령 프롬프트** 실행
2. 다음 명령어 입력:
```cmd
cd "C:\Users\USER\Desktop\제주도 푸드맵"
npm run dev
```

---

### 방법 3: 브라우저 캐시 삭제

1. 브라우저에서 **Ctrl + Shift + Delete**
2. **캐시된 이미지 및 파일** 선택
3. **데이터 삭제** 클릭
4. 브라우저 새로고침 (**Ctrl + Shift + R**)

또는:

1. 브라우저 **시크릿 모드**/비공개 모드로 열기
2. http://localhost:3000 접속

---

### 방법 4: 컴포넌트 수정 (API 키가 없어도 테스트)

임시로 API 키 체크를 건너뛰고 테스트:

`components/KakaoMap.tsx` 파일 수정:

**변경 전:**
```typescript
if (!apiKey || apiKey === 'your_kakao_map_api_key') {
  console.warn('카카오맵 API 키가 설정되지 않았습니다.');
  return;
}
```

**변경 후:**
```typescript
if (!apiKey || apiKey === 'your_kakao_map_api_key' || apiKey === 'your_kakao_map_api_key_here') {
  console.error('❌ 카카오맵 API 키가 설정되지 않았습니다!');
  console.log('📝 .env.local 파일을 확인하세요.');
  console.log('🔗 https://developers.kakao.com 에서 API 키를 발급받으세요.');
  setIsLoaded(false);
  return;
}

console.log('✅ 카카오맵 API 키 확인됨:', apiKey.substring(0, 10) + '...');
```

이렇게 수정하면 콘솔에 더 자세한 정보가 표시됩니다.

---

## 📋 체크리스트

하나씩 확인하세요:

- [ ] `.env.local` 파일이 프로젝트 폴더에 있음
- [ ] `NEXT_PUBLIC_KAKAO_MAP_API_KEY` 줄이 있음
- [ ] API 키가 실제 값으로 설정됨 (not `your_kakao_map_api_key`)
- [ ] 카카오 개발자 콘솔에서 JavaScript 키 발급 완료
- [ ] 카카오 개발자 콘솔 플랫폼에 `http://localhost:3000` 등록
- [ ] 개발 서버 재시작 완료
- [ ] 브라우저 캐시 삭제 또는 시크릿 모드 사용
- [ ] 브라우저 F12 → Console에서 오류 확인

---

## 🎯 빠른 해결 (단계별)

### 1분 체크:
```
1. 프로젝트 폴더에서 .env.local 파일 열기
2. NEXT_PUBLIC_KAKAO_MAP_API_KEY 확인
3. 값이 your_kakao_map_api_key라면 → 실제 키로 변경 필요
```

### 5분 해결:
```
1. https://developers.kakao.com 접속
2. 앱 생성 → JavaScript 키 복사
3. .env.local에 키 붙여넣기
4. 플랫폼에 http://localhost:3000 등록
5. 개발 서버 재시작 (Ctrl+C → npm run dev)
6. 브라우저 새로고침 (Ctrl+Shift+R)
```

---

## 🔧 여전히 안 될 때

### 디버깅 정보 확인:

브라우저 Console에서 다음 명령어 실행:

```javascript
console.log('API Key:', process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY);
console.log('Kakao:', typeof window.kakao);
```

**결과 해석:**
- `API Key: undefined` → 환경 변수 설정 안 됨
- `API Key: your_kakao_map_api_key` → 실제 키로 변경 필요
- `Kakao: undefined` → 스크립트 로딩 실패
- `Kakao: object` → 스크립트 로딩 성공

---

## 📞 추가 도움

1. **KAKAO_MAP_SETUP.md** - 상세 설정 가이드
2. **QUICK_START_MAP.md** - 빠른 시작 가이드
3. 브라우저 Console의 오류 메시지 확인

---

**가장 흔한 원인:** `.env.local` 파일에 실제 API 키를 입력하지 않았거나, 개발 서버를 재시작하지 않은 경우입니다!

