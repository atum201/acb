FROM node:10.15.3

WORKDIR /usr/src/app

COPY . .

COPY package*.json ./
RUN npm install --save

# RUN npm install firebase-admin

EXPOSE 5000
CMD [ "npm", "start" ]
