FROM node:16.13.2-alpine as build
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build


FROM node:16.13.2-alpine
WORKDIR /app
EXPOSE 3000
COPY --from=builder /app/package*.json ./
RUN npm i --prod
COPY --from=build /app/.nuxt ./
CMD npm start

