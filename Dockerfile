FROM ruby:2.6.5

# build api-dockers
WORKDIR /usr/src/app
COPY Gemfile ./
ADD . .

RUN bundle install && bundle exec middleman build --clean --verbose

# fix for apt-get update failing
# https://superuser.com/questions/1423486/issue-with-fetching-http-deb-debian-org-debian-dists-jessie-updates-inrelease
RUN printf "deb http://archive.debian.org/debian/ jessie main\ndeb-src http://archive.debian.org/debian/ jessie main\ndeb http://security.debian.org jessie/updates main\ndeb-src http://security.debian.org jessie/updates main" > /etc/apt/sources.list
# add nginx and setup to serve static pages
RUN apt-get update && apt-get -y install nginx \
  inotify-tools

ADD default /etc/nginx/sites-available/default
ADD nginx.conf /etc/nginx/nginx.conf

# log files to standard out and error
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log

RUN chmod +x ./run.sh
CMD ["/bin/sh", "-c", "./run.sh"]
