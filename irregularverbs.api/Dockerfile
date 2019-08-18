FROM node:10.16-alpine as base
EXPOSE 3000
ENV NODE_ENV=production

RUN apk add --no-cache python

WORKDIR /node
COPY package.json package-lock*.json* yarn.lock* ./

RUN yarn

# stage 2 (development)
FROM base as dev
ENV NODE_ENV=development
ENV PATH=/node/node_modules/.bin:$PATH
WORKDIR /node
RUN yarn
CMD ["nodemon", "server.js"]

#stage 3 (production)
FROM base as prod
WORKDIR /node/app
COPY . .
CMD ["node", "server.js"]

