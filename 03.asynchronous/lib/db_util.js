import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

function run(sql, param) {
  return new Promise((resolve, reject) => {
    db.run(sql, param, (err) => {
      if (err) {
        reject(err.message);
      } else {
        resolve();
      }
    });
  });
}

function get(sql, param) {
  return new Promise((resolve, reject) => {
    db.get(sql, param, (err, row) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(row);
      }
    });
  });
}

export { run, get };
