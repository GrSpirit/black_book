FROM node:15-alpine
MAINTAINER grspirit

RUN apk --update add python2 make gcc g++

ENV APP_USER app
ENV APP_USER_HOME /home/$APP_USER
ENV APP_HOME /usr/src/app

RUN addgroup -S $APP_USER && adduser -h $APP_USER_HOME -S $APP_USER -G $APP_USER

WORKDIR $APP_HOME

COPY package.json yarn.lock ./

RUN chown -R $APP_USER:$APP_USER $APP_HOME

USER $APP_USER

RUN yarn install --network-timeout 600000

COPY --chown=$APP_USER:$APP_USER . .
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start", "-H", "0.0.0.0"]
#CMD ["yarn", "dev", "-H", "0.0.0.0"]
