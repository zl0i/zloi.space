FROM node:16.13.2-alpine as build
WORKDIR /app
COPY ./package*.json ./
RUN npm install --frozen-lockfile
ENV NODE_ENV=production
ENV API_URL="zloi.space"
COPY ./ ./
RUN npm run build


FROM node:16.13.2-alpine
ENV NODE_ENV=production
ENV API_URL="zloi.space"
WORKDIR /app
EXPOSE 3000
COPY --from=build /app/package*.json ./
RUN npm i --frozen-lockfile
COPY --from=build /app/ ./
CMD npm start

