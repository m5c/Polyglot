USE mysql;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
CREATE USER 'polyglot'@'172.17.0.1' IDENTIFIED BY 'loh8eeTooj0i';
# SELECT user,host FROM user;
CREATE DATABASE polyglot;

# 172.17.0.1 is the docker host. We want to grant access to the DB from the host
GRANT ALL PRIVILEGES ON polyglot.* TO 'polyglot'@'172.17.0.1';
#SHOW GRANTS FOR 'polyglot'@'172.17.0.1';
