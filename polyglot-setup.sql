USE mysql;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
CREATE USER 'polyglot'@'172.%' IDENTIFIED BY 'loh8eeTooj0i';
CREATE DATABASE polyglot;
GRANT ALL PRIVILEGES ON polyglot.* TO 'polyglot'@'172.%';
