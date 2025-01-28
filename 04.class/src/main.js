import minimist from "minimist";
import sqlite3 from "sqlite3";
import NoteRepository from "./repositories/note_repository.js";
import Prompts from "./utils/prompts.js";
import NoteController from "./controllers/note_controller.js";
import Option from "./utils/option.js";

const db = new sqlite3.Database("./data/notes.db");

async function initialize() {
  const note_repository = new NoteRepository(db);
  const table_name = "notes";
  const tableExists = await note_repository.checkTableExistence(table_name);
  if (!tableExists) {
    await note_repository.createTable();
    console.log("initialized");
  }
  return note_repository;
}

async function exec() {
  const note_repository = await initialize();
  const argv = minimist(process.argv.slice(1));
  const option = new Option(argv);
  const note_controller = new NoteController(note_repository);

  if (option.list) {
    const list = await note_controller.listTitle();
    console.log(list);
  } else if (option.read) {
    const all_notes = await note_controller.readAllNotes();
    const message = "Choose a note your want to see.";
    const prompts = new Prompts(message, all_notes);
    const id = await prompts.select();
    const note = await note_controller.readNote(id);
    console.log(note.body);
  } else if (option.delete) {
    const all_notes = await note_controller.readAllNotes();
    const message = "Choose a note your want to delete.";
    const prompts = new Prompts(message, all_notes);
    const id = await prompts.select();
    await note_controller.deleteNote(id);
  } else {
    const prompts = new Prompts();
    const lines = await prompts.inputText();
    await note_controller.writeNote(lines);
  }
}

await exec().catch((err) => {
  console.error("An unexpected error occured:", err.message);
  console.error(err.stack);
  process.exit(1);
});
