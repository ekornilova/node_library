FROM node:14.18.0

WORKDIR /app

ARG NODE_ENV=production

COPY package*.json ./

RUN npm install
COPY src ./src

CMD ["npm", "run", "server"]