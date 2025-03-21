# Todo API

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![Express](https://img.shields.io/badge/express-%3E%3D4.17.1-yellow.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%3E%3D12.0-blue.svg)
![Winston](https://img.shields.io/badge/winston-%3E%3D3.0.0-red.svg)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment Variables](#environment-variables)

---

## Introduction

Welcome to the **Warehouse Management System API**! This is a RESTful API built with Node.js and Express.js that allows users to manage their warehouse items efficiently. It features user

- authentication,
- (add more)

---

## Features

- **User Authentication:**

  - Register a new account.
  - Login to obtain a JWT token.
  - Change password securely.

---

## Technologies Used

- **Backend:**

  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/)
  - [PostgreSQL](https://www.postgresql.org/)
  - [JWT](https://jwt.io/)
  - [Winston](https://github.com/winstonjs/winston)
  - [Morgan](https://github.com/expressjs/morgan)
  - [Express-Validator](https://express-validator.github.io/docs/)
  - [Moment.js](https://momentjs.com/)

- **Testing:**

  - [Supertest](https://github.com/visionmedia/supertest)
  - [Node Test Module](https://nodejs.org/api/test.html)

- **Utilities:**
  - [Dotenv](https://github.com/motdotla/dotenv)
  - [Nodemon](https://nodemon.io/)
  - [Cross-Env](https://github.com/kentcdodds/cross-env)

---

## Getting Started

### Prerequisites

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **PostgreSQL** (v12.x or higher)

### Installation

1. **Clone the Repository:**

   ```javascript
   // will be updated
   ```

2. **Install Depedencies:**
   ```bash
   npm install
   ```
3. **Set Up Environment Variables:**
 <p>
  Create a <code>.env</code> file in the root directory and configure the necessary environment
  variables as described below.
</p>

## Environment Variables

<p>Create a <code>.env</code> file in the root directory with the following variables:</p>
<pre>
<div>env</div><code>
#Server Configuration
PORT=3000
SECRET=YOUR_JWT_SECRET_KEY
<br>

#Database Configuration
TEST_POSTGRES_URI={CHANGE INTO YOUR OWN URI}
PRODUCTION_POSTGRES_URI={CHANGE INTO YOUR OWN URI}

</code>
</pre>

## Database installation

1. there are a lot of table that you need to create

```sql
-- Step 1: Create database (PostgreSQL)
CREATE DATABASE warehouse_management_system;


-- Step 2: Connect to the database (done outside SQL script)
-- \c warehouse_management_system

-- Step 3: Create the users table
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL, -- bcrypt hash recommended
    role VARCHAR(50) DEFAULT 'user' NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- step 4: create a function that automatically update the last updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- step 4.5: to check what functions are running in your database
SELECT proname
FROM pg_proc
JOIN pg_namespace ns ON (pg_proc.pronamespace = ns.oid)
WHERE ns.nspname NOT IN ('pg_catalog', 'information_schema')
ORDER BY proname;
```

---
