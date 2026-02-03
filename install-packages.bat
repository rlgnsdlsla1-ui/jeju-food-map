@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo 패키지 설치 중...
echo ========================================
echo.

call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo 패키지 설치 완료!
    echo ========================================
    echo.
    echo 개발 서버를 시작하려면:
    echo   npm run dev
    echo 또는
    echo   start-dev.bat
    echo.
) else (
    echo.
    echo ========================================
    echo 패키지 설치 중 오류가 발생했습니다.
    echo ========================================
    echo.
)

pause
