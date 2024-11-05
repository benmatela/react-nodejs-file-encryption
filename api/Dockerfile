# Development step:
# This pulls in a node image, sets a working directory for our container, 
# copies our package.json and installs it, and then copies all of our 
# project code into the container.
FROM node:lts as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

# Production step:
# This extends our development step, sets our environment variable, and builds
# the TS code ready to run in production.
FROM base as production

ENV NODE_PATH=./build

RUN npm run build