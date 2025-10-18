
# AGS SQL Library

AGS is a lightweight Node.js MySQL helper library that simplifies database operations such as **SELECT**, **INSERT**, **UPDATE**, **DELETE**, and **JOIN** queries.  
It also includes a fun bonus function: `getDadJokes()` — because debugging is better with a laugh. 😄


## 🚀 Features

- Simple MySQL query wrapper using async/await
- Automatic handling for:
  - Single or multiple table queries
  - Batch insert, update, and delete
- Built-in JOIN methods (INNER, LEFT, RIGHT)
- Minimal setup required — just plug in your MySQL connection
- Fun extra: fetches a random dad joke via `curl`

## 📦 Installation

```bash
npm install ags-sql-lib 
npm install mysql2
```
## Usage Sample
```js
## Importing
import AGS from "ags-sql-lib";

const sql = new AGS("root", "password", "localhost", "my_database");

Select all columns
const result = await sql.select("*", "tblusers");

Select from multiple tables
const result = await sql.select("*", ["tblusers", "products"]);

Single
const user = await sql.selectWithId("id", "*", "tblusers", 1);

Multiple
const users = await sql.selectWithId("id", "*", "tblusers", [1, 2, 3]);

## InsertInto
Single insert
await sql.insertInto("tblusers", { name: "John", age: 25 });

Multiple inserts
await sql.insertInto("tblusers", [
  { name: "Alice", age: 22 },
  { name: "Bob", age: 30 }
]);

Single update
await sql.update("id", "tblusers", { age: 26 }, 1);

Multiple updates
await sql.update("id", "tblusers", [{ age: 22 }, { age: 28 }], [1, 2]);

## DELETE

Single delete
await sql.delete("tblusers", "id", 1);

Multiple delete
await sql.delete("tblusers", "id", [2, 3]);

## Joining Table

LEFT JOIN example
const result = await sql.selectLeftAndRightJoin(
  "tblusers",
  "tblorders",
  "tblusers.name, tblorders.total",
  "tblusers.id = tblorders.user_id",
  "tblusers.id",
  "LEFT JOIN",
  1
);

INNER JOIN
const result = await sql.selectInnerJoin(
  "tblusers",
  "tblorders",
  "tblusers.name, tblorders.total",
  "tblusers.id = tblorders.user_id"
);

## BONUS

import { getDadJokes } from "ags-sql-lib";

const joke = await getDadJokes();
console.log(joke);

## REMINDER!!!

your project must be in "type":"module",

