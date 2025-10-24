
# AGS SQL Library

AGS is a lightweight Node.js MySQL helper library that simplifies database operations such as **SELECT**, **INSERT**, **UPDATE**, **DELETE**, and **JOIN** queries.  
It also includes a fun bonus function: `getDadJokes()` — because debugging is better with a laugh. 😄
`AGS-SQL-Template` is a ready-to-use SQL helper class designed for developers who frequently interact with MySQL databases in Node.js.  
It provides easy methods for `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `JOIN`, and aggregation queries (`SUM`, `MIN`, `MAX`, `AVG`) without needing to manually write long SQL statements every time.


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

### Importing
```js
import AGS from "ags-sql-lib";

const sql = new AGS.connect("root", "password", "localhost", "my_database");
```
### select
Select all columns
```js
const result = await sql.select("*", "tblusers");

Select from multiple tables
const result = await sql.select("*", ["tblusers", "products"]);

Single
const user = await sql.selectWithId("id", "*", "tblusers", 1);

Multiple
const users = await sql.selectWithId("id", "*", "tblusers", [1, 2, 3]);
```
### InsertInto
Single insert
```js
await sql.insertInto("tblusers", { name: "John", age: 25 });
```
Multiple inserts
```js
await sql.insertInto("tblusers", [
  { name: "Alice", age: 22 },
  { name: "Bob", age: 30 }
]);
```
### Update
Single update
```js
await sql.update("id", "tblusers", { age: 26 }, 1);
```
Multiple updates
```js
await sql.update("id", "tblusers", [{ age: 22 }, { age: 28 }], [1, 2]);
```
### DELETE
Single delete
```js
await sql.delete("tblusers", "id", 1);

Multiple delete
await sql.delete("tblusers", "id", [2, 3]);
```
### Joining Table

LEFT JOIN example
```js
const result = await sql.selectLeftAndRightJoin(
  "tblusers",
  "tblorders",
  "tblusers.name, tblorders.total",
  "tblusers.id = tblorders.user_id",
  "tblusers.id",
  "LEFT JOIN",
  1
);
```
INNER JOIN
```js
const result = await sql.selectInnerJoin(
  "tblusers",
  "tblorders",
  "tblusers.name, tblorders.total",
  "tblusers.id = tblorders.user_id"
);
```
### Aggregation queries

```js
Calculate the total of all 'grade' values in one table
const totalGrades = await sql.sum("grade", "tbl_grades");

Get the lowest grade
const lowestGrade = await sql.min("grade", "tbl_grades");

Get the highest grade
const highestGrade = await sql.max("grade", "tbl_grades");

Get the average grade
const averageGrade = await sql.avg("grade", "tbl_grades");

multiple tables
const totalResults = await db.sum("amount", ["tbl_sales", "tbl_purchases"]);
const minResults = await db.min("score", ["tbl_quiz1", "tbl_quiz2"]);
const maxResults = await db.max("salary", ["tbl_teachers", "tbl_admin"]);
const avgResults = await db.avg("grade", ["tbl_midterm", "tbl_final"]);
```
### BONUS
```js
import { getDadJokes } from "ags-sql-lib";

const joke = await getDadJokes();
console.log(joke);

