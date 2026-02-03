@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo 카카오맵 API 키 설정
echo ========================================
echo.

if not exist ".env.local" (
    echo [오류] .env.local 파일이 없습니다!
    echo setup-firebase.bat 파일을 먼저 실행하세요.
    echo.
    pause
    exit /b 1
)

echo 카카오맵 API 키를 발급받으셨나요?
echo.
echo 아직 발급받지 않았다면:
echo 1. https://developers.kakao.com 접속
echo 2. 로그인 ^> 내 애플리케이션 ^> 애플리케이션 추가하기
echo 3. 앱 이름: 제주도 푸드맵
echo 4. 앱 키 탭 ^> JavaScript 키 복사
echo 5. 플랫폼 탭 ^> Web 플랫폼 등록 ^> http://localhost:3000
echo.
echo ----------------------------------------
echo.
set /p API_KEY="발급받은 JavaScript 키를 붙여넣으세요: "

if "%API_KEY%"=="" (
    echo.
    echo [오류] API 키를 입력하지 않았습니다.
    pause
    exit /b 1
)

echo.
echo .env.local 파일을 업데이트하는 중...

REM 임시 파일 생성
set TEMP_FILE=.env.local.tmp

REM KAKAO_MAP_API_KEY 라인 찾아서 교체
(for /f "delims=" %%i in (.env.local) do (
    set "line=%%i"
    setlocal enabledelayedexpansion
    if "!line:~0,32!"=="NEXT_PUBLIC_KAKAO_MAP_API_KEY=" (
        echo NEXT_PUBLIC_KAKAO_MAP_API_KEY=%API_KEY%
    ) else (
        echo !line!
    )
    endlocal
)) > "%TEMP_FILE%"

REM 원본 파일 백업
copy .env.local .env.local.backup >nul 2>&1

REM 임시 파일을 원본으로 복사
move /y "%TEMP_FILE%" .env.local >nul

echo.
echo ========================================
echo 카카오맵 API 키 설정 완료!
echo ========================================
echo.
echo 다음 단계:
echo 1. 카카오 개발자 콘솔 확인
echo    - 플랫폼에 http://localhost:3000 등록 확인
echo.
echo 2. 개발 서버 재시작
echo    - 현재 실행 중이라면 Ctrl+C로 종료
echo    - start-dev.bat 실행 또는 npm run dev
echo.
echo 3. 브라우저에서 확인
echo    - http://localhost:3000 접속
echo    - 제주도 지도와 맛집 마커 확인
echo.
echo 백업 파일: .env.local.backup
echo.
pause

