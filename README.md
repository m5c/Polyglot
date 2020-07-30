# Polyglot

A browser based vocabulary trainer.

## About

*Polyglot* is a full stack web application.

 * Data persisntece in a mySQL database, hosted in a docker container.
 * Server side logic as a Spring-Boot REST backend.
 * User interface as responsive Javascript / Bootstrap webapp.

## Layers

Details for the various layers:

### SQL

 * TABLE card:
   * PK generated id
   * Lang1
   * Lang2
   * Box
   * Lang1content
   * Lang2content

### REST

RIF tree:

![rif](documentation/polyglot-rif.png)

 * Getting a random card of a specific box
 * Updating the box info of an existing card
 * Removing a card
 * Adding a new card
 * Updating the details of a card

### JS

 * Landing page
   * Select Box
   * Edit Card
   * Add Card
 * Test page
   * Show A-Side
   * Enter details for B-Side
   * Show result, proceed
 * Edit page
   * Search for card, by content
   * Update / Delete card (Id known)
 * Add a new card
   * Enter A-Side
   * Enter B-Side

Illustration of landing page:

![landing](documentation/landing.png)
