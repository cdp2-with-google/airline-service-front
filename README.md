# [CDP2] Air Agent

## About

> 해당 프로젝트는 종합설계프로젝트2에서 진행 중이며, `LLM 모델`을 이용한 AI 기반 항공 고객 지원 서비스의 Frontend Repo 입니다.

---

## 배포 사이트

- https://service-client-965998489425.asia-northeast1.run.app/

---

## Preview

### Home
![Air Agent_Home](https://github.com/user-attachments/assets/2bb0ec51-7da1-4bb7-a562-c2bbfa8dab14)

### Chat
![Air Agent_Chat](https://github.com/user-attachments/assets/97cae102-bcbd-40d9-b57a-f7c828bfee4a)


<details>
<summary>Chat Page의 상세 기능들 (모두 AI Agent와 채팅으로 진행)</summary>
<div markdown="1">
  <h3>비행 관련 정보 확인</h3>
  <img src="https://github.com/user-attachments/assets/b3138ddf-8643-4a32-aabf-a5677c412cc6" alt="chat_about_flight_information" />
  <h3>원하는 항공편 조회</h3>
  <img src="https://github.com/user-attachments/assets/dc887041-f440-4508-aec7-7e7fdc68121a" alt="chat_about_current_flight" />
  <h3>항공편 예매(예매 + 결제 + 항공권 발권)</h3>
  <img src="https://github.com/user-attachments/assets/4c3301ec-21e7-4792-94bc-dd392093f755" alt="chat_about_flight_booking" />
</div>
</details>

---

## Usage

1. Git Clone

```cmd
$ git clone https://github.com/cdp2-with-google/airline-service-front.git
```

2. Install package (\* pnpm을 추천드립니다.)

```cmd
$ pnpm install

# or

$ npm install
```

3. Start

```cmd
$ pnpm dev

# or

$ npm run dev
```

4. Build

```cmd
$ pnpm build

# or

$ npm run build
```

5. Deploy

- develop 브랜치에 커밋 추가 시, 자동으로 배포됩니다. (Google Cloud Run 이용)

---

## Path

- `/`: 메인 페이지
  - 랜딩 페이지 + 로그인 기능 제공
- `/chat`: AI Agent 채팅 페이지 (로그인 필요)
  - 비행 관련 정보 문의
  - 항공편 조회
  - 항공권 예매

---

## Simple Project Structure

- `/src/components/pages/**`: 각 Page들을 구성하는 파일들
- `/src/components/chat/**`: 채팅 페이지를 구성하는 파일들
- `/src/api/**`, `/src/types/api.ts`: 서버 통신과 관련한 파일들
- `/src/lib/geminiAPI.ts`, `/src/lib/useGeminiChat.ts`: Google Gemini API 호출 관련 유틸들
- `/src/lib/useLoading.ts`: 로딩 관련 state hook & provider
- `/src/utils/token.ts`: 토큰 관련 유틸 함수
- `/src/AuthWrapper.tsx`: 로그인 여부 체크 위한 wrapper
- `tailwind.config.ts`: tailwind 설정 파일 (스타일 위주)

---

## Styling (tailwind.css)

- 기본 color set: `gray`
  - button (filled)
    - background color: `bg-gray-800`
    - hover color: `hover:bg-gray-600`
    - text color: `text-white`
  - button (outline)
    - background color: `bg-transparent`
    - border color: `border border-gray-200`
    - text color: `text-gray-700`
  - 일반 텍스트
    - text color: `text-gray-500`, `text-gray-600`, `text-gray-700`

---

## 기술 스택

- Node.js v20.15.1
- Base: React v18
- Bundler: Vite v5
- Language: TypeScript v5
- Styling: tailwindcss v3
- HTTP w/server: axios v1.7
- Package Manger: pnpm
- Agent: Google Gemini API
- Infra: Google OAuth, Google Cloud Run
- Code Rule & Formatting: Prettier, eslint
