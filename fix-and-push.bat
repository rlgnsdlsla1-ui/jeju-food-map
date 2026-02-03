@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo 빌드 오류 수정 및 재푸시
echo ========================================
echo.

echo [1/4] 변경사항 추가...
git add .

echo [2/4] 커밋 생성...
git commit -m "Fix: Vercel 빌드 오류 수정 - Firebase analytics async 처리, TypeScript 타입 수정"

echo [3/4] GitHub에 푸시...
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✅ 푸시 완료!
    echo ========================================
    echo.
    echo 다음 단계:
    echo 1. Vercel 대시보드 접속
    echo 2. 자동 재배포 확인 (1-2분 소요)
    echo 3. 배포 완료 후 사이트 확인
    echo.
    echo Vercel: https://vercel.com/dashboard
    echo GitHub: https://github.com/rlgnsdlsla1-ui/jeju-food-map
    echo.
    echo 수정 내용:
    echo - Firebase analytics를 async로 변경
    echo - TypeScript 타입 명시
    echo - Next.js 설정 최적화
    echo - 환경 변수 예제 파일 추가
    echo - Vercel 배포 가이드 추가
    echo.
) else (
    echo.
    echo ========================================
    echo ❌ 푸시 실패
    echo ========================================
    echo.
    echo GitHub 로그인을 확인하세요.
    echo.
)

pause
