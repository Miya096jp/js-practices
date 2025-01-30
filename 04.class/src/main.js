import minimist from "minimist";
import sqlite3 from "sqlite3";
import WorkflowManager from "./utils/workflow_manager.js";

const db = new sqlite3.Database("./data/notes.db");

const note_repository = await WorkflowManager.initialize(db);
const argv = minimist(process.argv.slice(1));
const workflow_manager = new WorkflowManager(argv, note_repository);

try {
  workflow_manager.listNote();
  workflow_manager.readNote();
  workflow_manager.deleteNote();
  workflow_manager.writeNote();
} catch (err) {
  console.error("An unexpected error occured:", err.message);
  console.error(err.stack);
  process.exit(1);
}
