// controller.js
const express = require('express');
const path = require('path'); // Add this line
const router = express.Router();
const dao = require('../model/dao');
// const service = require('../service/commandService');

router.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/index.html')); // Modify this line
});

  router.get('/health', (req, res) => {
    res.status(200).send('Healthy!!');
  });

router.get('/allcommands', (req, res) => {
  dao.getAllCommands((err, rows) => err ? res.status(500).send(err) : res.status(200).send(rows));
})

module.exports = router;