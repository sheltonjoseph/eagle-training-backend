CREATE DATABASE users;

CREATE TABLE userlist(
    user_id SERIAL PRIMARY KEY ,
    username  VARCHAR(250) UNIQUE NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    phone VARCHAR(200),
    website VARCHAR(200)
);