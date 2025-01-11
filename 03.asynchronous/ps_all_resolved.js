import { run, get } from "./db_util.js";

run(
  `CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL UNIQUE)`,
)
  .then(() => {
    console.log("Created");
    return run("INSERT INTO books (title) VALUES (?)", ["book1"]);
  })
  .then(() => {
    return get("SELECT * FROM books WHERE id = ?", [1]);
  })
  .then((row) => {
    console.log(`id is ${row.id}`);
    return get("SELECT * FROM books WHERE id = ?", [1]);
  })
  .then((row) => {
    console.log(row);
    return run("DROP TABLE books");
  })
  .then(() => {
    console.log("Dropped");
  });
