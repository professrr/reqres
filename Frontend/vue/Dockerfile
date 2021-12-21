# build-stage
FROM node:lts-alpine as build-stage
ARG VUE_APP_API_PORT
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN echo "VUE_APP_API_PORT=${VUE_APP_API_PORT}" > .env
RUN npm run build

# production-stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app /app
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


