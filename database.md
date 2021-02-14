# Database design

## Overview
- This document describes database entity layout for database

## Database
- PostgreSQL

### Users
- Name : **USERS**

| Name                         | Field              | Type        | Nullable | Default | Note                |
|:-----------------------------|:-------------------|:------------|:---------|:--------|:--------------------|
| User ID                     | id                 | SERIAL      | NOT NULL | N/A     |  Auto increment
| Loging user email | email              | VARCHAR(70) | NOT NULL | N/A     | user email          |

- Constraints

| Field              | Key     | Extra | Description       |
|:-------------------|:--------|:------|:------------------|
| id                 | PRIMARY | N/A   | UUID v4           |
| TODO foreign_keys | FOREIGN | N/A   | ON DELETE CASCADE |




