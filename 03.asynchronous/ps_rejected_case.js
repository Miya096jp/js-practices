import { run, get } from "./db_util.js";

run(
  `CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL UNIQUE)`,
)
  .then(() => {
    console.log("Created");
    return run("INSERT INTO books (title) VALUES (?)", []);
  })
  .catch((err) => {
    console.log(err);
    return get("SELECT * FRM books WHERE id = ?", [1]);
  })
  .catch((err) => {
    console.log(err);
    return run("DROP TABLE IF EXISTS books");
  })
  .then(() => {
    console.log("Dropped");
  });
