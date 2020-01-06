# Monitor file(s) update(s) in the background
if [ "$EEN_ENVIRONMENT" != "prod" ]; then
  sh ./watch.sh&
fi

# Nginx
nginx -g 'daemon off;'
