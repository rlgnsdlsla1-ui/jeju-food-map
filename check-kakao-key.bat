@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo 카카오맵 API 키 확인
echo ========================================
echo.

if not exist ".env.local" (
    echo [오류] .env.local 파일이 없습니다!
    echo.
    echo setup-firebase.bat 파일을 먼저 실행하세요.
    echo.
    pause
    exit /b 1
)

echo .env.local 파일 내용:
echo ----------------------------------------
type .env.local
echo ----------------------------------------
echo.

findstr /C:"NEXT_PUBLIC_KAKAO_MAP_API_KEY" .env.local >nul
if %ERRORLEVEL% EQU 0 (
    echo [확인] NEXT_PUBLIC_KAKAO_MAP_API_KEY 항목을 찾았습니다.
    echo.
    
    findstr /C:"your_kakao_map_api_key" .env.local >nul
    if %ERRORLEVEL% EQU 0 (
        echo [경고] 카카오맵 API 키가 아직 설정되지 않았습니다!
        echo.
        echo 다음 단계를 따라 API 키를 발급받으세요:
        echo.
        echo 1. https://developers.kakao.com 접속
        echo 2. 로그인 ^(카카오 계정^)
        echo 3. 내 애플리케이션 ^> 애플리케이션 추가하기
        echo 4. 앱 이름 입력 ^(예: 제주도 푸드맵^)
        echo 5. 앱 키 탭에서 JavaScript 키 복사
        echo 6. 플랫폼 탭 ^> Web 플랫폼 등록 ^> http://localhost:3000 입력
        echo 7. .env.local 파일을 열어서 복사한 키로 변경
        echo.
        echo 자세한 내용: KAKAO_MAP_SETUP.md 파일 참조
    ) else (
        echo [확인] 카카오맵 API 키가 설정되어 있습니다.
        echo.
        echo 만약 지도가 표시되지 않는다면:
        echo 1. 개발 서버 재시작 ^(Ctrl+C 후 npm run dev^)
        echo 2. 브라우저 캐시 삭제 및 새로고침 ^(Ctrl+Shift+R^)
        echo 3. 브라우저 개발자 도구 ^(F12^) Console 탭에서 오류 확인
        echo.
        echo 카카오 개발자 콘솔에서 확인할 사항:
        echo - 플랫폼에 http://localhost:3000 등록 확인
        echo - API 키가 유효한지 확인
    )
) else (
    echo [오류] NEXT_PUBLIC_KAKAO_MAP_API_KEY 항목이 없습니다!
    echo.
    echo .env.local 파일에 다음 줄을 추가하세요:
    echo NEXT_PUBLIC_KAKAO_MAP_API_KEY=여기에_발급받은_키_입력
    echo.
)

echo.
pause

