import minimist from "minimist";
import sqlite3 from "sqlite3";
import NoteRepository from "./repositories/note_repository.js";
import Selector from "./utils/selector.js";
import NoteController from "./controllers/note_controller.js";
import WorkflowManager from "./utils/workflow_manager.js";

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

const note_repository = await initialize();
const argv = minimist(process.argv.slice(1));
const note_controller = new NoteController(note_repository);
const all_notes = await note_controller.readAllNotes();
const selector = new Selector(all_notes);
const workflow_manager = new WorkflowManager(argv, note_controller, selector);

try {
  if (workflow_manager.list) {
    await workflow_manager.listNote();
  } else if (workflow_manager.read) {
    await workflow_manager.readNote();
  } else if (workflow_manager.delete) {
    await workflow_manager.deleteNote();
  } else {
    await workflow_manager.writeNote();
  }
} catch (err) {
  console.error("An unexpected error occured:", err.message);
  console.error(err.stack);
  process.exit(1);
}
