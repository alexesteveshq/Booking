FROM node:13.10.1-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm i -D --save-exact mini-css-extract-plugin@2.4.5
RUN npm install --save-dev axios react-router-dom laravel-echo pusher-js
ENTRYPOINT npm start