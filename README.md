# ts-orders-service


### Made with:
- Open API Documentation generate with [Swagger](https://swagger.io/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [TypeORM](https://typeorm.io/)
- [Metabase](https://www.metabase.com/)

### Steps to run
- Up containers `docker-compose up`

### Available Scripts
- Run tests: `docker-compose run api npm test`
  - Or if you want, you can run outside container(make sure that you have performed `npm i` before): `npm test`
- Migrations are created (make sure that you have performed `npm i` before)Create migration: `typeorm migration:create ./src/migrations/NAME`
