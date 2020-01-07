# Monitor file(s) update(s)
while inotifywait -r -e modify /usr/src/app/source
  do
    bundle exec middleman build --clean
  done
