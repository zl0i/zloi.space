FROM node:16.13.2-alpine as build
WORKDIR /app
COPY ./src/package*.json ./
RUN npm install
COPY ./src .
RUN npm run build


FROM nginx:1.19.2-alpine
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/static/
EXPOSE 80

