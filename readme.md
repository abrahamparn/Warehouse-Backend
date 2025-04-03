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

-- =======================
-- 1. Tabel Warehouse
--    (agar FK di StockBarang valid)
-- =======================
CREATE TABLE IF NOT EXISTS WAREHOUSE (
    warehouse_id     SERIAL          PRIMARY KEY,
    nama_warehouse   VARCHAR(50)     NOT NULL,
    lokasi_warehouse VARCHAR(255)
);

-- =======================
-- 2. Tabel JenisBarang
--    (master jenis/kategori barang)
-- =======================
CREATE TABLE IF NOT EXISTS JenisBarang (
    jenis_id   SERIAL        PRIMARY KEY,
    deskripsi  VARCHAR(255)  NOT NULL
);


CREATE TABLE IF NOT EXISTS volumeBarang(
    volume_barang_id SERIAL PRIMARY KEY,
    deskripsi  VARCHAR(255)  NOT NULL
)


CREATE TABLE IF NOT EXISTS beratBarang(
    berat_barang_id SERIAL PRIMARY KEY,
    deskripsi  VARCHAR(255)  NOT NULL
)

CREATE TABLE IF NOT EXISTS BARANG (
    barang_id       SERIAL         PRIMARY KEY,
    kode_barang     VARCHAR(50)    NOT NULL UNIQUE,
    nama_barang     VARCHAR(255)   NOT NULL,

    jenis_id        INT            NOT NULL,
    CONSTRAINT fk_jenis_id
        FOREIGN KEY (jenis_id) REFERENCES JenisBarang(jenis_id),

    harga_terkini   numeric(12,2),

    -- Misalnya kita ingin simpan satuan berat/volume dalam bentuk teks
    berat_barang_id INT           NOT NULL,
    CONSTRAINT fk_berat_barang_id
        FOREIGN KEY (berat_barang_id) REFERENCES beratBarang(berat_barang_id),

    berat           numeric(12,4)  DEFAULT 0,   -- Contoh: dalam kg (jika padat)

    volume_barang_id INT           NOT NULL,

    CONSTRAINT fk_volume_barang_id
        FOREIGN KEY (volume_barang_id) REFERENCES volumeBarang(volume_barang_id),
    volume          numeric(12,4)  DEFAULT 0,   -- Contoh: dalam liter / m3

    created_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);



-- =======================
-- 4. Tabel StockBarang
--    (menyimpan stok barang per warehouse)
-- =======================
CREATE TABLE IF NOT EXISTS StockBarang (
    stock_id     SERIAL       PRIMARY KEY,
    barang_id    INT          NOT NULL,
    warehouse_id INT          NOT NULL,
    quantity     INT          NOT NULL DEFAULT 0,

    updated_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_by   INT,         -- opsional, user_id

    CONSTRAINT fk_barang_id FOREIGN KEY (barang_id)
      REFERENCES barang(barang_id) ON DELETE CASCADE,
    CONSTRAINT fk_warehouse_id
        FOREIGN KEY (warehouse_id) REFERENCES WAREHOUSE(warehouse_id)
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

CREATE TRIGGER update_StockBarang_updated_at
BEFORE UPDATE ON StockBarang
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_BARANG_updated_at
BEFORE UPDATE ON BARANG
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- step 4.5: to check what functions are running in your database
SELECT proname
FROM pg_proc
JOIN pg_namespace ns ON (pg_proc.pronamespace = ns.oid)
WHERE ns.nspname NOT IN ('pg_catalog', 'information_schema')
ORDER BY proname;

-- if you want to check all trigger
SELECT
    event_object_table AS table_name,
    trigger_name,
    event_manipulation AS event,
    action_timing AS timing,
    action_statement AS function_call
FROM
    information_schema.triggers
ORDER BY
    event_object_table, trigger_name;


-- step 5: insert initial data (you can change the data up to your liking)
INSERT INTO WAREHOUSE (nama_warehouse, lokasi_warehouse)
VALUES
    ('Warehouse Jakarta', 'Cakung - Jakarta Timur'),
    ('Warehouse Surabaya', 'Rungkut - Surabaya'),
    ('Warehouse Medan', 'Tanjung Morawa - Medan');


INSERT INTO JenisBarang (deskripsi)
VALUES
    ('Makanan'),
    ('Minuman'),
    ('Kebutuhan Rumah Tangga'),
    ('Produk Kebersihan');

-- Insert values into volumeBarang
INSERT INTO volumeBarang (deskripsi) VALUES
('ml'),
('L');

-- Insert values into beratBarang
INSERT INTO beratBarang (deskripsi) VALUES
('gr'),
('kg');

INSERT INTO BARANG
(kode_barang, nama_barang, jenis_id, harga_terkini, satuan_berat, berat, satuan_volume, volume)
VALUES
    -- 1) Indomie (jenis_id=1 -> Makanan)
    ('IND-001', 'Indomie Goreng', 1, 2500, 'gr', 85, 'ml', 0),

    -- 2) Beras 5kg (jenis_id=1 -> Makanan)
    ('BRS-005', 'Beras Premium 5kg', 1, 75000, 'kg', 5, '', 0),

    -- 3) Aqua Gelas 24pcs (jenis_id=2 -> Minuman)
    ('AQG-024', 'Aqua Gelas (24 pcs)', 2, 20000, 'ml', 190, 'ml', 0),

    -- 4) Coca-Cola 1.5L (jenis_id=2 -> Minuman)
    ('CCL-15L', 'Coca-Cola 1.5 Liter', 2, 12500, 'kg', 1.5, 'L', 1.5),

    -- 5) Tisu Gulung (jenis_id=3 -> Kebutuhan Rumah Tangga)
    ('TSG-001', 'Tisu Gulung (6 roll)', 3, 18000, '', 0, '', 0),

    -- 6) Sampo Botol 200ml (jenis_id=4 -> Produk Kebersihan)
    ('SMP-200', 'Sampo Anti Ketombe 200ml', 4, 15000, 'ml', 200, 'ml', 200),

    -- 7) Sabun Mandi Batang (jenis_id=4 -> Produk Kebersihan)
    ('SBN-001', 'Sabun Mandi Batang', 4, 3000, 'gr', 80, 'ml', 0);




select stockbarang.barang, users.username from stockbarang join users on stockbarang.updated_by = users.user_id
```

---
