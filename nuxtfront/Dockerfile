FROM node:13
MAINTAINER grspirit

ENV APP_USER app
ENV APP_USER_HOME /home/$APP_USER
ENV APP_HOME /usr/src/app

RUN useradd -m -d $APP_USER_HOME $APP_USER

WORKDIR $APP_HOME

COPY . .
RUN chown -R $APP_USER:$APP_USER $APP_HOME

USER $APP_USER

RUN yarn install --network-timeout 600000
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start", "-H", "0.0.0.0"]
