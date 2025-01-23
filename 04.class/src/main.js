import minimist from "minimist";
import sqlite3 from "sqlite3";
import NoteRepository from "./repositories/note_repository.js";
import Prompts from "./utils/prompts.js";
import CLIController from "./controllers/cli_controller.js";

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
  const prompts = new Prompts();
  const controller = new CLIController(argv, note_repository, prompts);

  if (controller.list) {
    const list = await controller.listTitle();
    console.log(list);
  } else if (controller.read) {
    const note = await controller.readNote();
    console.log(note.body);
  } else if (controller.delete) {
    await controller.deleteNote();
  } else {
    await controller.writeNote();
  }
}

await exec().catch((err) => {
  console.error("An unexpected error occured:", err.message);
  console.error(err.stack);
  process.exit(1);
});
