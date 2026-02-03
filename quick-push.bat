@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo 🚀 빠른 GitHub 푸시
echo ========================================
echo.

REM 변경사항이 있는지 확인
git status --short >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [오류] Git 저장소가 초기화되지 않았습니다.
    echo force-push.bat를 먼저 실행해주세요.
    pause
    exit /b 1
)

REM 커밋 메시지 입력
set /p commit_msg="커밋 메시지를 입력하세요 (엔터=기본 메시지): "

if "%commit_msg%"=="" (
    set commit_msg=프론트엔드 수정 및 업데이트
)

echo.
echo 📝 커밋 메시지: %commit_msg%
echo.

REM 변경사항 추가
echo [1/3] 변경된 파일 추가 중...
git add .

REM 커밋
echo [2/3] 커밋 생성 중...
git commit -m "%commit_msg%"

if %ERRORLEVEL% EQU 1 (
    echo.
    echo ℹ️ 변경사항이 없습니다.
    pause
    exit /b 0
)

REM 푸시
echo [3/3] GitHub에 푸시 중...
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✅ 푸시 완료!
    echo ========================================
    echo.
    echo GitHub: https://github.com/rlgnsdlsla1-ui/jeju-food-map
    echo.
    echo Vercel이 연동되어 있다면 1-2분 후 자동 배포됩니다.
    echo.
) else (
    echo.
    echo ========================================
    echo ❌ 푸시 실패
    echo ========================================
    echo.
    echo GitHub 로그인이 필요할 수 있습니다.
    echo GitHub Desktop 사용을 권장합니다.
    echo.
)

timeout /t 3 /nobreak >nul
