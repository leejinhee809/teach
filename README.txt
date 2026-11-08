수업내용 앱 (PWA) 올리는 방법 — GitHub Pages

1. github.com 로그인 → 오른쪽 위 + → New repository
   - 이름: sueop (원하는 영어 이름)  /  Public 선택 → Create repository
2. "uploading an existing file" 클릭
   → 이 폴더의 파일을 모두 끌어다 놓기 (index.html, manifest.webmanifest, sw.js, icons 폴더)
   → Commit changes
3. Settings → Pages → Branch: main / (root) → Save
4. 1~2분 뒤 주소가 생김:  https://내아이디.github.io/sueop/
5. 휴대폰에서 그 주소 열기
   - 안드로이드(크롬): ⋮ → 앱 설치 (또는 홈 화면에 추가)
   - 아이폰(사파리): 공유 → 홈 화면에 추가

※ 기존 기록 옮기기: 지금 쓰던 앱에서 [백업] → 새 앱에서 [복구]
※ 앱을 고친 뒤 다시 올릴 때는 sw.js 맨 위 VERSION 을 v2, v3 … 로 올려 주세요
