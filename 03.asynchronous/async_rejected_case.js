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
try {
  await run(db, "INSERT INTO books (title) VALUES (?)", []);
} catch (err) {
  console.error(err.message);
}
try {
  await get(db, "SELECT * FRM books WHERE id = ?", [1]);
} catch (err) {
  console.error(err.message);
}
await run(db, "DROP TABLE books");
console.log("Dropped 'books' table.");
