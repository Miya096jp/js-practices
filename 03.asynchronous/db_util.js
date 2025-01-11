export function run(db, sql, param) {
  return new Promise((resolve, reject) => {
    db.run(sql, param, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function get(db, sql, param) {
  return new Promise((resolve, reject) => {
    db.get(sql, param, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}
