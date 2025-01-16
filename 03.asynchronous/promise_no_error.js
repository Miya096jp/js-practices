import { run, get } from "./lib/db_util.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    console.log("Created 'books' table.");
    return run(db, "INSERT INTO books (title) VALUES (?)", ["book1"]);
  })
  .then((result) => {
    console.log(`id is ${result.lastID}`);
    return get(db, "SELECT * FROM books WHERE id = ?", [result.lastID]);
  })
  .then((row) => {
    console.log(row);
    return run(db, "DROP TABLE books");
  })
  .then(() => {
    console.log("Dropped 'books' table.");
  });
