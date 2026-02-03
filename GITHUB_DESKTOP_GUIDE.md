# GitHub Desktop으로 푸시하기

PowerShell 오류가 발생할 때 가장 쉽고 확실한 방법입니다.

## 1단계: GitHub Desktop 설치

1. https://desktop.github.com/ 접속
2. **Download for Windows** 클릭
3. 다운로드한 파일 실행하여 설치

## 2단계: GitHub 로그인

1. GitHub Desktop 실행
2. **Sign in to GitHub.com** 클릭
3. 브라우저에서 GitHub 로그인
4. 권한 승인

## 3단계: 저장소 추가

1. **File** → **Add local repository** 클릭
2. **Choose...** 버튼 클릭
3. `C:\Users\USER\Desktop\제주도 푸드맵` 폴더 선택
4. **Add repository** 클릭

저장소가 없다는 메시지가 나오면:
- **create a repository** 클릭

## 4단계: 원격 저장소 연결

1. **Repository** → **Repository settings** 클릭
2. **Remote** 탭 선택
3. **Primary remote repository (origin):**
   - URL: `https://github.com/rlgnsdlsla1-ui/jeju-food-map.git`
4. **Save** 클릭

## 5단계: 커밋 & 푸시

1. 좌측에 변경된 파일 목록이 표시됩니다
2. 하단 **Summary** 입력: `제주도 푸드맵 프로젝트`
3. **Commit to main** 버튼 클릭
4. 상단 **Push origin** 버튼 클릭

## 완료! 🎉

https://github.com/rlgnsdlsla1-ui/jeju-food-map 에서 코드를 확인하세요!

---

## 문제 해결

### "repository not found" 오류
- Repository settings에서 URL 확인
- GitHub에 로그인되어 있는지 확인

### "authentication failed" 오류
- File → Options → Accounts
- Sign out 후 다시 Sign in

### 파일이 너무 많이 표시됨
- `.gitignore` 파일이 제대로 작동하는지 확인
- `node_modules/`와 `.next/`는 제외되어야 함
