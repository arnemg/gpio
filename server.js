console.log('Server-side code running');

const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const piblaster = require('pi-blaster.js');
const PiCamera = require('pi-camera');

cameraModule = require('./CameraModule'),
emailModule = require('./EmailModule');

const app = express();

// serve files from the public directory
app.use(express.static('public'));

// connect to the db and start the express server
let db;

// Replace the URL below with the URL for your database
const url =  'mongodb://localhost:27017/slurpen';

MongoClient.connect(url, (err, database) => {
  if(err) {
    return console.log(err);
  }
  db = database;
  // start the express web server listening on 8080
  app.listen(9000, () => {
    console.log('listening on 9000');
  });
});

// GET /  - serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/bildet', (req,res) => {
  cameraModule.takePicture(function (callback) {
    var result = callback;
 
    if (result == 'success') {
      //emailModule.sendMailPhoto()
      console.log('Det er suksessfullt tatt et bildet.');
   }
  })
});



//GET  /venstre - Servo til høyre
app.get('/venstre', (req, res) => {
  piblaster.setPwm(17, 0.08);
  console.log('Har satt pin 17 til 0.08');
});
//GET  /midten - Servo til venstre
app.get('/midten', (req, res) => {
  piblaster.setPwm(17, 0.14);
  console.log('Har satt pin 17 til 0.14');
});
//GET  /hoyre - Servo til venstre
app.get('/hoyre', (req, res) => {
  piblaster.setPwm(17, 0.20);
  console.log('Har satt pin 17 til 0.20');
});



// GET /clicks - the click data from the database
app.get('/clicks', (req, res) => {
  db.collection('clicks').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});
// POST /clicked - add a document to the DB collection recording the click event
app.post('/clicked', (req, res) => {
  const click = {clickTime: new Date()};
  console.log(click);
  console.log(db);

  db.collection('clicks').save(click, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('click added to db');
    res.sendStatus(201);
  });
});
