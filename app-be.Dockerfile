FROM node:16-alpine3.15
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE ${PORT}
CMD [ "npm", "run", "start:dev" ]
