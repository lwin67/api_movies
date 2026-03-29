CREATE DATABASE movie_db;
USE movie_db;

CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  poster_url VARCHAR(500),
  rating DECIMAL(2,1),
  likes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
