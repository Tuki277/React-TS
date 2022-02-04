FROM node:slim

WORKDIR /usr/frontend/src/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]