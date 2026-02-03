# 패키지 설치 가이드

PowerShell에서 오류가 발생하는 경우, 다음 방법 중 하나를 사용하세요.

## 방법 1: VS Code 통합 터미널 사용 (가장 권장)

1. VS Code에서 `Ctrl + `` (백틱)로 터미널 열기
2. 다음 명령어 실행:
   ```bash
   npm install
   ```
3. 설치 완료 후:
   ```bash
   npm run dev
   ```

## 방법 2: 명령 프롬프트(cmd) 사용

1. Windows 키 + R
2. `cmd` 입력 후 Enter
3. 프로젝트 폴더로 이동:
   ```bash
   cd "C:\Users\USER\Desktop\제주도 푸드맵"
   ```
4. 패키지 설치:
   ```bash
   npm install
   ```
5. 개발 서버 시작:
   ```bash
   npm run dev
   ```

## 방법 3: 배치 파일 실행

1. 프로젝트 폴더에서 `install-and-run.bat` 파일 더블클릭
2. 자동으로 패키지 설치 후 서버 시작

## 설치해야 할 패키지

- firebase (Firebase SDK)
- tailwindcss (스타일링)
- autoprefixer (CSS 자동 접두사)
- postcss (CSS 처리)
- eslint (코드 검사)

## 설치 확인

설치가 완료되면 `node_modules` 폴더에 다음 폴더들이 생성되어야 합니다:
- `firebase`
- `tailwindcss`
- `postcss`
- `autoprefixer`

## 문제 해결

### "npm이 인식되지 않습니다"
- Node.js가 설치되어 있는지 확인: `node --version`
- Node.js 설치: https://nodejs.org/

### "권한 오류"
- 관리자 권한으로 실행
- 또는 `npm install --no-optional` 사용

### "네트워크 오류"
- 인터넷 연결 확인
- 방화벽 설정 확인
- npm 레지스트리 변경: `npm config set registry https://registry.npmjs.org/`


