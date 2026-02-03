@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================
echo GitHub에 프로젝트 업로드 중...
echo ========================================
echo.

REM Git이 설치되어 있는지 확인
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [오류] Git이 설치되어 있지 않습니다.
    echo Git을 설치해주세요: https://git-scm.com/
    pause
    exit /b 1
)

REM Git 저장소 초기화
echo [1/5] Git 저장소 초기화 중...
git init
if %ERRORLEVEL% NEQ 0 (
    echo Git 저장소가 이미 초기화되어 있습니다.
)

REM 모든 파일 추가
echo.
echo [2/5] 파일 추가 중...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo [오류] 파일 추가에 실패했습니다.
    pause
    exit /b 1
)

REM 커밋
echo.
echo [3/5] 커밋 생성 중...
git commit -m "Initial commit: 제주도 푸드맵 프로젝트"
if %ERRORLEVEL% EQU 1 (
    echo 커밋할 변경사항이 없습니다.
)

REM 메인 브랜치로 변경
echo.
echo [4/5] 브랜치 설정 중...
git branch -M main

REM 원격 저장소 추가
echo.
echo [5/5] GitHub 원격 저장소 연결 중...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/rlgnsdlsla1-ui/jeju-food-map.git
if %ERRORLEVEL% NEQ 0 (
    echo [오류] 원격 저장소 추가에 실패했습니다.
    pause
    exit /b 1
)

REM GitHub에 푸시
echo.
echo ========================================
echo GitHub에 업로드 중...
echo ========================================
echo.
echo GitHub 로그인이 필요할 수 있습니다.
echo 브라우저가 열리면 로그인해주세요.
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✅ 업로드 완료!
    echo ========================================
    echo.
    echo GitHub 저장소: https://github.com/rlgnsdlsla1-ui/jeju-food-map
    echo.
) else (
    echo.
    echo ========================================
    echo ❌ 업로드 실패
    echo ========================================
    echo.
    echo 문제 해결:
    echo 1. GitHub에 로그인되어 있는지 확인
    echo 2. 저장소 권한이 있는지 확인
    echo 3. Git 자격 증명이 설정되어 있는지 확인
    echo.
    echo 수동으로 다시 시도하려면:
    echo git push -u origin main
    echo.
)

pause
