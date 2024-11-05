# This pulls in a node image, sets a working directory for our container, 
# copies our package.json and installs it, and then copies all of our 
# project code into the container.
FROM node:18-bullseye-slim

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .