@echo off
chcp 65001 >nul
echo ========================================
echo Firebase 환경 변수 설정
echo ========================================
echo.

echo .env.local 파일을 생성합니다...
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
echo # 카카오맵 API 키 ^(나중에 설정^)
echo NEXT_PUBLIC_KAKAO_MAP_API_KEY=
) > .env.local

if exist ".env.local" (
    echo.
    echo ✓ .env.local 파일이 성공적으로 생성되었습니다!
    echo.
    echo 다음 단계:
    echo 1. Firebase Console에서 Authentication 설정
    echo 2. Firestore Database 생성
    echo 3. npm run dev 실행
    echo.
) else (
    echo.
    echo ✗ 파일 생성에 실패했습니다.
    echo 수동으로 .env.local 파일을 만들어주세요.
    echo.
)

pause


