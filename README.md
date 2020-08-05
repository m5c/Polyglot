# Polyglot

A browser based vocabulary trainer.

## About

*Polyglot* is a full stack web application.

 * Data persistence in a mySQL database, hosted in a docker container.
 * Server side logic as a Spring-Boot REST backend.
 * User interface as responsive Javascript / Bootstrap webapp.

## Layers

Details for the various layers:

### SQL

Polyglot stipulates the existence of a database ```polyglot```. Create it with:  
```CREATE DATABASE polyglot;```

The table reflects the class ```Card.java```, having the following columns:

 * PK generated id. Starts at 1. Counts up.
 * French. String, as it would be noted on a paper card, e.g. ```l'amour (f)```
 * German. String, as it would be noted on the other side of a paper card,  e.g. ```die Liebe```
 * Box (index ranging from 0-5). 5 are archived cards that can not be queried.

So ultimately, the **generated** layout will look like this:

```SQL
mysql> SELECT * FROM card;
+----+-------------+-----------+-----+
| id | french      | german    | box |
+----+-------------+-----------+-----+
|  1 | L'amour (f) | Die Liebe |   0 |
+----+-------------+-----------+-----+
1 row in set (0.00 sec)
```

### REST

RIF tree:

![rif](documentation/polyglot-rif.png)

 > Note: ```/api``` is common prequel to all REST calls, for clear distinction to the web-ui.

### JS

 * Landing page
   * Select Box, (fill status per box ?)
   * Edit Card
   * Add Card
 * Test page
   * Show A-Side
   * Enter details for B-Side
   * Show result, proceed
   * Back to landing
 * Edit page
   * Search for card, by content
   * Update / Delete card (Id known) (save & reload)
   * Back to landing
 * Add a new card
   * Enter A-Side
   * Enter B-Side
   * Done (save & reload)
   * Back to landing

Illustration of landing page:

![landing](documentation/landing.png)

## Deployment

 * Run the database as a docker container:  

```
docker build -t "polyglot" .
docker run --name=polyglot -p 3333:3306 -d polyglot
```

 * Compile and run the REST backend:  

```
mvn clean package
java -jar target/polyglot-0.1.0.jar
```

 * Open a browser, [access the web-client](http://localhost:8444/polyglot)
