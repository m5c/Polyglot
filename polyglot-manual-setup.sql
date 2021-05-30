USE mysql;
CREATE USER 'polyglot'@'localhost' IDENTIFIED BY 'loh8eeTooj0i';
CREATE DATABASE polyglot;
GRANT ALL PRIVILEGES ON polyglot.* TO 'polyglot'@'localhost';
