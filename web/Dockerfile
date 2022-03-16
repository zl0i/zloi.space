FROM node:16.13.2-alpine as build
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build


FROM node:16.13.2-alpine
WORKDIR /app
COPY --from=build /app/.nuxt ./
EXPOSE 3000
CMD npm start

