FROM nginx:1.19.2-alpine

EXPOSE 80
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./src /var/www/static/

