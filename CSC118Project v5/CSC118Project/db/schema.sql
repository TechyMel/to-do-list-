CREATE DATABASE todo_app;
USE todo_app;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);

-- Simple todos table
CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  text VARCHAR(255) NOT NULL,
  done TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- demo user: username = test, password = test123 (hashed in PHP below if you want)
INSERT INTO users (username, password_hash)
VALUES ('test', '$2y$10$8G1Uyf2UikF4TA0h0Im15uQwXxEgbP8ik88pslWrAY2jhS2miqWze');
-- password is: test123
