FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm i -g nodemon

RUN npm i 

COPY . .
CMD ["nodemon","app.js"]

