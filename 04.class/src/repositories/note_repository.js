import { run, all, get } from "../utils/db_util.js";

export default class NoteRepository {
  constructor(db) {
    this.db = db;
  }

  async checkTableExistence(param) {
    return await get(
      this.db,
      "SELECT name from sqlite_master WHERE type='table' AND name=?",
      param,
    );
  }

  async createTable() {
    await run(
      this.db,
      `CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  body TEXT NOT NULL)`,
    );
  }

  async writeNote(param) {
    await run(this.db, "INSERT INTO notes (title, body) VALUES (?, ?)", param);
  }

  async readNote(param) {
    return await get(this.db, "SELECT * FROM notes WHERE id = ?", param);
  }

  async readAllNotes() {
    return await all(this.db, "SELECT * FROM notes ORDER BY id DESC");
  }

  async deleteNote(param) {
    await run(this.db, "DELETE FROM notes WHERE id = ?", param);
  }
}
