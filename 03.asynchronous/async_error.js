import sqlite3 from "sqlite3";
sqlite3.verbose();
import { run, get } from "./lib/db_util.js";

const db = new sqlite3.Database(":memory:");

await run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL UNIQUE)",
);
console.log("Created 'books' table.");
try {
  await run(db, "INSERT INTO books (title) VALUES (?)", [null]);
} catch (err) {
  if (
    err instanceof Error &&
    "code" in err &&
    err.code === "SQLITE_CONSTRAINT"
  ) {
    console.error(err.message);
  } else {
    throw err;
  }
}
try {
  await get(db, "SELECT * FROM users WHERE id = ?", [1]);
} catch (err) {
  if (err instanceof Error && "code" in err && err.code === "SQLITE_ERROR") {
    console.error(err.message);
  } else {
    throw err;
  }
}
await run(db, "DROP TABLE books");
console.log("Dropped 'books' table.");
