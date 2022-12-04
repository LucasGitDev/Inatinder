<p align="center">
  <img src="./assets/logo.svg" width="200" alt="" />
</p>
<br>

<h1 align="center">Inatinder</h1>
<br>
  <p align="center">Inspired by a social network to meet new people with the same interests, focused on our region/university and local events.</p>
    <p align="center">



## Description

Inatinder API RESTful backend.

## Prerequisites
- Docker and Docker Compose
- Node 16.18.0

## Installation

```bash
$ npm install
```

## Env Example

```bash
NODE_ENV=development

DB_NAME=inatinder_dev
DB_HOST=localhost
DB_USER=inatinder
DB_PASSWORD=senhaforte

SECRET_JWT=ihul-my-super-secret-jwt

```

## Running the app

```bash
# start mysql container
$ docker-compose up -d
```
Run, in order, each `*.sql` files in migrations folder, that will contain database schema in version history.

The database name must be equals to `.env` file, system will use it to connect.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

It's done. Server is up on port `3000`.

To consult the data API, use Insomnia and import the `API.json` file that is inside the `docs` folder

<br>
<br>

## Observation
All process to install and run needs to get `.env` preset configured.