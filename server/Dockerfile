FROM node:alpine

WORKDIR /usr/server

COPY package.json yarn.lock ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["yarn", "start"]
