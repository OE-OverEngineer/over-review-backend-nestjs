FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock .

RUN yarn add glob rimraf

RUN yarn install

COPY . .

CMD yarn start:debug
