# Pull from SQL master image and set me as maintainer
FROM mysql/mysql-server:5.7
MAINTAINER maximilian schiedermeier

# Set root password
ENV MYSQL_ROOT_PASSWORD=OojeeWood1ae

# Note: all *.sql scripts located in "/docker-entrypoint-initdb.d" will be executed on first container startup
COPY polyglot-setup.sql /docker-entrypoint-initdb.d/

