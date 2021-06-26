FROM node:14

WORKDIR /ep2as-public-api

COPY . .

RUN npm install
