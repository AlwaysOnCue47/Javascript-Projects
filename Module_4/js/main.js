// module 4 canvas assignment

var myCanvas = document.getElementById("canvas1");
var ctx = myCanvas.getContext("2d");

ctx.moveTo(0,0);
ctx.lineTo(200,100);
ctx.stroke();

var grd = ctx.createLinearGradient(0,0,200,0);
grd.addColorStop(0,"red");
grd.addColorStop(1,"white");
// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(20,20,200,200);
