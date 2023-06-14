<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Requisitos

1. [Docker Desktop](https://www.docker.com/get-started)
2. [Node](https://nodejs.org/es/)

# Ejecutar en desarrollo

1. Clonar repositorio
2. Abrir terminal como administrador
3. Ejecutar `npm i -g @nestjs/cli`
4. Ejecutar `yarn install`
5. Ejecutar `docker pull mongo:5.0.0`
6. Ejecutar `docker-compose up -d`
7. Ejecutar `yarn start:dev`
8. Realizar request al endpoint: `/api/v2/seed`
