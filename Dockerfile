#stage 1
FROM node:latest as node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/resume-site-angular /usr/share/nginx/html