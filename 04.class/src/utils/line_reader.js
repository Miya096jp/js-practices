import * as readline from "readline";

export default function lineReader() {
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
