@echo off
cd /d "%~dp0"
git init
git add .
git commit -m "Initial commit: 제주도 푸드맵 프로젝트"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/rlgnsdlsla1-ui/jeju-food-map.git
git push -u origin main
pause
