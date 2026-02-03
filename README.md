# 제주도 푸드맵 🍊

제주도 맛집을 소개하는 웹사이트입니다. 관광객들이 지도를 통해 지역별 맛집을 확인하고 여행을 계획할 수 있습니다.

**🔗 GitHub 저장소:** https://github.com/rlgnsdlsla1-ui/jeju-food-map

## 주요 기능

- 🗺️ 인터랙티브 지도: 카카오맵을 활용한 제주도 맛집 위치 표시
- 🔍 검색 기능: 지역, 카테고리, 키워드로 맛집 검색
- ⭐ 리뷰 시스템: 사용자 리뷰 및 평점
- ❤️ 즐겨찾기: 맛집 저장 및 관리
- 📅 여행 계획: 맛집 선택하여 여행 경로 계획
- 👤 사용자 인증: 회원가입 및 로그인 (이메일/비밀번호, Google)

## 빠른 시작

### 가장 간단한 방법
프로젝트 폴더에서 `start-dev.bat` 파일을 더블클릭하세요!

### 수동 실행
1. **패키지 설치**
   ```bash
   npm install
   ```

2. **Firebase 설정** ⭐ 중요!
   - `FIREBASE_SETUP_GUIDE.md` 파일을 열어 단계별로 따라하세요
   - Firebase Console에서 프로젝트 생성 및 설정 (5분 소요)
   - `.env.local` 파일 생성 및 환경 변수 입력

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```

4. **브라우저에서 확인**
   - http://localhost:3000 접속
   - Google 로그인 테스트

## 📚 설정 가이드

- **FIREBASE_SETUP_GUIDE.md** - Firebase 설정 완벽 가이드 (필독!)
- **QUICK_START.md** - 5분 빠른 시작
- **INSTALL_GUIDE.md** - 설치 문제 해결

## 기술 스택

- **Next.js 14**: React 프레임워크 (App Router)
- **TypeScript**: 타입 안정성
- **Tailwind CSS**: 스타일링
- **Firebase**: 인증 및 데이터베이스
- **카카오맵 API**: 지도 서비스

## 배포

자세한 배포 가이드는 **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** 파일을 참고하세요.

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com)에 프로젝트 연결
2. 환경 변수 설정
3. 자동 배포 완료

## GitHub 저장소

이 프로젝트는 GitHub에서 관리됩니다:
- **저장소 주소:** https://github.com/rlgnsdlsla1-ui/jeju-food-map

### 코드 업로드 방법

프로젝트 폴더에서 `upload-to-github.bat` 파일을 실행하세요!
