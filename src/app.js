const express = require('express');
const router = require('./controller/commandController');
const http = require('http');
const app = express();
const dao = require('./model/dao');
const { spawn } = require('child_process');
const socketIo = require('socket.io');
const server = http.createServer(app);
const bodyParser = require('body-parser'); // Add this line
const io = socketIo(server);
app.use(bodyParser.json()); // Add this line

let shell = spawn('cmd');
shell.stdout.on('data', (data) => {
  io.emit('output', data.toString());
  dao.saveCommand(data.toString());
});

shell.stderr.on('data', (data) => {
  io.emit('output', data.toString());
  dao.saveCommand(data.toString());
});

function handleInput(input) {
  shell.stdin.write(input + '\n');
}

// Receive input from client
io.on('connection', (socket) => {
  socket.on('input', (data) => {
    shell.stdin.write(data + '\n');
  });
});

app.post('/input', (req, res) => {
    handleInput(req.body.input);
    res.sendStatus(200);
  });

  app.post('/ctrl-c', (req, res) => {
    shell.kill('SIGINT');
    // handleInput(req.body.input);
    res.sendStatus(200);
});

app.post('/ctrl-d', (req, res) => {
    shell.kill('SIGTERM');
    // handleInput(req.body.input);
    res.sendStatus(200);
});


process.on('SIGINT', () => {
    shell.kill('SIGINT');
});

process.on('SIGTERM', () => {
    shell.kill('SIGTERM');
});

app.use(router);
// app.use(express.static('public'));
app.use(express.static('src/public'));

const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
    console.log('listening on *:' + PORT);
  });