FROM node:14-alpine as build
ENV NODE_ENV=production
ENV INSTALL_PATH=/home/wemarket

WORKDIR $INSTALL_PATH
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
ADD package.json $INSTALL_PATH
ADD yarn.lock $INSTALL_PATH

RUN cd $INSTALL_PATH && \
  yarn install

COPY . .

RUN ls $INSTALL_PATH
RUN yarn build

EXPOSE 4000

CMD [ "npm", "run", "server"]
