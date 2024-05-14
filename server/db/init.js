const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/guestbook.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE guestbook (sender TEXT, message TEXT, t TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
  );

  const stmt = db.prepare(
    "INSERT INTO guestbook (sender, message) VALUES (?, ?)"
  );

  for (let i = 0; i < 10; i++) {
    stmt.run("guestbook" + i, "Hello from guestbook" + i);
  }

  stmt.finalize();

  db.each("SELECT rowid AS id, sender, message FROM guestbook", (err, row) => {
    console.log(row.id + ": " + row.sender + " - " + row.message);
  });
});

db.close();
