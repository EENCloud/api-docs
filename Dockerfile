FROM ruby:3.1.3

RUN apt update && apt install -y nginx=1.18.0-6.1+deb11u3 \
   inotify-tools=3.14-8.1

CMD ["sh", "-c", "tail -f /dev/null"]

# build api-dockers
WORKDIR /usr/src/app
COPY Gemfile Gemfile.lock ./
ADD . .

RUN bundle install && bundle exec middleman build --clean --verbose

ADD default /etc/nginx/sites-available/default
ADD nginx.conf /etc/nginx/nginx.conf

# log files to standard out and error
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log

CMD ["/bin/sh", "-c", "./run.sh"]
