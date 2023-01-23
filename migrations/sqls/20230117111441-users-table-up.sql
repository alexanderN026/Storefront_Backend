CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    password VARCHAR(50)
);