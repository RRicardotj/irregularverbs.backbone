FROM node:10.16-alpine as base
EXPOSE 3000
ENV NODE_ENV=production

RUN apk --no-cache add --virtual builds-deps build-base python

WORKDIR /node
COPY package.json package-lock*.json* yarn.lock* ./

RUN npm install && npm cache clean --force

# stage 2 (development)
FROM base as dev
ENV NODE_ENV=development
ENV PATH=/node/node_modules/.bin:$PATH
WORKDIR /node
RUN npm install --only=development
CMD ["nodemon", "server.js"]

#stage 3 (production)
FROM base as prod
WORKDIR /node/app
COPY . .
CMD ["node", "server.js"]

