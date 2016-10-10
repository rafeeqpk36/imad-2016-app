console.log('Loaded!');
var element=document.getElementById("main-text");
element.innerHTML="new value";
var img=document.getElementById("image");
var marginLeft=0;
var marginTop=0;
var marginRight=0;
var marginBottom=0;
function moveRight(){marginLeft=marginLeft+10;
                     img.style.marginLeft=marginLeft+'px';
                     marginTop=marginTop+10;
                     img.style.marginTop=marginTop+'px';
                     marginRight=marginRight+10;
                     img.style.marginRight=marginRight+'px';
                     marginBottom=marginBottom+10;
                     img.style.marginBottom=marginBottom+'px';
}
img.onclick=function(){var interval=setInterval(moveRight,50000)};
    
    