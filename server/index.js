var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cors = require('cors'); 
var upload = multer({dest: '/tmp/'});
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var db = require('./database.js');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/repos/:user', (req, res) => {
  db.fetch(req.params.user, (err, data) => {
    if (err) {
      res.writeHead(403);
      res.end(err)
    } else {
      res.writeHead(203, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(data));
    }
  })
});

app.get('/files/downloads/:user/:file/:ext', (req, res) => {
  let params = {
    author: req.params.user,
    name: req.params.file,
    extension: req.params.ext
  }
  db.download(params, (err, file) => {

  })
});

app.post('/files', (req, res) => {
  let newFile = req.body;
  db.save(newFile, (err, result) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(err));
    } else {
      res.writeHead(201, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(result));
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

