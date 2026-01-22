
GRANT ALL PRIVILEGES ON auth_demo.* TO 'api_user'@'%';

GRANT ALL PRIVILEGES ON auth_demo.* TO 'api_user'@'desktop-8ulhu03';

ALTER USER 'root'@'DESKTOP-8ULHU03' IDENTIFIED WITH mysql_native_password BY 'C@pstoneAJE3';

FLUSH PRIVILEGES;

CREATE DATABASE auth_demo;

USE auth_demo;

CREATE TABLE users (

  id INT AUTO_INCREMENT PRIMARY KEY,

  username VARCHAR(255) NOT NULL UNIQUE,

  password VARCHAR(255) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

SELECT * FROM users;