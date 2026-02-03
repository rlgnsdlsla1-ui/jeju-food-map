# 카카오맵 API 설정 가이드

제주도 맛집 지도를 사용하기 위한 카카오맵 API 설정 방법입니다.

---

## 🗺️ 카카오맵 API 키 발급

### 1단계: 카카오 개발자 계정 생성

1. https://developers.kakao.com/ 접속
2. **로그인** 또는 **회원가입**
3. 카카오 계정으로 로그인

### 2단계: 애플리케이션 등록

1. 로그인 후 **내 애플리케이션** 클릭
2. **애플리케이션 추가하기** 클릭
3. 정보 입력:
   - **앱 이름**: 제주도 푸드맵 (또는 원하는 이름)
   - **사업자명**: 개인 또는 회사명
4. **저장** 클릭

### 3단계: JavaScript 키 확인

1. 생성된 애플리케이션 선택
2. **앱 키** 탭에서 **JavaScript 키** 확인
3. 해당 키를 복사

예시:
```
abcdef1234567890abcdef1234567890
```

### 4단계: 플랫폼 등록

1. **플랫폼** 탭 클릭
2. **Web 플랫폼 등록** 클릭
3. **사이트 도메인** 입력:
   - 개발 환경: `http://localhost:3000`
   - 배포 환경: 실제 도메인 (예: `https://jeju-food-map.vercel.app`)
4. **저장** 클릭

**중요**: 여러 도메인을 등록할 수 있으므로 개발과 배포 도메인을 모두 등록하세요!

---

## 🔐 환경 변수 설정

### `.env.local` 파일에 추가

프로젝트 루트 디렉토리의 `.env.local` 파일을 열고 다음을 추가:

```env
# 카카오맵 API 키
NEXT_PUBLIC_KAKAO_MAP_API_KEY=여기에_발급받은_JavaScript_키_입력
```

예시:
```env
NEXT_PUBLIC_KAKAO_MAP_API_KEY=abcdef1234567890abcdef1234567890
```

### `setup-firebase.bat` 실행 시 자동 설정

`setup-firebase.bat` 파일을 실행하면 카카오맵 API 키 입력란이 포함된 `.env.local` 파일이 자동으로 생성됩니다. 생성 후 직접 키를 입력하세요.

---

## ✅ 설정 확인

### 1. 개발 서버 시작

```bash
npm run dev
```

또는 `start-dev.bat` 파일 더블클릭

### 2. 브라우저에서 확인

http://localhost:3000 접속

- 지도가 정상적으로 표시되면 ✅ 설정 완료!
- "지도 로딩 중..." 화면이 계속되면 ❌ 설정 확인 필요

---

## 🚨 문제 해결

### 지도가 표시되지 않음

#### 1. API 키 확인
- `.env.local` 파일에 `NEXT_PUBLIC_KAKAO_MAP_API_KEY`가 있는지 확인
- 키 값이 정확한지 확인 (공백, 따옴표 없이)
- `your_kakao_map_api_key`가 아닌 실제 키인지 확인

#### 2. 플랫폼 도메인 확인
- 카카오 개발자 콘솔 → 애플리케이션 → 플랫폼
- `http://localhost:3000`이 등록되어 있는지 확인
- 프로토콜(`http://` 또는 `https://`) 정확히 입력

#### 3. 개발 서버 재시작
환경 변수를 추가/수정한 후에는 반드시 개발 서버 재시작:

```bash
# 서버 종료 (Ctrl + C)
npm run dev
```

#### 4. 브라우저 콘솔 확인
- F12 (개발자 도구) → Console 탭
- 오류 메시지 확인
- "Kakao Maps API key is invalid" → API 키 오류
- "Platform domain is not registered" → 도메인 미등록

### 브라우저 콘솔 오류별 해결 방법

#### "Kakao Maps API key is invalid"
→ API 키가 잘못되었거나 만료됨. 카카오 개발자 콘솔에서 키 재확인

#### "Platform domain is not registered"
→ 현재 접속 도메인이 카카오 개발자 콘솔에 등록되지 않음. 플랫폼 등록 확인

#### "The service is not activated"
→ 카카오맵 API 서비스가 활성화되지 않음. 개발자 콘솔에서 활성화

---

## 📝 체크리스트

설정 완료 확인:

- [ ] 카카오 개발자 계정 생성
- [ ] 애플리케이션 등록 완료
- [ ] JavaScript 키 발급
- [ ] Web 플랫폼에 `http://localhost:3000` 등록
- [ ] `.env.local` 파일에 API 키 추가
- [ ] 개발 서버 재시작
- [ ] 브라우저에서 지도 정상 표시 확인

---

## 🌐 배포 시 추가 설정

### Vercel 배포

1. **Vercel 대시보드** 접속
2. 프로젝트 선택
3. **Settings** → **Environment Variables**
4. 다음 변수 추가:
   ```
   NEXT_PUBLIC_KAKAO_MAP_API_KEY = 발급받은_JavaScript_키
   ```
5. **Save** 클릭
6. 프로젝트 재배포

### 카카오 개발자 콘솔 도메인 추가

1. **플랫폼** 탭 → **Web 플랫폼 등록**
2. 배포 도메인 입력 (예: `https://jeju-food-map.vercel.app`)
3. **저장**

---

## 📚 추가 정보

### 카카오맵 API 문서
- 공식 문서: https://apis.map.kakao.com/web/
- 가이드: https://apis.map.kakao.com/web/guide/

### 사용량 제한
- 무료 플랜: 하루 300,000회 요청
- 일반적인 사용에는 충분함
- 초과 시 유료 플랜 고려

### 기능
- ✅ 지도 표시
- ✅ 마커 표시
- ✅ 인포윈도우
- ✅ 줌 컨트롤
- ✅ 지도 타입 변경 (일반/위성)
- ✅ 드래그/확대/축소

---

설정이 완료되면 http://localhost:3000 에서 제주도 지도와 맛집 위치를 확인할 수 있습니다! 🎉

