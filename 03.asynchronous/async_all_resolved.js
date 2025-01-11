import { run, get } from "./db_util.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

await run(
  db,
  `CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE)`,
);
console.log("Created 'books' table.");
await run(db, "INSERT INTO books (title) VALUES (?)", ["book1"]);
const row = await get(db, "SELECT * FROM books WHERE id = ?", [1]);
console.log(`id is ${row.id}`);
console.log(row);
await run(db, "DROP TABLE books");
console.log("Dropped 'books' table.");

// async function allResolved() {
//   await run(
//     db,
//     `CREATE TABLE books (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT NOT NULL UNIQUE)`,
//   );
//   console.log("Created 'books' table.");
//   await run(db, "INSERT INTO books (title) VALUES (?)", ["book1"]);
//   const row = await get(db, "SELECT * FROM books WHERE id = ?", [1]);
//   console.log(`id is ${row.id}`);
//   console.log(row);
//   await run(db, "DROP TABLE books");
//   console.log("Dropped 'books' table.");
// }

// allResolved();
