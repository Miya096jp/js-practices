import lineReader from "./line_reader.js";
import Note from "../models/note.js";
import NoteRepository from "../repositories/note_repository.js";
import Selector from "../utils/selector.js";

export default class WorkflowManager {
  constructor(argv, note_repository) {
    this._list = argv["l"] || false;
    this._read = argv["r"] || false;
    this._delete = argv["d"] || false;
    this.note_repository = note_repository;
  }

  static async initialize(db) {
    const note_repository = new NoteRepository(db);
    const table_name = "notes";
    const tableExists = await note_repository.checkTableExistence(table_name);
    if (!tableExists) {
      await note_repository.createTable();
      console.log("initialized");
    }
    return note_repository;
  }

  async listNote() {
    if (this._list) {
      const all_notes = await this.note_repository.readAllNotes();
      const titles = all_notes.map((note) => {
        return note.title;
      });
      console.log(titles.join("\n"));
    }
  }

  async readNote() {
    if (this._read) {
      const all_notes = await this.readAllNotes();
      const selector = new Selector(all_notes);
      const message = "Choose a note your want to see.";
      const id = await selector.select(message);
      const record = await this.note_repository.readNote(id);
      const note = new Note(record.id, record.title, record.body);
      console.log(note.body);
    }
  }

  async deleteNote() {
    if (this._delete) {
      const all_notes = await this.readAllNotes();
      const selector = new Selector(all_notes);
      const message = "Choose a note your want to delete.";
      const id = await selector.select(message);
      await this.note_repository.deleteNote(id);
      console.log(`Note ${id} was successfully Deleted.`);
    }
  }

  async writeNote() {
    if (!this._list && !this._read && !this._delete) {
      const lines = await lineReader();
      const title = lines[0];
      const body = lines.join("\n");
      await this.note_repository.writeNote([title, body]);
      console.log("New note was successfully Created.");
    }
  }

  async readAllNotes() {
    const all_records = await this.note_repository.readAllNotes();
    const all_notes = all_records.map((record) => {
      return new Note(record.id, record.title, record.body);
    });
    return all_notes;
  }
}
