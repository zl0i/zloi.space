FROM node:16.13.2-alpine as build
WORKDIR /app
COPY ./package*.json ./
RUN npm install --frozen-lockfile
COPY ./ ./
RUN npm run build


FROM node:16.13.2-alpine
WORKDIR /app
EXPOSE 3000
ENV NODE_ENV=production
COPY --from=build /app/package*.json ./
RUN npm i --frozen-lockfile
COPY --from=build /app/ ./
CMD npm start

