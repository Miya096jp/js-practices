import { run, get } from "./db_util.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

run(
  db,
  `CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL UNIQUE)`,
)
  .then(() => {
    console.log("Created 'books' table.");
    return run(db, "INSERT INTO books (title) VALUES (?)", ["book1"]);
  })
  .then(() => {
    return get(db, "SELECT * FROM books WHERE id = ?", [1]);
  })
  .then((row) => {
    console.log(`id is ${row.id}`);
    return get(db, "SELECT * FROM books WHERE id = ?", [1]);
  })
  .then((row) => {
    console.log(row);
    return run(db, "DROP TABLE books");
  })
  .then(() => {
    console.log("Dropped 'books' table.");
  });
