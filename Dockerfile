FROM node:14 as app-node
WORKDIR /app-front
COPY ./package*.json ./
RUN npm i
COPY . .
RUN npm run build


FROM nginx:1.17.1-alpine
EXPOSE 80
COPY --from=app-node /app-front/dist/app-front-liquidation /usr/share/nginx/html
