# Polyglot

A browser based vocabulary trainer.

## About

*Polyglot* is a full stack web application.

 * Data persistence in a mySQL database, hosted in a docker container.
 * Server side logic as a Spring-Boot REST backend.
 * User interface as responsive Javascript / Bootstrap webapp.

## Layers

Details for the various layers:

### Database

The actual vocabulary is persisted in a mySQL database. There is jsut a single table: ```polycglot.card```. Every line represents a vocabulary card with two language entries, an id and a box. The latter represents the cards positioning in a vocabulary box with 5 spaces.

Sample:  
```SQL
mysql> SELECT * FROM card;
+----+-----+----------------------------+-------------------------+
| id | box | french                     | german                  |
+----+-----+----------------------------+-------------------------+
|  1 |   3 | niaiser                    | herumblödeln            |
|  2 |   3 | biscuit (m)                | Keks (m)                |
|  3 |   2 | sans gluten                | glutenfrei              |
|  4 |   0 | torchon (m)                | Küchentuch (n)          |
|  5 |   1 | école de fôret imperiale   | imperiale waldorfschule |
|  6 |   0 | bac à sable (m)            | Sandkasten (m)          |
|  7 |   0 | abri antiatomique (m)      | Atomschutzbunker (m)    |
|  8 |   0 | nid d'oiseau (m)           | Vogelnest (n)           |
|  9 |   0 | étoile (f)                 | Stern (m)               |
| 10 |   0 | cocasse                    | drollig                 |
| 11 |   0 | pomme (f)                  | Apfel (m)               |
| 12 |   0 | subtil équilibre (m)       | Balanceakt (m)          |
| 13 |   0 | brique (f)                 | Ziegelstein (m)         |
| 14 |   0 | Raton laveur (m)           | Waschbär (m)            |
| 15 |   0 | Colibri (m)                | Kolibri (m)             |
| 16 |   0 | Pétale de rose (m)         | Rosenblatt (m)          |
| 17 |   2 | impasse (f)                | sackgasse (f)           |
+----+-----+----------------------------+-------------------------+
```

### REST-API

The REST-APIs resources are aligned according as indicated in below RIF model.

![rif](documentation/polyglot-rif.png)

 > Note: ```/api``` is common prequel to all REST calls, for clear distinction to the web-ui.

### Web Frontent

The frontend consists of the following pages and functionality:

 * Landing page
   * 5 buttons to select the desired difficulty (implicitly shows current fill state)
   * Add-Card button, to feed new cards to the system
 * Training page
   * Card form with two lines
     * Statement in native language (revealed)
     * Statement in foreign language (concealed)
   * Option to reveal solution
   * Option to verify a submitted solution
   * Button to go back to Landing page
 * Add a new card page
   * Card form with two lines
     * Statement in native language (revealed)
     * Statement in foreign language (concealed)
   * Submit button
   * Button to go back to Landing page

## Deployment

 * Deploy the application with docker compose:  
```bash
docker compose up
```

 * Open a browser, [access the web-client](http://localhost:8444/polyglot)

