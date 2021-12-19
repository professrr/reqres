# reqres
Reqres.in scrapper
* Frontend - Vue3.js
* API - Node.js & Express
* Scrapper - Node.js
* MQ - RabbitMQ
* DB - MongoDB

## Запуск
Для запуска используйте следующие команды, при этом config.env - единая точка для всех переменных окружения:

```bash
sudo docker-compose --env-file ./config.env build

sudo docker-compose --env-file ./config.env up -d
```

## Примечание
При остановке запущеного процесса кроулинга - кроулинг продолжится пока не сохранит документы