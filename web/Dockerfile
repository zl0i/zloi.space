FROM node:16.13.2-alpine as build
ARG API_URL
ENV API_URL=${API_URL}
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY ./ ./
RUN npm run build


FROM node:16.13.2-alpine
WORKDIR /app
EXPOSE 3000
ENV NODE_ENV=production
COPY --from=build /app/package*.json ./
RUN npm ci
COPY --from=build /app/ ./
CMD npm start

