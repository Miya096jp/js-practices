import lineReader from "./line_reader.js";

export default class WorkflowManager {
  constructor(argv, note_controller, selector) {
    this._list = argv["l"] || false;
    this._read = argv["r"] || false;
    this._delete = argv["d"] || false;
    this.note_controller = note_controller;
    this.selector = selector;
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

  async listNote() {
    const list = await this.note_controller.listTitle();
    console.log(list);
  }

  async readNote() {
    const message = "Choose a note your want to see.";
    const id = await this.selector.select(message);
    const note = await this.note_controller.readNote(id);
    console.log(note.body);
  }

  async deleteNote() {
    const message = "Choose a note your want to delete.";
    const id = await this.selector.select(message);
    await this.note_controller.deleteNote(id);
  }

  async writeNote() {
    const lines = await lineReader();
    await this.note_controller.writeNote(lines);
  }
}
