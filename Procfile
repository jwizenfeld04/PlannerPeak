web: gunicorn backend.backend.wsgi --log-file -
release: python /backend/manage.py makemigrations --noinput
release: python /backend/manage.py migrate --noinput
