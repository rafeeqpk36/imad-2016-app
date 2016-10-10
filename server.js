var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={'article-one':{title:"article-one Rafeeq",
                heading:"Article One",
                date:"9th Oct 2016",
                content:`<p>
             This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.
         </p>
         <p>
             This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.
         </p>
         <p>
             This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first art
         icle.This is the content of my first article.This is the content of my first article.This is the content of my first article.
         </p>`},
         'article-two':{title:"article-Two Rabah",
                heading:"Article Two",
                date:"10th Oct 2016",
                content:`<p>
             This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article
         </p>`,}, 'article-three':{title:"article-Three Rashid",
                heading:"Article Three",
                date:"11th Oct 2016",
                content:`<p>This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article </p>`}}; 
                function createTemplate(data){var title=data.title;
                                              var heading=data.heading;
                                              var date=data.date;
                                              var content=data.content;
                                              var htmlTemplate=`<!doctype html>
<html>
 <head>
     <title>${title}</title>
     <meta name="viewport" content="width=device-width,initial-scale=1"/>
     <link href="ui/style.css" type="text/css" rel="stylesheet"/>
 </head>
 <body>
     <div class="container">
     <div>
         <a href='/'>Home</a>
     </div>
     <hr/>
     <div>
         <h1>${heading}</h1>
     </div>
     <div>
        ${date}
     </div>
     <div>
         ${content}
         </div>
         </div>
 </body>
</html>`;
return htmlTemplate;}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/:articleName',function(req,res){var articleName=req.params.articleName;res.send(createTemplate(articles[articleName]));});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/rafi.jpeg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'rafi.jpeg'));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`RAFEEQ IMAD course  app listening on port ${port}!`);
});
