const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 4000;

const db = new sqlite3.Database("./db/guestbook.db");

db.run(
  "CREATE TABLE IF NOT EXISTS guestbook (sender TEXT, message TEXT, t TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
);

const insertStatement = ({ sender, message }) => {
  const stmt = db.prepare(
    "INSERT INTO guestbook (sender, message) VALUES (?, ?)"
  );

  stmt.run(sender, message);

  stmt.finalize();
};

app.use(cors());

app.post("/new", (req, res) => {
  const entry = { sender: req.body.sender, message: req.body.message };
  insertStatement(entry);

  return res.json({ status: 200, entry });
});

app.get("/guestbook", (req, res) => {
  db.all("SELECT rowid AS id, sender, message FROM guestbook", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  console.log("AMERICA YA!");
});
