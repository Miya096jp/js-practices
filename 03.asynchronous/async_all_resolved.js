import { run, get } from "./db_util.js";

async function allResolved() {
  await run(
    `CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE)`,
  );
  console.log("Created");
  await run("INSERT INTO books (title) VALUES (?)", ["book1"]);
  const row = await get("SELECT * FROM books WHERE id = ?", [1]);
  console.log(`id is ${row.id}`);
  console.log(row);
  await run("DROP TABLE books");
  console.log("Dropped");
}

allResolved();
