@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo 카카오맵 API 키 업데이트 중...
echo ========================================
echo.

if not exist ".env.local" (
    echo [오류] .env.local 파일이 없습니다!
    echo setup-firebase.bat 파일을 먼저 실행하세요.
    pause
    exit /b 1
)

REM 백업 생성
copy .env.local .env.local.backup >nul 2>&1

REM 새로운 .env.local 파일 생성
(
echo # Firebase 설정
echo NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDZ8SS-ElsJHYtpJO9zg8WumFsqJY8daOo
echo NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=jeju-food-map.firebaseapp.com
echo NEXT_PUBLIC_FIREBASE_PROJECT_ID=jeju-food-map
echo NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=jeju-food-map.firebasestorage.app
echo NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=15626536102
echo NEXT_PUBLIC_FIREBASE_APP_ID=1:15626536102:web:c31693ca76441f3d822067
echo NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-TCPEKC32XV
echo.
echo # 카카오맵 API 키
echo NEXT_PUBLIC_KAKAO_MAP_API_KEY=e662f1658324d0a00f8772c2ba45b567
) > .env.local

echo ========================================
echo ✅ 카카오맵 API 키 설정 완료!
echo ========================================
echo.
echo 설정된 키: e662f1658324d0a00f8772c2ba45b567
echo.
echo 다음 단계:
echo ----------------------------------------
echo 1. 카카오 개발자 콘솔 확인
echo    https://developers.kakao.com
echo    - 플랫폼 탭에 http://localhost:3000 등록 확인
echo.
echo 2. 개발 서버 재시작 (필수!)
echo    - 현재 실행 중이면 Ctrl+C로 종료
echo    - start-dev.bat 실행 또는 npm run dev
echo.
echo 3. 브라우저에서 확인
echo    http://localhost:3000
echo    - Ctrl+Shift+R (강력 새로고침)
echo.
echo 백업 파일: .env.local.backup
echo ========================================
echo.
pause

