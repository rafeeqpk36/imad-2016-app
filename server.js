var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/article-one',function(req,res){res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});
app.get('/article-two',function(req,res){res.send('it is the article about  MOHD RABAH')});
app.get('/article-three',function(req,res){res.send('it is the article about MOHD RASHID')});
app.get('/article-four',function(req,res){res.send('it is the article about FATHIMA RIDHA')});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/rafi.jpeg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'rafi.jpeg'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`RAFEEQ IMAD course  app listening on port ${port}!`);
});
