web: sh -c 'cd ./backend/ && exec gunicorn backend.wsgi --log-file -'
release: python manage.py makemigrations --noinput
release: python manage.py migrate --noinput
