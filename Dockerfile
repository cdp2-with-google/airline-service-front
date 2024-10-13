# 1. Node.js 이미지에서 빌드 환경 설정
FROM node:18 AS build

# 2. pnpm 설치
RUN npm install -g pnpm

# 3. 애플리케이션 소스 코드가 저장될 디렉토리 생성
WORKDIR /app

# 4. 의존성 설치를 위해 package.json과 pnpm-lock.yaml 파일 복사
COPY package.json pnpm-lock.yaml /app/

# 5. pnpm을 사용하여 의존성 설치
RUN pnpm install

# 6. 전체 소스 코드를 /app 디렉토리로 복사
COPY . /app

# 7. Vite로 빌드 (React 애플리케이션을 정적 파일로 빌드)
RUN pnpm build

# 8. Nginx를 사용할 이미지를 설정 (배포용)
FROM nginx:alpine

# 9. Nginx 포트를 8080으로 변경
RUN sed -i 's/listen 80;/listen 8080;/' /etc/nginx/conf.d/default.conf

# 10. 빌드된 애플리케이션을 Nginx의 기본 경로로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 11. Cloud Run에서 요구하는 포트 8080을 노출
EXPOSE 8080

# 12. Nginx 실행 (daemon off로 포그라운드 모드 실행)
CMD ["nginx", "-g", "daemon off;"]
