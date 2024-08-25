FROM node:lts-alpine
ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN apk update && apk add curl
#RUN chown -R node /usr/src/app
RUN npm run build
#USER node
CMD ["node", "dist/"]
