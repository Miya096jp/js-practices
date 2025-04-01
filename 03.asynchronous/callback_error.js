import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    console.log("Created 'books' table.");
    db.run("INSERT INTO books (title) VALUES (?)", [null], (err) => {
      if (err) {
        console.error(err.message);
      }
      db.get("SELECT * FROM users WHERE id = ?", [1], (err) => {
        if (err) {
          console.error(err.message);
        }
        db.run("DROP TABLE books", () => {
          console.log("Dropped 'books' table.");
        });
      });
    });
  },
);
