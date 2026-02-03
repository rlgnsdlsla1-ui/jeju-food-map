@echo off
chcp 65001 >nul
echo ========================================
echo 제주도 푸드맵 패키지 설치 및 서버 시작
echo ========================================
echo.

echo [1/2] 패키지 설치 중...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo 오류: 패키지 설치에 실패했습니다.
    echo VS Code 터미널에서 직접 실행해주세요:
    echo   npm install
    pause
    exit /b 1
)

echo.
echo [2/2] 개발 서버 시작 중...
echo 브라우저에서 http://localhost:3000 을 열어주세요.
echo 서버를 중지하려면 Ctrl+C를 누르세요.
echo.
call npm run dev

pause


