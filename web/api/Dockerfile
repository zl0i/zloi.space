FROM node:16.13.2-alpine3.15 as builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:16.13.2-alpine3.15 as runner
EXPOSE 3000
WORKDIR /app
COPY --from=builder /app/package.json ./package.json
RUN npm ci
COPY --from=builder /app/dist/ ./
CMD npm run start