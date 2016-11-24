var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyparser=require('body-parser');
var session=require('express-session');
var config={user:'rafeeqpk36',
            database:'rafeeqpk36',
            host:'db.imad.hasura-app.io',
            port:'5432',
            password:process.env.DB_PASSWORD};
var pool=new Pool(config);    
            
var app = express();
app.use(morgan('combined'));
app.use(bodyparser.json());
app.use(session({secret:'someRandomSecretValue',
                 cookie:{maxAge:1000*60*60*24*30}
}));
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
        ${date.toDateString()}
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
  function hash(input,salt){
      var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'Sha512');
      return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
  }
  app.get('/hash/:input',function(req,res){var hashedString=hash(req.params.input,"some random string");                                   
  
  res.send(hasedString);
  });
  
  app.post('/create-user',function(req,res){
var username=req.body.username;
var password=req.body.password;
var salt=crypto.randomBytes(128).toString('hex');
var dbString=hash(password,salt);
Pool.query("INSERT *INTO 'user' (username,passowrd) VALUES($1,$2)",[username,dbString],function(err,result){if(err){res.status(500).send(err.toStringify())}else{res.send("user successfully created:"+username)}
});
});
  app.get('/test-db',function(req,res){pool.query('SELECT *FROM test',function(err,result){if(err){res.status(500).send(err.toString());}else{res.send(JSON.stringify(result.rows))}})});
  var names=[];
  app.get('/submit-name',function(req,res){var name=req.query.name;names.push(name);res.send(JSON.stringify(names));});
  app.get('/articles/:articleName',function(req,res){pool.query("SELECT * FROM article WHERE title=$1",[req.params.articleName],function(err,result){if(err){res.status(500).send(err.toStringify())}else{if(result.rows.length===0){res.status(400).send('article not found')}else{var ArticleData=result.rows[0];res.send(createTemplate(articleData));}}});});
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

Pool.query("SELECT * FROM user WHERE username=$1",[username],function(err,result){if(err){res.status(500).send(err.toStringify())}else{if(result.rows.length===0){res.status(400).send('Username or password not found')}else{var dbString=result.rows[0].password;
                                                                             var salt=dbString.split('$')[2];
                                                                             var hashedpassword=hash(password,salt);
                                                            if(hashedpassword===dbString){req.session.auth={userId:result.rows[0].id};res.send('credentials verified');}else{
                                                                res.status(400).send('username or password not found');}}
                                                                             }});
  app.get('/check-login',function(req,res){if(req.session&&req.session.auth&&req.session.auth.userId){res.send("you are logged in:"+req.session.auth.userId.toString());}else{res.send("you are not looed in");}});
  app.get('/logout',function(req,res){delete req.session.auth;res.send('logged out');});