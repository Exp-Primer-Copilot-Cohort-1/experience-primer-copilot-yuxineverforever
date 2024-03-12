// create web server using express
// import express module
var express = require('express');
// create an express application
var app = express();
// import the file system module
var fs = require('fs');
// import the path module
var path = require('path');
// import the body-parser module
var bodyParser = require('body-parser');
// import the comments module
var comments = require('./comments');
// import the comments file
var commentsFile = path.join(__dirname, 'comments.json');
// use the body-parser module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// set the port number
app.set('port', (process.env.PORT || 3000));
// set the path to the public folder
app.use('/', express.static(path.join(__dirname, 'public')));
// get the comments
app.get('/api/comments', function(req, res) {
  fs.readFile(commentsFile, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});
// add the comments
app.post('/api/comments', function(req, res) {
  fs.readFile(commentsFile, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    var newComment = {
      id: Date.now(), author: req.body.author, text: req.body.text,
    }; comments.push(newComment); fs.writeFile(commentsFile, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    } ); } ); } );