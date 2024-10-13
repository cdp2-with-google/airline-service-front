# 베이스 이미지로 nginx 사용
FROM nginx:alpine

# React 앱의 빌드 파일들을 nginx의 기본 경로로 복사
COPY dist /usr/share/nginx/html

# Cloud Run에서 사용할 포트를 지정 (nginx는 기본적으로 3000번 포트를 사용)
EXPOSE 3000

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
