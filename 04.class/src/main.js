import minimist from "minimist";
import sqlite3 from "sqlite3";
import NoteController from "./controller/note_controller.js";

const db = new sqlite3.Database("./data/notes.db");

const note_repository = await NoteController.initialize(db);
const argv = minimist(process.argv.slice(1));
const note_controller = new NoteController(argv, note_repository);

note_controller.exec();
