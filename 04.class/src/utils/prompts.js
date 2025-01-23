import { select } from "@inquirer/prompts";
import * as readline from "readline";

export default class Prompts {
  inputText() {
    const lines = [];
    return new Promise((resolve, reject) => {
      const reader = readline.createInterface({
        input: process.stdin,
      });
      reader.on("line", (line) => {
        if (line.trim() === "") {
          console.error(
            "Blank lines are not allowed. Press Ctrl+D to finish, or enter text to continue.",
          );
        } else {
          lines.push(line);
        }
      });
      reader.on("close", () => {
        if (lines.length === 0) {
          reject(new Error("Process stopped."));
        } else {
          resolve(lines);
        }
      });
    });
  }

  async select(all_notes, message) {
    const choices = this.build_choices(all_notes);
    try {
      const id = await select({
        message: message,
        choices: choices,
      });
      return id;
    } catch {
      throw new Error("Selection failed.");
    }
  }

  build_choices(all_notes) {
    const choices = [];
    all_notes.forEach((row) => {
      const obj = {};
      obj.name = row.title;
      obj.value = row.id;
      choices.push(obj);
    });
    return choices;
  }
}
