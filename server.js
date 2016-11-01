var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var config={user:'rafeeqpk36',
            database:'rafeeqpk36',
            host:'db.imad.hasura-app.io',
            port:'5432',
            password:process.env.DB_PASSWORD};
var pool=new Pool(config);    
            
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
var counter=0;
app.get('/counter', function (req, res) {counter=counter+1;
  res.send(counter.toString());
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
  });
  app.get('/test-db',function(req,res){pool.query('SELECT *FROM test',function(err,result){if(err){res.status(500).send(err.toString());}else{res.send(JSON.stringify(result.rows))}})});
  var names=[];
  app.get('/submit-name',function(req,res){var name=req.query.name;names.push(name);res.send(JSON.stringify(names));});
  app.get('/article/:articleName',function(req,res){pool.query("SELECT * FROM article WHERE title="+req.params.articleName;function(err,result){if(err){res.status(500).send(err.toStringify())}else{if(result.rows.length===0){res.status(400).send('Article not found')}else{var articledata=result.rows[0];res.send(createTemplate(articledata))}}})});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/rafi.jpeg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'rafi.jpeg'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`RAFEEQ IMAD course  app listening on port ${port}!`);
});
