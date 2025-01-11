import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

db.run(
  `CREATE TABLE books (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL UNIQUE
	)`,
  () => {
    console.log("Created 'books' table.");
    db.run(`INSERT INTO books (title) VALUES (?)`, ["book1"], () => {
      console.log("Inserted book1 into books.");
      db.get(`SELECT * FROM books WHERE id = ?`, [1], (_, row) => {
        console.log(row);
        db.run(`DROP TABLE IF EXISTS books`, () => {
          console.log("Dropped 'books' table if it existed.");
        });
      });
    });
  },
);
