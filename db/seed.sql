DROP TABLE IF EXISTS users;

CREATE TABLE users
(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(100),
  password VARCHAR(250)
);