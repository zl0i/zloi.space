FROM node:16.13.2-alpine3.15 as builder
ARG API_URL
ENV API_URL=${API_URL}
WORKDIR /app
COPY ./ ./
RUN npm ci
RUN npm run build


FROM node:16.13.2-alpine3.15 as runner
WORKDIR /app
EXPOSE 3000
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
RUN npm ci
COPY --from=builder /app/ ./
CMD npm start

