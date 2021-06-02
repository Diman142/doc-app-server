# doctor-app-server

## Описание 
Серверная приложения для записи к врачу:
1) '/api/gettimes' - Получение данных о времени для записей в определнный день  
2) '/api/insert' - Добавление новой записи в БД  
3) '/api/getdocs' - Получение списка докторов  
4) /api/getreceptions - Получение списка записей для опредленного врача в определенную дату  
5) '/api/delete' - Удаление записей из БД

## Стэк
Для реализации серверной части использовались следующие технологии: Node JS, Express, MySQL, 

## Скрипты 
Доступны следующие скрипты 
npm start - Запуск сервера
npm run devStart = Запуск сервера в режиме разработки (с использованием nodemon)

##Деплой

Для деплоя приложения использовался хостинг heroku
