FROM mysql/mysql-server:5.7
MAINTAINER maximilian schiedermeier
ENV MYSQL_ROOT_PASSWORD=OojeeWood1ae

# copy my script that set up the DB into the container
COPY polyglot-setup.sql /docker-entrypoint-initdb.d/
#RUN /bin/bash -c "mysql -uroot -pOojeeWood1ae < /docker-entrypoint-initdb.d/polyglot-setup.sql"


# Working:
# docker exec -it polyglot mysql -uroot -pOojeeWood1ae

# Not working:
# mysql -h 127.0.0.1 -P 3333 --protocol=tcp -uroot -pOojeeWood1ae

#FROM openjdk:8-jre-alpine
#COPY target/polyglot-0.1.0.jar /home/polyglot.jar
#CMD ["java","-jar","/home/polyglot.jar"]
