import { select } from "@inquirer/prompts";

export default class Selector {
  constructor(all_notes) {
    this.all_notes = all_notes;
  }

  async select(message) {
    const choices = this.build_choices(this.all_notes);
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
    const choices = all_notes.map((row) => {
      const obj = {};
      obj.name = row.title;
      obj.value = row.id;
      return obj;
    });
    return choices;
  }
}
