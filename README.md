<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Project Structure

over-review-backend  
├── node_modules\
├── src\
│ ├── domain\
│ │ ├── config\
│ │ │ ├── blobStorage.interface.ts\
│ │ │ ├── database.interface.ts\
│ │ │ └── jwt.interface.ts\
│ │ └── repositories\
│ │ ├── actorRepository.interface.ts\
│ │ ├── categoriesRepsository.interface.ts\
│ │ └── …Repository.interface.ts\
│ ├── infrastructure\
│ │ ├── Auth /\
│ │ ├── config /\
│ │ ├── controllers\
│ │ │ ├── actors\
│ │ │ │ └── actors.controllers.ts\
│ │ │ ├── auth\
│ │ │ │ └── auth.controllers.ts\
│ │ │ ├── …\
│ │ │ │ └── … .controllers.ts\
│ │ │ └── controllers.module.ts\
│ │ ├── dto\
│ │ │ ├── actors\
│ │ │ │ ├── createActor.dto.ts\
│ │ │ │ └── updateActor.dto.ts\
│ │ │ ├── category\
│ │ │ │ ├── createCategory.dto.ts\
│ │ │ │ └── updateCategory.dto.ts\
│ │ │ ├── …\
│ │ │ │ ├── create … .dto.ts\
│ │ │ │ └── update … .dto.ts\
│ │ ├── entities\
│ │ │ ├── actor.entity.ts\
│ │ │ ├── category.entity.ts\
│ │ │ └── … . entity.ts\
│ │ ├── repositories\
│ │ │ ├── actors\
│ │ │ │ └── actors.repository.ts\
│ │ │ ├── auth\
│ │ │ │ └── auth.repository.ts\
│ │ │ ├── …\
│ │ │ │ └── … .repository.ts\
│ │ │ └── repository.module.ts\
│ │ ├── validators\
│ │ ├── actors\
│ │ │ └── actors.validators.ts\
│ │ ├── auth\
│ │ │ └── auth.validators.ts\
│ │ ├── …\
│ │ │ └── … .validators.ts\
│ │ └── validators.module.ts\
│ │\
│ └── usecases\
│ ├── actors\
│ │ └── actors.usecase.ts\
│ ├── auth\
│ │ └── auth.usecase.ts\
│ └── …\
│ └── … .usecase.ts\
├── .env\
├── docker-compose.yaml\
└── DockerFile\
ทีมเรามีการทำโปรเจค Backend แบบ Hexagonal architecture ซึ่งจะแบ่ง Backend ออกเป็น 3 โฟลเดอร์
หลักคือ domain , infrastructure และ use cases ซึ่ง

- src
  - domain จะเก็บ interface หรือ skeleton ของทุกๆฟังก์ชันซึ่งข้างในประกอบไปด้วย
    - config เป็น interface ที่ใช้สำหรับการเรียก config ไฟล์
    - repositories เป็น interface ที่ใช้สำหรับการ
  - infrastructure จะเก็บข้อมูลที่เกี่ยวกับทาง technical ซึ่งส่วนใหญ่จะเป็น implement มาจาก
    โฟลเดอร์ domain
    - auth จะเป็น โฟลเดอร์ที่เกี่ยวกับ authorization
    - config จะเป็นโฟลเดอร์ที่เกี่ยวข้องกับการตั้งค่า เช่น database , typeorm เป็นต้น
    - controllers จะเป็นโฟลเดอร์ที่ ทำหน้าที่เป็น ตัวจัดการ route
    - dto เป็นโฟลเดอร์ที่ทำหน้าที่เป็นตัวรับข้อมูล
    - entities เป็นโฟลเดอร์ที่เก็บข้อมูลใน model ใน database
    - repositories เป็นโฟลเดอร์ที่จัดการข้อมูลกับ database
    - validators เป็นโฟลเดอร์ที่นำมาใช้ในการ validate ข้อมูล
  - use cases จะเป็นตัวเรียกใช้ repository ซึ่งในส่วนของ use case นี้จะเป็นส่วนที่เกี่ยวข้องกับ
    business logic
    ละด้านนอกโปรเจคจะมีไฟล์
- .env เป็นไฟล์ที่เก็บ value สำหรับ config
- DockerFile เป็นไฟล์ที่ใช้สำหรับการรัน docker
- Docker-compose เป็นไฟล์ที่ใช้สำหรับจัดเตรียม Environment ต่างเช่น Database
