@echo off
echo ========================================
echo 제주도 푸드맵 자동 시작 설정
echo ========================================
echo.

set "SCRIPT_DIR=%~dp0"
set "STARTUP_FOLDER=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "BATCH_FILE=%SCRIPT_DIR%start-dev-silent.bat"

echo 현재 프로젝트 경로: %SCRIPT_DIR%
echo 시작 프로그램 폴더: %STARTUP_FOLDER%
echo.

REM 시작 프로그램 폴더에 바로가기 생성
powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%STARTUP_FOLDER%\제주도푸드맵-자동시작.lnk'); $Shortcut.TargetPath = '%BATCH_FILE%'; $Shortcut.WorkingDirectory = '%SCRIPT_DIR%'; $Shortcut.Save()"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [성공] 자동 시작이 설정되었습니다!
    echo 재부팅 후 자동으로 개발 서버가 시작됩니다.
) else (
    echo.
    echo [오류] 자동 시작 설정에 실패했습니다.
    echo 관리자 권한으로 실행해보세요.
)

echo.
pause


