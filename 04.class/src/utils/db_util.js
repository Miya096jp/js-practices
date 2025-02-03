export function run(db, sql, param) {
  return new Promise((resolve, reject) => {
    db.run(sql, param, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
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

export function all(db, sql, param) {
  return new Promise((resolve, reject) => {
    db.all(sql, param, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}
