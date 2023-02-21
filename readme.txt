пример создания фикстуры с помощью docker
docker exec -it c7d92d0c3d18(//это id контейнера backend1) python manage.py dumpdata > PATH/fixtures/dump.json

(для запуска на другом компьютере)
python manage.py dumpdata --exclude auth.permission --exclude contenttypes --indent 2 > fixtures/dump.json

docker exec -it 3816649e4918 python3 manage.py dumpdata --exclude auth.permission --exclude contenttypes --indent 2 > fixtures/dump.json

создания суперюзера через консоль с помощью docker
docker exec -it c7d92d0c3d18(//это id контейнера) python manage.py createsuperuser

amelia/frontend - npm run build

Создание нового проекта: при select'е project_staff нужно обязательно выбрать автора, даже если изначально стоит нужный автор, иначе ошибка и проект не создается