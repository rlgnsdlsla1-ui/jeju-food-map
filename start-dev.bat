@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================
echo 제주도 푸드맵 개발 서버 시작 중...
echo ========================================
echo.

REM Node.js가 설치되어 있는지 확인
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [오류] Node.js가 설치되어 있지 않습니다.
    echo Node.js를 설치해주세요: https://nodejs.org/
    pause
    exit /b 1
)

REM npm이 설치되어 있는지 확인
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [오류] npm이 설치되어 있지 않습니다.
    pause
    exit /b 1
)

REM package.json이 있는지 확인
if not exist "package.json" (
    echo [오류] package.json 파일을 찾을 수 없습니다.
    pause
    exit /b 1
)

REM node_modules가 없으면 설치
if not exist "node_modules" (
    echo node_modules 폴더가 없습니다. 패키지를 설치합니다...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [오류] 패키지 설치에 실패했습니다.
        pause
        exit /b 1
    )
)

REM 필요한 패키지가 설치되어 있는지 확인
if not exist "node_modules\next" (
    echo 필요한 패키지를 설치합니다...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [오류] 패키지 설치에 실패했습니다.
        pause
        exit /b 1
    )
)

echo.
echo 개발 서버를 시작합니다...
echo 브라우저에서 http://localhost:3000 을 열어주세요.
echo.
echo 서버를 중지하려면 Ctrl+C를 누르세요.
echo.
echo ========================================
echo.

npm run dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [오류] 서버 시작에 실패했습니다.
    echo 오류 메시지를 확인해주세요.
    pause
    exit /b 1
)

pause

