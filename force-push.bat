@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo GitHub 강제 푸시 시작
echo ========================================
echo.

REM Git 확인
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [오류] Git이 설치되어 있지 않습니다.
    echo https://git-scm.com/ 에서 Git을 설치해주세요.
    pause
    exit /b 1
)

echo [1] Git 저장소 초기화...
if exist ".git" (
    echo 기존 Git 저장소 발견. 삭제 중...
    rmdir /s /q .git
)
git init
echo ✓ 완료

echo.
echo [2] 파일 추가 중...
git add .
echo ✓ 완료

echo.
echo [3] 커밋 생성 중...
git commit -m "제주도 푸드맵 프로젝트 - 전체 코드 업로드"
echo ✓ 완료

echo.
echo [4] 브랜치 설정 중...
git branch -M main
echo ✓ 완료

echo.
echo [5] 원격 저장소 연결 중...
git remote add origin https://github.com/rlgnsdlsla1-ui/jeju-food-map.git
echo ✓ 완료

echo.
echo ========================================
echo [6] GitHub에 푸시 중...
echo ========================================
echo.
echo ⚠️ GitHub 인증이 필요합니다.
echo 브라우저가 열리면 로그인해주세요.
echo.

git push -f origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✅ 푸시 성공!
    echo ========================================
    echo.
    echo 저장소 주소:
    echo https://github.com/rlgnsdlsla1-ui/jeju-food-map
    echo.
    echo Vercel 배포도 진행하시겠습니까?
    echo DEPLOYMENT_GUIDE.md 파일을 참고하세요.
    echo.
) else (
    echo.
    echo ========================================
    echo ❌ 푸시 실패
    echo ========================================
    echo.
    echo 가능한 원인:
    echo 1. GitHub 로그인이 필요합니다
    echo 2. Personal Access Token이 필요할 수 있습니다
    echo 3. 저장소 권한을 확인해주세요
    echo.
    echo Personal Access Token 생성 방법:
    echo 1. GitHub.com 접속 후 로그인
    echo 2. 우측 상단 프로필 ^> Settings
    echo 3. Developer settings ^> Personal access tokens ^> Tokens (classic)
    echo 4. Generate new token
    echo 5. repo 권한 체크 후 생성
    echo 6. 생성된 토큰을 복사하여 비밀번호로 사용
    echo.
)

pause
