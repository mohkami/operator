FROM node:10
#RUN npm install -g yarn
#RUN apk add --update nodejs nodejs-npm
COPY . /src
WORKDIR /src
RUN npm install 
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
