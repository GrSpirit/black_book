FROM ruby:3.0-alpine

RUN apk --update add gcc musl-dev make tzdata postgresql-dev postgresql-client

ENV APP_USER app
ENV APP_USER_HOME /home/$APP_USER
ENV APP_HOME /usr/src/app

RUN addgroup -S $APP_USER && adduser -h $APP_USER_HOME -S $APP_USER -G $APP_USER

RUN mkdir /var/www && chown -R $APP_USER:$APP_USER /var/www

WORKDIR $APP_HOME
USER $APP_USER

COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY --chown=$APP_USER:$APP_USER . .

USER root
RUN chown -R $APP_USER:$APP_USER $APP_HOME

#COPY entrypoint.sh /usr/bin/
#RUN chmod +x /usr/bin/entrypoint.sh

USER $APP_USER

#RUN rails assets:precompile

#ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
