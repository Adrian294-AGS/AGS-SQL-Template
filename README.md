# AGS SQL Library

AGS is a lightweight Node.js MySQL helper library that simplifies database operations such as **SELECT**, **INSERT**, **UPDATE**, **DELETE**, and **JOIN** queries.  
It also includes a fun bonus function: `getDadJokes()` — because debugging is better with a laugh. 😄

---

## 🚀 Features

- Simple MySQL query wrapper using async/await  
- Automatic handling for:
  - Single or multiple table queries
  - Batch insert, update, and delete
- Built-in JOIN methods (INNER, LEFT, RIGHT)
- Minimal setup required — just plug in your MySQL connection
- Fun extra: fetches a random dad joke via `curl`

---

## 📦 Installation

```bash
npm install ags-sql-lib

## Importing
import AGS from "ags-sql-lib";

const sql = new AGS("root", "password", "localhost", "my_database");

// Select all columns
const result = await sql.select("*", "users");

// Select from multiple tables
const result = await sql.select("*", ["users", "products"]);

// Single
const user = await sql.selectWithId("id", "*", "users", 1);

// Multiple
const users = await sql.selectWithId("id", "*", "users", [1, 2, 3]);

## InsertInto
// Single insert
await sql.insertInto("users", { name: "John", age: 25 });

// Multiple inserts
await sql.insertInto("users", [
  { name: "Alice", age: 22 },
  { name: "Bob", age: 30 }
]);

// Single update
await sql.update("id", "users", { age: 26 }, 1);

// Multiple updates
await sql.update("id", "users", [{ age: 22 }, { age: 28 }], [1, 2]);

## DELETE

// Single delete
await sql.delete("users", "id", 1);

// Multiple delete
await sql.delete("users", "id", [2, 3]);

## Joining Table

// LEFT JOIN example
const result = await sql.selectLeftAndRightJoin(
  "users",
  "orders",
  "users.name, orders.total",
  "users.id = orders.user_id",
  "users.id",
  "LEFT JOIN",
  1
);

// INNER JOIN
const result = await sql.selectInnerJoin(
  "users",
  "orders",
  "users.name, orders.total",
  "users.id = orders.user_id"
);

## BONUS

import { getDadJokes } from "ags-sql-lib";

const joke = await getDadJokes();
console.log(joke);
