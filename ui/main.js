// submit through login/password
var submit= document.getElementById("submit_btn");
//creat request
submit.onclick=function()
   { var request=new XMLHttpRequest();
   request.onreadystatechange=function(){
       if(request.readystate===XMLHttpRequest.DONE){
           if(request.status===200){
               alert("Logged in successfully");}
               else if(request.status===403){
                   alert("Incorrect Username/Password");}
                   else if(request.status===500){alert("Server not responding");
               }
           }
       };

//request part
var username=document.getElementById("username").value;
var password=document.getElementById("password").value;
console.log(username);
console.log(password);
request.open('POST','http://rafeeqpk36.imad.hasura-app.io/login',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username:username, password:password}));
};

