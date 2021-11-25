FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn add glob rimraf

RUN yarn add --only=development

COPY src .
COPY tsconfig*.json .

RUN yarn build
