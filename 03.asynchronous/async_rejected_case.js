import { run, get } from "./db_util.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

async function rejectedCase() {
  try {
    await run(
      db,
      `CREATE TABLE books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE)`,
    );
    console.log("Created");
    await run(db, "INSERT INTO books (title) VALUES (?)", []);
  } catch (err) {
    console.log(err.message);
  }
  try {
    await get(db, "SELECT * FRM books WHERE id = ?", [1]);
  } catch (err) {
    console.log(err.message);
  } finally {
    await run(db, "DROP TABLE books");
    console.log("Dropped");
  }
}

rejectedCase();
