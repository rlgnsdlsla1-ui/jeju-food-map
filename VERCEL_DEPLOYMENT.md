# 🚀 Vercel 배포 가이드

Vercel에 제주도 푸드맵을 배포하는 상세 가이드입니다.

---

## ✅ 사전 준비

### 1. GitHub에 코드 업로드

```bash
# 방법 1: 배치 파일 실행
quick-push.bat 더블클릭

# 방법 2: 수동 명령어
git add .
git commit -m "Vercel 배포 준비"
git push origin main
```

### 2. 환경 변수 준비

`.env.local` 파일의 내용을 복사해두세요. Vercel 설정 시 필요합니다.

---

## 🌐 Vercel 배포 단계

### 1단계: Vercel 계정 생성

1. https://vercel.com 접속
2. **Sign Up** 클릭
3. **Continue with GitHub** 선택
4. GitHub 계정으로 로그인
5. Vercel 권한 승인

### 2단계: 프로젝트 임포트

1. Vercel 대시보드에서 **Add New...** → **Project** 클릭
2. **Import Git Repository** 섹션에서 GitHub 저장소 찾기
3. `jeju-food-map` 선택
4. **Import** 클릭

### 3단계: 프로젝트 설정

#### Framework Preset
- 자동으로 **Next.js** 감지됨 ✅

#### Root Directory
- `./` (기본값) ✅

#### Build Command
- `npm run build` (기본값) ✅

#### Output Directory
- `.next` (기본값) ✅

#### Install Command
- `npm install` (기본값) ✅

### 4단계: 환경 변수 설정 ⭐ 중요!

**Environment Variables** 섹션에서 다음 변수들을 추가하세요:

| Name | Value | 참고 |
|------|-------|------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API Key | Firebase Console에서 복사 |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `프로젝트ID.firebaseapp.com` | |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID | |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `프로젝트ID.firebasestorage.app` | |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Messaging Sender ID | |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase App ID | |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Measurement ID (선택) | |
| `NEXT_PUBLIC_KAKAO_MAP_API_KEY` | Kakao JavaScript Key | |

**Environment 선택:**
- ✅ Production
- ✅ Preview
- ✅ Development

### 5단계: 배포!

**Deploy** 버튼 클릭!

⏱️ 배포 시간: 약 2-3분

---

## 📋 빌드 오류 해결

### Error: "Command 'npm run build' exited with 1"

#### 원인 1: 환경 변수 누락

**해결:**
1. Vercel 대시보드 → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 모든 환경 변수 확인
4. **Deployments** → 최신 배포 → **Redeploy**

#### 원인 2: TypeScript 오류

**해결:**
```bash
# 로컬에서 빌드 테스트
npm run build

# 오류 확인 후 수정
# 수정 후 다시 푸시
git add .
git commit -m "Fix build errors"
git push
```

#### 원인 3: ESLint 오류

**임시 해결책 (권장하지 않음):**

`next.config.js`에 추가:
```javascript
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}
```

**권장 해결책:**
로컬에서 `npm run lint`를 실행하여 오류를 수정하세요.

#### 원인 4: 의존성 문제

**해결:**
```bash
# package-lock.json 삭제 후 재설치
rm package-lock.json
rm -rf node_modules
npm install

# 다시 커밋 & 푸시
git add .
git commit -m "Fix dependencies"
git push
```

---

## 🔧 배포 후 설정

### 1. Firebase 도메인 추가

Google 로그인이 작동하려면 Vercel 도메인을 Firebase에 추가해야 합니다.

1. **Firebase Console** 접속
   - https://console.firebase.google.com/

2. **Authentication → Settings** 이동

3. **승인된 도메인** 섹션에서 **도메인 추가** 클릭

4. Vercel 배포 URL 입력
   - 예: `jeju-food-map-abc123.vercel.app`

5. **추가** 클릭

### 2. 카카오맵 도메인 등록

카카오맵이 작동하려면 Vercel 도메인을 등록해야 합니다.

1. **카카오 개발자 사이트** 접속
   - https://developers.kakao.com/

2. **내 애플리케이션** → 앱 선택

3. **플랫폼 설정하기** 클릭

4. **Web 플랫폼 등록** 선택

5. **사이트 도메인** 입력
   - `https://jeju-food-map-abc123.vercel.app`

6. **저장**

---

## ✅ 배포 확인

### 배포 URL

Vercel이 제공하는 URL로 접속하세요:
- `https://your-project-name.vercel.app`

### 확인 사항

- [ ] 페이지가 정상적으로 로드되는가?
- [ ] Firebase 로그인이 작동하는가?
- [ ] 카카오맵이 표시되는가?
- [ ] 맛집 데이터가 로드되는가?
- [ ] 모바일에서도 정상 작동하는가?

---

## 🔄 자동 배포 설정

### GitHub 연동

Vercel과 GitHub이 연동되면:

✅ **main 브랜치에 푸시** → 자동 배포  
✅ **Pull Request 생성** → 프리뷰 배포  
✅ **커밋마다 빌드 상태** → GitHub에 표시

### 배포 알림

1. Vercel 대시보드 → **Settings** → **Notifications**
2. 이메일 또는 Slack 알림 설정

---

## 📊 Vercel 기능

### Analytics (분석)

- 페이지 뷰
- 방문자 위치
- 성능 메트릭

### Performance Monitoring

- Core Web Vitals
- 로딩 속도
- 최적화 제안

### Preview Deployments

- Pull Request마다 미리보기
- 팀원과 리뷰
- 실시간 협업

---

## 🌐 커스텀 도메인 연결 (선택)

### 1. 도메인 구매

추천 서비스:
- Namecheap
- Google Domains
- Cloudflare

### 2. Vercel에 도메인 추가

1. Vercel 대시보드 → 프로젝트 → **Settings** → **Domains**
2. **Add** 클릭
3. 도메인 이름 입력 (예: `jejufoodmap.com`)
4. DNS 설정 안내에 따라 설정

### 3. DNS 레코드 추가

도메인 제공업체에서:

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME Record (www):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 4. Firebase & 카카오맵에 커스텀 도메인 추가

위에서 설명한 것과 동일하게 새 도메인을 추가하세요.

---

## 💡 최적화 팁

### 1. 이미지 최적화

Next.js Image 컴포넌트 사용:
```typescript
import Image from 'next/image';

<Image 
  src="/restaurant.jpg"
  width={300}
  height={200}
  alt="맛집"
/>
```

### 2. 캐싱 설정

API 라우트에 캐싱 추가:
```typescript
export const revalidate = 3600; // 1시간마다 재검증
```

### 3. 환경별 설정

```typescript
const isDev = process.env.NODE_ENV === 'development';
const apiUrl = isDev 
  ? 'http://localhost:3000' 
  : 'https://jejufoodmap.com';
```

---

## 🎯 배포 체크리스트

배포 전 확인:

- [ ] 로컬에서 `npm run build` 성공
- [ ] 로컬에서 `npm start`로 프로덕션 빌드 테스트
- [ ] 모든 환경 변수 준비 완료
- [ ] GitHub에 코드 푸시 완료
- [ ] Firebase 프로젝트 설정 완료
- [ ] 카카오맵 API 키 발급 완료

배포 후 확인:

- [ ] Vercel 배포 성공
- [ ] 사이트 접속 확인
- [ ] Firebase 도메인 등록
- [ ] 카카오맵 도메인 등록
- [ ] 로그인 기능 테스트
- [ ] 지도 표시 확인
- [ ] 모바일 반응형 확인

---

## 🆘 문제 해결

### 배포는 성공했지만 사이트가 작동하지 않음

1. **브라우저 콘솔 확인** (F12)
2. **환경 변수 확인**
3. **Firebase/Kakao 도메인 등록 확인**

### "Application error: a client-side exception has occurred"

- Firebase 초기화 오류 가능성
- 환경 변수 확인
- Firebase 프로젝트 설정 확인

### 카카오맵이 표시되지 않음

- 카카오 개발자 콘솔에서 도메인 등록 확인
- API 키 확인
- 브라우저 콘솔에서 오류 메시지 확인

---

## 📞 도움이 필요하신가요?

- **Vercel 문서:** https://vercel.com/docs
- **Next.js 문서:** https://nextjs.org/docs
- **Firebase 문서:** https://firebase.google.com/docs

---

배포 성공을 축하합니다! 🎉

이제 전 세계 어디서나 제주도 푸드맵에 접속할 수 있습니다!
