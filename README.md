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

 * Getting a random card of a specific box
 * Updating the box info of an existing card
 * Removing a card
 * Adding a new card
 * Updating the details of a card

### JS

 * Learn for Box
 * Select Box
 * Show random card
   * Enter details
   * See result
   * Proceed
 * Update a card, ID known
 * Remove a card, ID known
 * Add a new card, Id will be generated.
