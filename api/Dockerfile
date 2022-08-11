FROM node:16.13.2-alpine3.15 as builder
WORKDIR /opt/server/
COPY . .
RUN npm ci
RUN npm run build

FROM node:16.13.2-alpine3.15
EXPOSE 3000
WORKDIR /opt/server/
COPY --from=builder /opt/server/package*.json ./
RUN npm i --prod
COPY --from=builder /opt/server/build/ ./
CMD npm run start