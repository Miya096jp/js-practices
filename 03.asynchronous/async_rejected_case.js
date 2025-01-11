import { run, get } from "./db_util.js";

async function rejectedCase() {
  try {
    await run(
      `CREATE TABLE books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE)`,
    );
    console.log("Created");
    await run("INSERT INTO books (title) VALUES (?)", []);
  } catch (err) {
    console.log(err);
  }
  try {
    await get("SELECT * FRM books WHERE id = ?", [1]);
  } catch (err) {
    console.log(err);
  } finally {
    await run("DROP TABLE books");
    console.log("Dropped");
  }
}

rejectedCase();
