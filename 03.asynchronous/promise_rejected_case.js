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
    console.log("Created");
    return run(db, "INSERT INTO books (title) VALUES (?)", []);
  })
  .catch((err) => {
    console.log(err.message);
    return get(db, "SELECT * FRM books WHERE id = ?", [1]);
  })
  .catch((err) => {
    console.log(err.message);
    return run(db, "DROP TABLE books");
  })
  .then(() => {
    console.log("Dropped");
  });
