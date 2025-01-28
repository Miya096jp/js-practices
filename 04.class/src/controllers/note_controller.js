import Note from "../models/note.js";

export default class NoteController {
  constructor(note_repository) {
    this.note_repository = note_repository;
  }

  async listTitle() {
    const all_notes = await this.note_repository.readAllNotes();
    const titles = [];
    all_notes.forEach((note) => {
      titles.push(note.title);
    });
    return titles.join("\n");
  }

  async readNote(id) {
    const record = await this.note_repository.readNote(id);
    const note = new Note(record.id, record.title, record.body);
    return note;
  }

  async deleteNote(id) {
    await this.note_repository.deleteNote(id);
    console.log(`Note ${id} was successfully Deleted.`);
  }

  async writeNote(lines) {
    const title = lines[0];
    const body = lines.join("\n");
    await this.note_repository.writeNote([title, body]);
    console.log("New note was successfully Created.");
  }

  async readAllNotes() {
    const all_records = await this.note_repository.readAllNotes();
    const all_notes = [];
    all_records.forEach((record) => {
      all_notes.push(new Note(record.id, record.title, record.body));
    });
    return all_notes;
  }
}
