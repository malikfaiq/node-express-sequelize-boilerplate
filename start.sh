#!/bin/bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run dev
