console.log('Loaded!');
var element=document.getElementById("main-text");
element.innerHTML="new value";
var img=document.getElementById("image");
var marginLeft=0;
function moveRight(){marginLeft=marginLeft+10;
                     img.style.marginLeft=marginLeft+'px'}
img.onclick=function(){var interval=setinterval(moveRight,100)};
    
    