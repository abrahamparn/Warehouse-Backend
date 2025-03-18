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

---
