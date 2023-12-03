# Todo App

This document describes the functionality and use case of the TodoApp application as well as the “path”, decisions and assumptions, I took.

During the system design phase of this application I took “shortcuts” to come to the following result. Whenever shortcuts were taken they would be described in this document.

## Requirements

Build a service to manage Todos.

### Features

- [x] API to query Todos (potentially many!)
  - [x] Query Todos that are not done
  - [x] Todos can be grouped in lists
- [x] API to add a Todo
- [x] API to update Todos
  - [x] Mark Todos as done
- [x] We would like you to integrate with another service provider. It can be any Todo service (e.g. Microsoft Todo APIs), or you can also use a mock provider. Todos should be kept in sync between our service and the third-party integration
  - [ ] Todos created in the third-party integration should always be created in our service
  - [x] The status of todos should always be in sync between our service and the integration

### Tech

- If possible use a relational DB, PostgreSQL would be perfect!
- Provide data model for Todos

**Bonus**

- Let's create GraphQL APIs
- typescript would be great, but most common languages are okay

### Note

- We expect you to treat the challenge as a real world production app development that is meant to:
  - Scale to 10+ engineers contributing simultaneous.
- Wherever you might have to take shortcuts point it out and explain what you would do differently!
- We would like you to take assumptions and decisions of how the product and the third-party integration should work, if needed you can highlight and explain decisions in a README inside the project.

# Shortcuts and design decisions

- Clean architecture
- Presentation layer can easily added like graphql for example

## Configuration

A robust application has higher order centralized features like logging, error handling, or request logging. In this demo I’ve skipped implementation as such.

## Background tasks

Background tasks are a essential part of keeping the systems in sync. The implemented queue is now running on the same application instance. Ideally this would be off loaded. The task queue can exists as a external service ( eg: Cloud Tasks ) and the “jobs” can be executed on separate instances “workers”.

Scheduler can be centralized and not part of the runtime.

## Pagination

The pagination implemented in this todo-app is the plain offset, limit implementation. For a more robust and faster at scale approach I would go for the cursor based pagination instead.

## Data model

In the current implementation the “synchronize” feature was used to keep the data model in sync with the database. In a more complete application setup I would go for a database migration setup.

The following data model represents the database structure and relationship between its entities. The current data model only assumes there is 1 integration. This shortcut could be a lot more scalable and decoupled by introducing the following tables and relations instead.

- **Integration**, a table that holds all the possible integrations like “Todoist”, “Microsoft”, “Google”
- **UserIntegrationConnection,** a table that holds all the “granted” integrations by the users
- **EntityIntegrationAssociation**, a table that holds the references from each integration record to each entity in our data model

A robust system should track changes and register who performed those changes. Therefor it would be a great addition to have change-log tables for this purpose.

### Sync

- Race condition mitigation
- Add versioning to the todo mutations

### Tests

Another shortcut that was taken was not writing tests
