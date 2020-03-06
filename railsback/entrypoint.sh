#!/bin/bash
set -e

rm -f $APP_HOME/tmp/pids/server.pid
rm -f $APP_HOME/tmp/pids/sidekiq.pid

rails db:create
rails db:migrate

exec "$@"
