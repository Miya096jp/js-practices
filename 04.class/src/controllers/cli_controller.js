export default class CLIController {
  constructor(argv, note_repository, prompts) {
    this._list = argv["l"] || false;
    this._read = argv["r"] || false;
    this._delete = argv["d"] || false;
    this.note_repository = note_repository;
    this.prompts = prompts;
  }

  get list() {
    return this._list;
  }

  get read() {
    return this._read;
  }

  get delete() {
    return this._delete;
  }

  async listTitle() {
    let all_notes;
    all_notes = await this.note_repository.readAllNotes();
    const titles = [];
    all_notes.forEach((note) => {
      titles.push(note.title);
    });
    return titles.join("\n");
  }

  async readNote() {
    let all_notes, message, id, note;
    all_notes = await this.note_repository.readAllNotes();
    message = "Choose a note you want to see.";
    id = await this.prompts.select(all_notes, message);
    note = await this.note_repository.readNote(id);
    return note;
  }

  async deleteNote() {
    let all_notes, message, id;
    all_notes = await this.note_repository.readAllNotes();
    message = "Choose a note you want to delete.";
    id = await this.prompts.select(all_notes, message);
    await this.note_repository.deleteNote(id);
    console.log(`Note ${id} was successfully Deleted.`);
  }

  async writeNote() {
    let lines, title, body;
    lines = await this.prompts.inputText();
    title = lines[0];
    body = lines.join("\n");
    await this.note_repository.writeNote([title, body]);
    console.log("New note was successfully Created.");
  }
}
