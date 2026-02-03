# 🚀 제주도 푸드맵 배포 가이드

제주도 푸드맵을 인터넷에 공개하는 가장 간단한 방법을 안내합니다.

---

## 방법 1: Vercel 배포 (가장 간단! 추천!)

**⏱️ 소요 시간: 5-10분**  
**💰 비용: 무료**

Vercel은 Next.js를 만든 회사에서 제공하는 호스팅 서비스로, Next.js 프로젝트에 최적화되어 있습니다.

### 1단계: GitHub에 코드 업로드 (선택사항)

#### GitHub 저장소가 있는 경우
- 이미 GitHub에 코드가 있다면 이 단계는 건너뛰세요.

#### GitHub 저장소가 없는 경우
1. https://github.com 접속 후 로그인 (계정이 없으면 가입)
2. 우측 상단 **+** 버튼 → **New repository** 클릭
3. Repository name: `jeju-food-map`
4. **Public** 또는 **Private** 선택
5. **Create repository** 클릭
6. 프로젝트 폴더에서 다음 명령어 실행:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/당신의아이디/jeju-food-map.git
git push -u origin main
```

**⚠️ 중요:** `.env.local` 파일은 자동으로 제외됩니다 (보안상 안전)

---

### 2단계: Vercel에 배포

#### 방법 A: GitHub 연동 (추천)

1. **Vercel 접속**
   - https://vercel.com 접속
   - **Sign Up** 클릭
   - **Continue with GitHub** 선택 (GitHub 계정으로 로그인)

2. **프로젝트 임포트**
   - **Add New...** → **Project** 클릭
   - GitHub 저장소 목록에서 `jeju-food-map` 찾기
   - **Import** 클릭

3. **프로젝트 설정**
   - Framework Preset: **Next.js** (자동 감지됨)
   - Root Directory: `./` (기본값)
   - Build Command: `npm run build` (자동 설정됨)
   - **Deploy** 버튼 클릭!

#### 방법 B: GitHub 없이 직접 배포

1. **Vercel CLI 설치**
```bash
npm install -g vercel
```

2. **배포 명령어 실행**
```bash
vercel
```

3. **질문에 답변**
   - Set up and deploy? → **Y**
   - Which scope? → 본인 계정 선택
   - Link to existing project? → **N**
   - What's your project's name? → `jeju-food-map`
   - In which directory? → `.` (엔터)
   - Override settings? → **N**

4. **완료!** 배포 URL이 표시됩니다 (예: `https://jeju-food-map.vercel.app`)

---

### 3단계: 환경 변수 설정 ⭐ 중요!

배포 후 Firebase와 카카오맵이 작동하려면 환경 변수를 설정해야 합니다.

#### Vercel 대시보드에서 설정

1. **Vercel 대시보드** 접속
   - https://vercel.com/dashboard
   - 배포한 프로젝트 클릭

2. **Settings → Environment Variables** 이동

3. **환경 변수 추가** (`.env.local` 파일 내용 복사)
   
   각 변수를 하나씩 추가하세요:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyDZ8SS-ElsJHYtpJO9zg8WumFsqJY8daOo` |
   | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `jeju-food-map.firebaseapp.com` |
   | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `jeju-food-map` |
   | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `jeju-food-map.firebasestorage.app` |
   | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `15626536102` |
   | `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:15626536102:web:c31693ca76441f3d822067` |
   | `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | `G-TCPEKC32XV` |
   | `NEXT_PUBLIC_KAKAO_MAP_API_KEY` | (카카오맵 JavaScript 키) |

4. **Environment 선택**
   - Production, Preview, Development 모두 체크

5. **Save** 클릭

6. **재배포**
   - **Deployments** 탭으로 이동
   - 가장 최근 배포 옆 **⋯** 클릭
   - **Redeploy** 클릭

---

### 4단계: Firebase 도메인 추가

배포된 도메인을 Firebase에 등록해야 Google 로그인이 작동합니다.

1. **Firebase Console** 접속
   - https://console.firebase.google.com/
   - `jeju-food-map` 프로젝트 선택

2. **Authentication → Settings** 이동

3. **승인된 도메인** 섹션에서 **도메인 추가** 클릭

4. Vercel 배포 URL 입력
   - 예: `jeju-food-map.vercel.app`
   - 또는 커스텀 도메인 (설정한 경우)

5. **추가** 클릭

---

### 5단계: 카카오맵 도메인 등록

배포된 사이트에서 카카오맵이 작동하도록 설정합니다.

1. **카카오 개발자 사이트** 접속
   - https://developers.kakao.com/
   - 로그인

2. **내 애플리케이션** → 앱 선택

3. **플랫폼 설정하기** → **Web 플랫폼 등록**

4. **사이트 도메인** 추가
   - `https://jeju-food-map.vercel.app`
   - 커스텀 도메인이 있다면 추가로 입력

5. **저장**

---

## ✅ 배포 완료!

이제 전 세계 어디서나 사이트에 접속할 수 있습니다!

**배포 URL:** `https://jeju-food-map.vercel.app`

### 배포 후 자동 기능

✨ **자동 HTTPS** - 보안 인증서 자동 적용  
⚡ **글로벌 CDN** - 전 세계 어디서나 빠른 속도  
🔄 **자동 배포** - GitHub에 푸시하면 자동으로 재배포  
📊 **분석** - 방문자 통계 자동 수집  
🌐 **무제한 트래픽** - 무료 플랜도 트래픽 제한 없음

---

## 방법 2: Firebase Hosting (대안)

이미 Firebase를 사용하고 있으므로, Firebase Hosting도 좋은 선택입니다.

### 설치 및 배포

```bash
# Firebase CLI 설치
npm install -g firebase-tools

# Firebase 로그인
firebase login

# Firebase 초기화
firebase init hosting

# 빌드
npm run build

# 배포
firebase deploy --only hosting
```

### Firebase Hosting 설정

`firebase.json` 파일 생성:

```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**⚠️ 주의:** Next.js를 Firebase Hosting에 배포하려면 정적 내보내기(Static Export)가 필요합니다.

`next.config.js` 수정:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

---

## 방법 3: Netlify (또 다른 대안)

### 드래그 앤 드롭으로 배포

1. 프로젝트 빌드
```bash
npm run build
```

2. https://app.netlify.com/drop 접속

3. `.next` 폴더를 드래그 앤 드롭

4. 환경 변수 설정 (Vercel과 동일)

---

## 🎯 추천 방법 비교

| 방법 | 난이도 | 속도 | 기능 | 비용 |
|-----|-------|------|------|------|
| **Vercel** | ⭐ 가장 쉬움 | ⚡ 가장 빠름 | 🎨 최고 | 무료 |
| Firebase Hosting | ⭐⭐ 보통 | ⚡ 빠름 | 🎨 좋음 | 무료 |
| Netlify | ⭐ 쉬움 | ⚡ 빠름 | 🎨 좋음 | 무료 |

**결론: Vercel을 강력 추천합니다!** 🚀

---

## 🔧 문제 해결

### "빌드 오류 발생"
- 로컬에서 `npm run build` 실행하여 오류 확인
- `node_modules` 삭제 후 `npm install` 재실행

### "페이지가 로드되지 않음"
- 환경 변수가 올바르게 설정되었는지 확인
- 브라우저 콘솔(F12)에서 오류 메시지 확인

### "Firebase 로그인 오류"
- Firebase Console에서 배포 도메인이 추가되었는지 확인
- Authentication → Settings → 승인된 도메인 확인

### "카카오맵이 표시되지 않음"
- 카카오 개발자 사이트에서 배포 도메인이 등록되었는지 확인
- JavaScript 키가 올바른지 확인

---

## 📱 커스텀 도메인 연결 (선택사항)

본인 소유의 도메인(예: `jejufoodmap.com`)을 사용하고 싶다면:

### Vercel에서 설정

1. **도메인 구매** (가비아, Cloudflare, Namecheap 등)

2. **Vercel 대시보드** → 프로젝트 → **Settings** → **Domains**

3. **Add** 클릭하여 도메인 입력

4. DNS 설정 안내에 따라 도메인 연결

5. **Firebase와 카카오맵에도 새 도메인 추가!**

---

## 🎉 성공적인 배포를 축하합니다!

궁금한 점이 있다면 언제든 문의하세요.

**Happy Coding! 🚀**
