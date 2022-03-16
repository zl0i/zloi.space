FROM node:16.13.2-alpine as build
WORKDIR /app
COPY ./package*.json ./app/
RUN npm install
COPY ./ ./app/
RUN npm run build


FROM node:16.13.2-alpine
WORKDIR /app
COPY --from=build /app/.nuxt /app
EXPOSE 3000
CMD npm start

