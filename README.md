# Book Collection API

## Описание

Этот проект представляет собой RESTful API для управления коллекцией книг. API позволяет пользователям добавлять книги, просматривать список книг, обновлять информацию о книгах и удалять книги. Также реализованы функции управления пользователями и их ролями с использованием битовых масок.

## Технологии

- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Tokens)
- bcrypt
- nodemailer

## Структура проекта

```
book-collection-api/
│
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── userController.js
│
├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── bookModel.js
│   └── userModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── userRoutes.js
│
├── utils/
│   ├── emailService.js
│   └── roleUtils.js
│
├── .env
├── app.js
├── package.json
└── README.md
```


## Установка

1. Клонируйте репозиторий:
    ```bash
    git clone https://github.com/yourusername/book-collection-api.git
    cd book-collection-api
    ```

2. Установите зависимости:
    ```bash
    npm install
    ```

3. Настройте базу данных PostgreSQL:

    Создайте базу данных и пользователя:
    ```sql
    CREATE DATABASE bookcollection;
    CREATE USER your_username WITH PASSWORD 'your_password';
    GRANT ALL PRIVILEGES ON DATABASE bookcollection TO your_username;
    ```

    Подключитесь к базе данных и создайте таблицы:
    ```sql
    \c bookcollection

    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      role INTEGER NOT NULL
    );

    CREATE TABLE books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      publication_date DATE NOT NULL,
      genres VARCHAR(255)[] NOT NULL
    );
    ```

4. Создайте файл `.env` в корневой папке проекта и добавьте в него следующие переменные окружения:
    ```dotenv
    DATABASE_URL=postgres://your_username:your_password@localhost:5432/bookcollection
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_email_password
    ```

5. Запустите сервер:
    ```bash
    node app.js
    ```

## Использование

### Регистрация пользователя

```http
POST /auth/register
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123",
  "email": "testuser@example.com"
}
```

### Аутентификация пользователя

```http
POST /auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

### Получение информации о текущем пользователе

```http
GET /auth/me
Authorization: your_jwt_token
```

### Добавление книги

```http
POST /books
Authorization: your_jwt_token
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publicationDate": "1925-04-10",
  "genres": ["Classic", "Novel"]
}
```

### Получение списка книг
```http
GET /books
```

### Получение книги по ID
```http
GET /books/:id
```

### Обновление информации о книге
```http
PUT /books/:id
Authorization: your_jwt_token
Content-Type: application/json

{
  "title": "Updated Title",
  "author": "Updated Author",
  "publicationDate": "2024-01-01",
  "genres": ["Updated Genre"]
}
```

### Удаление книги
```http
DELETE /books/:id
Authorization: your_jwt_token
```

### Изменение роли пользователя

```http
PUT /users/:id/role
Authorization: your_jwt_token
Content-Type: application/json

{
  "role": 1  // 1 - администратор, 2 - пользователь и т.д.
}
```
