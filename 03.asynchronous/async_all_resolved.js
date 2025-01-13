import { run, get } from "./lib/db_util.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

await run(
  db,
  `CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE)`,
);
console.log("Created 'books' table.");
const result = await run(db, "INSERT INTO books (title) VALUES (?)", ["book1"]);
console.log(`id is ${result.lastID}`);
const row = await get(db, "SELECT * FROM books WHERE id = ?", [result.lastID]);
console.log(row);
await run(db, "DROP TABLE books");
console.log("Dropped 'books' table.");
