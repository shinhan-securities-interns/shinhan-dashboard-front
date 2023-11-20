FROM node:14-alpine as builder

# 앱 디렉토리 생성 및 설정
WORKDIR /app

# 앱 의존성 설치
COPY package*.json ./
RUN npm install

# 앱 소스 복사
COPY . .

# 앱 빌드
RUN npm run build

# Production 이미지
FROM nginx:alpine

# Nginx를 사용하여 빌드된 정적 파일을 호스팅
COPY --from=builder /app/build /usr/share/nginx/html

# 포트 설정
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
