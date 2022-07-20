## NODE TANK (end of studies project boilerplate)

- [x] Database ([typeorm](https://www.yarnjs.com/package/typeorm)).
- [x] Config Service ([@nestjs/config](https://www.yarnjs.com/package/@nestjs/config)).
- [x] Mailing ([nodemailer](https://www.yarnjs.com/package/nodemailer), [@nestjs-modules/mailer](https://www.yarnjs.com/package/@nestjs-modules/mailer)).
- [x] Socket gateway
- [x] Sign in and sign up via email.
- [x] Admin and User roles.
- [x] File uploads.
- [x] Swagger.
- [x] Docker.

## Quick run

```bash
cp config/envs/env-example config/envs/.env
docker-compose up -d
```

For check status run

```bash
docker-compose logs
```

## Comfortable development

```bash
cp envs/env-example envs/.env
```

Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

Run additional container:

```bash
docker-compose up -d database adminer maildev redis
```

```bash
yarn

yarn migration:run

yarn seed:run

yarn start:dev
```

## Database utils

Generate migration

```bash
yarn migration:generate -- CreateNameTable
```

Run migration

```bash
yarn migration:run
```

Revert migration

```bash
yarn migration:revert
```

Drop all tables in database

```bash
yarn schema:drop
```
