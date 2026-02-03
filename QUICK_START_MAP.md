# 🗺️ 제주도 맛집 지도 빠른 시작 가이드

제주도 맛집 지도 기능을 바로 사용하기 위한 간단한 가이드입니다.

---

## 🚀 빠른 시작 (3단계)

### 1단계: 카카오맵 API 키 발급 (5분)

1. https://developers.kakao.com/ 접속
2. 로그인/회원가입
3. **내 애플리케이션** → **애플리케이션 추가하기**
4. 앱 이름 입력 (예: 제주도 푸드맵)
5. **앱 키** 탭 → **JavaScript 키** 복사
6. **플랫폼** 탭 → **Web 플랫폼 등록** → `http://localhost:3000` 입력

### 2단계: 환경 변수 설정 (1분)

프로젝트 폴더의 `.env.local` 파일을 열고 카카오맵 API 키 추가:

```env
NEXT_PUBLIC_KAKAO_MAP_API_KEY=여기에_발급받은_JavaScript_키_붙여넣기
```

**또는** 새로 생성:

```bash
# .env.local 파일이 없다면
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDZ8SS-ElsJHYtpJO9zg8WumFsqJY8daOo
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=jeju-food-map.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=jeju-food-map
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=jeju-food-map.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=15626536102
NEXT_PUBLIC_FIREBASE_APP_ID=1:15626536102:web:c31693ca76441f3d822067
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-TCPEKC32XV

# 카카오맵 API 키 (위에서 발급받은 키 입력)
NEXT_PUBLIC_KAKAO_MAP_API_KEY=여기에_발급받은_키
```

### 3단계: 개발 서버 시작

#### 방법 1: 배치 파일 (가장 쉬움!)
`start-dev.bat` 파일 더블클릭

#### 방법 2: 명령어
```bash
npm install   # 처음 한 번만
npm run dev
```

---

## ✅ 확인

브라우저에서 http://localhost:3000 접속

### 성공! 🎉
- 제주도 지도가 표시됨
- 10개의 샘플 맛집 마커가 표시됨
- 지역 필터 버튼이 작동함
- 마커 클릭 시 맛집 정보 표시

### 실패 😢
지도가 표시되지 않으면:
1. F12 (개발자 도구) → Console 탭 확인
2. `.env.local` 파일의 API 키 확인
3. 카카오 개발자 콘솔에서 `http://localhost:3000` 등록 확인
4. 개발 서버 재시작

---

## 🎮 주요 기능

### 1. 지도 보기
- **확대/축소**: 마우스 휠 또는 우측 +/- 버튼
- **이동**: 마우스 드래그
- **마커 클릭**: 맛집 상세 정보 표시
- **지도 타입**: 일반/위성 지도 전환 (우측 상단)

### 2. 지역 필터
- **전체**: 모든 맛집 표시
- **제주시**, **애월읍** 등: 특정 지역 맛집만 표시
- 선택한 지역으로 자동 줌

### 3. 보기 모드
- **🗺️ 지도보기**: 지도 + 선택한 맛집 정보
- **📋 목록보기**: 그리드 카드 형식으로 맛집 목록

### 4. 맛집 카드
- 카테고리, 평점, 주소, 전화번호, 운영시간
- **즐겨찾기** 버튼 (로그인 필요)
- **상세보기** 버튼

---

## 📊 샘플 데이터

현재 10개의 샘플 맛집이 포함되어 있습니다:

| 맛집명 | 지역 | 카테고리 | 평점 |
|--------|------|----------|------|
| 제주 흑돼지 명가 | 제주시 | 한식 | 4.5 |
| 바다향 해물탕 | 조천읍 | 한식 | 4.7 |
| 성산 일출봉 식당 | 성산읍 | 한식 | 4.3 |
| 서귀포 갈치조림 | 서귀포시 | 한식 | 4.6 |
| 애월 해안 카페 | 애월읍 | 카페 | 4.8 |
| 한라산 숯불구이 | 제주시 | 한식 | 4.4 |
| 중문 해녀의 집 | 서귀포시 | 한식 | 4.5 |
| 표선 전복 전문점 | 표선면 | 한식 | 4.7 |
| 한림 고등어 회센터 | 한림읍 | 일식 | 4.6 |
| 대정 옥돔구이 | 대정읍 | 한식 | 4.8 |

---

## 🔧 다음 단계

### 실제 맛집 데이터 추가
1. 관리자 로그인 (`/admin`)
2. **맛집 관리** → **맛집 추가**
3. 필수 정보 입력:
   - 이름, 주소, 카테고리
   - 위도/경도 (카카오맵에서 확인)
   - 전화번호, 운영시간, 가격대
4. **추가하기** 클릭

### 위도/경도 찾는 방법
1. https://map.kakao.com/ 접속
2. 맛집 주소 검색
3. 맛집 위치 클릭
4. 주소창의 좌표 확인
   - 예: `https://map.kakao.com/?...&y=33.4996&x=126.5312`
   - 위도(latitude): y값 (33.4996)
   - 경도(longitude): x값 (126.5312)

---

## 📚 추가 가이드

- **카카오맵 상세 설정**: `KAKAO_MAP_SETUP.md`
- **관리자 페이지**: `ADMIN_SETUP_GUIDE.md`
- **Firebase 설정**: `FIREBASE_SETUP_GUIDE.md`

---

## 🚨 문제 해결

### "지도 로딩 중..." 계속 표시
→ 카카오맵 API 키 확인, 개발 서버 재시작

### 마커가 표시되지 않음
→ 샘플 데이터 확인 (`lib/sample-restaurants.ts`)

### "카카오맵 API 키가 설정되지 않았습니다" 경고
→ `.env.local` 파일에 `NEXT_PUBLIC_KAKAO_MAP_API_KEY` 추가

### API 오류 (콘솔)
→ 카카오 개발자 콘솔에서 도메인 등록 확인

---

이제 제주도 맛집 지도를 마음껏 탐험하세요! 🍊🗺️

