// dao.js
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./commands.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the commands database.');
});

db.run(`CREATE TABLE IF NOT EXISTS commands(command TEXT, output TEXT)`, (err) => {
  if(err) {
    console.error(err.message);
  }
})

function saveCommand(command, output) {
  db.run(`INSERT INTO commands(command, output) VALUES(?, ?)`, [command, output], (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Saved command: ${command}, output: ${output}`);
  });
}
function getAllCommands(callback) {
  db.all(`SELECT * FROM commands`, [], (err, rows) => {
    if (err) {
      callback(err);
    } else {
      callback(null, rows);
    }
  });
}

module.exports = { saveCommand, getAllCommands };