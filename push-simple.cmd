@echo off
echo 제주도 푸드맵 - GitHub 푸시
echo.
cd /d "C:\Users\USER\Desktop\제주도 푸드맵"

echo 1. Git 초기화...
if exist .git rmdir /s /q .git
git init

echo 2. 파일 추가...
git add .

echo 3. 커밋...
git commit -m "제주도 푸드맵 전체 업로드"

echo 4. 브랜치 설정...
git branch -M main

echo 5. 원격 저장소 연결...
git remote add origin https://github.com/rlgnsdlsla1-ui/jeju-food-map.git

echo 6. 푸시...
git push -f origin main

echo.
echo 완료! https://github.com/rlgnsdlsla1-ui/jeju-food-map 에서 확인하세요.
pause
