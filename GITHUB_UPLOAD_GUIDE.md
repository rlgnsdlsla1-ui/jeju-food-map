# 📤 GitHub 업로드 가이드

제주도 푸드맵 프로젝트를 GitHub 저장소에 업로드하는 방법입니다.

---

## 🚀 방법 1: 배치 파일 실행 (가장 간단!)

### 단계

1. **프로젝트 폴더 열기**
   - `C:\Users\USER\Desktop\제주도 푸드맵` 폴더를 엽니다

2. **배치 파일 실행**
   - `upload-to-github.bat` 파일을 더블클릭합니다

3. **GitHub 로그인**
   - 브라우저가 열리면 GitHub에 로그인합니다
   - 권한 요청이 나오면 승인합니다

4. **완료!**
   - 업로드가 완료되면 https://github.com/rlgnsdlsla1-ui/jeju-food-map 에서 확인할 수 있습니다

---

## 🔧 방법 2: 수동 명령어 (Git이 익숙한 경우)

### Git 설치 확인

먼저 Git이 설치되어 있는지 확인하세요:

```bash
git --version
```

설치되어 있지 않다면: https://git-scm.com/ 에서 다운로드

### 명령어 실행

```bash
# 1. Git 저장소 초기화
git init

# 2. 모든 파일 추가
git add .

# 3. 커밋 생성
git commit -m "Initial commit: 제주도 푸드맵 프로젝트"

# 4. 메인 브랜치로 변경
git branch -M main

# 5. GitHub 원격 저장소 연결
git remote add origin https://github.com/rlgnsdlsla1-ui/jeju-food-map.git

# 6. GitHub에 푸시
git push -u origin main
```

---

## 🔑 GitHub 인증 설정

### Windows에서 Git 자격 증명 설정

#### Personal Access Token 사용 (권장)

1. **GitHub에서 토큰 생성**
   - GitHub 로그인 → 우측 상단 프로필 클릭
   - **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
   - **Generate new token** 클릭
   - **Note:** `제주도 푸드맵 프로젝트`
   - **Expiration:** 90 days 또는 원하는 기간
   - **Scopes:** `repo` 체크
   - **Generate token** 클릭
   - **⚠️ 토큰을 복사하여 안전한 곳에 저장하세요!** (다시 볼 수 없습니다)

2. **Git에서 토큰 사용**
   - 푸시할 때 Username에는 GitHub 아이디 입력
   - Password에는 생성한 토큰 입력

#### GitHub CLI 사용 (더 간편함)

```bash
# GitHub CLI 설치 (Windows)
winget install --id GitHub.cli

# GitHub 로그인
gh auth login

# 브라우저에서 인증
# 질문에 답변:
# - What account do you want to log into? → GitHub.com
# - What is your preferred protocol? → HTTPS
# - Authenticate Git with your GitHub credentials? → Yes
# - How would you like to authenticate? → Login with a web browser
```

---

## 📋 업로드 전 체크리스트

### ✅ 확인 사항

- [ ] `.env.local` 파일이 `.gitignore`에 포함되어 있는지 확인 (민감 정보 보호)
- [ ] `node_modules` 폴더가 `.gitignore`에 포함되어 있는지 확인
- [ ] README.md 파일이 작성되어 있는지 확인
- [ ] 불필요한 파일이 포함되지 않았는지 확인

### 📝 업로드되는 파일

**포함됨:**
- 소스 코드 (`app/`, `components/`, `lib/` 등)
- 설정 파일 (`package.json`, `tsconfig.json`, `next.config.js` 등)
- 문서 파일 (`.md` 파일들)
- 배치 파일 (`.bat` 파일들)

**제외됨:** (`.gitignore`에 의해)
- `.env.local` (환경 변수 - 민감 정보)
- `node_modules/` (패키지 - 용량 큼)
- `.next/` (빌드 결과물)
- 기타 임시 파일

---

## 🔄 코드 업데이트 방법

프로젝트를 수정한 후 다시 GitHub에 업로드하는 방법:

```bash
# 1. 변경된 파일 추가
git add .

# 2. 커밋 메시지와 함께 커밋
git commit -m "기능 추가: 리뷰 시스템 개선"

# 3. GitHub에 푸시
git push
```

또는 `upload-to-github.bat`을 다시 실행하세요!

---

## ❌ 문제 해결

### "fatal: remote origin already exists"

이미 원격 저장소가 설정되어 있습니다. 다음 명령어로 제거 후 다시 추가:

```bash
git remote remove origin
git remote add origin https://github.com/rlgnsdlsla1-ui/jeju-food-map.git
```

### "error: failed to push some refs"

원격 저장소에 로컬에 없는 파일이 있습니다. 먼저 가져온 후 푸시:

```bash
git pull origin main --rebase
git push -u origin main
```

### "permission denied"

GitHub 인증이 필요합니다. Personal Access Token을 생성하여 사용하세요 (위 참조).

### "git: command not found"

Git이 설치되어 있지 않습니다. https://git-scm.com/ 에서 다운로드하여 설치하세요.

### 한글 파일명이 깨짐

```bash
git config --global core.quotepath false
```

---

## 🌐 GitHub에서 확인

업로드가 완료되면 다음 주소에서 확인할 수 있습니다:

**📦 저장소 주소:** https://github.com/rlgnsdlsla1-ui/jeju-food-map

### GitHub 저장소 기능

- **Code:** 소스 코드 확인
- **Issues:** 버그 리포트 및 기능 제안
- **Pull Requests:** 코드 리뷰 및 협업
- **Actions:** CI/CD 자동화 (선택사항)
- **Settings:** 저장소 설정

---

## 🎯 다음 단계

GitHub에 코드를 업로드한 후:

1. **Vercel에 배포**
   - Vercel에서 GitHub 저장소를 연결하여 자동 배포
   - `DEPLOYMENT_GUIDE.md` 참고

2. **협업 설정** (선택사항)
   - Settings → Collaborators에서 팀원 추가
   - Branch protection 설정

3. **README 개선**
   - 스크린샷 추가
   - 데모 링크 추가
   - 배지(Badges) 추가

---

## 💡 Git 기본 명령어

### 자주 사용하는 명령어

```bash
# 상태 확인
git status

# 변경 내역 확인
git log --oneline

# 브랜치 목록 확인
git branch

# 새 브랜치 만들기
git checkout -b feature/new-feature

# 변경 사항 되돌리기 (주의!)
git reset --hard HEAD

# 원격 저장소 확인
git remote -v
```

---

## 📚 추가 자료

- **Git 공식 문서:** https://git-scm.com/doc
- **GitHub 가이드:** https://docs.github.com/
- **Git 한글 튜토리얼:** https://git-scm.com/book/ko/v2

---

업로드 완료를 축하합니다! 🎉

이제 전 세계 어디서나 코드에 접근할 수 있으며, 협업과 배포가 훨씬 쉬워집니다!
