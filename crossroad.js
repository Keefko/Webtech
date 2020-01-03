var canvas = document.getElementById("canvas");
var canvas2 = document.getElementById("canvas-2");
canvas.width = 1000;
canvas.height = 500;
var context = canvas.getContext("2d");
var isRedActive = false; isBlueActive = false; isGreenActive = false;
var isBlueReady = false, isRedReady = false, isGreenReady = true;
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


var road = new Image();
road.onload = function(){
}
road.src = "img/road.png";

var stopSign = new Image();
stopSign.onload = function(){
	
}
stopSign.src = "img/stop.png";

var mainSign = new Image();
mainSign.onload = function(){
}
mainSign.src = "img/main.png";

var greenCarSprites = new Image();
greenCarSprites.onload = function(){
	carGreen = new car(310,190,102,53);
	isGreenActive = true;
}
greenCarSprites.src = "img/greencarsprites.png"; 

var blueCarSprites = new Image();
blueCarSprites.onload = function(){
	carBlue = new car(540,240,44,108);
	isBlueActive = true;
}
blueCarSprites.src = "img/bluecarsprites.png";

var redCarSprites = new Image();
redCarSprites.onload = function(){
	carRed = new car(630,110,102,98);
	isRedActive = true;
}
redCarSprites.src = "img/redcarsprites.png";


window.onload = function(){
	draw();
}

function car(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.contains = function(x,y){
		if(this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height){
			return true;
		}
	}

	this.newPos = function(moveX, moveY){
		this.x += moveX;
		this.y += moveY;
	}
}

function getMousePosition(e){
	var rect = canvas.getBoundingClientRect();

	return{ 
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};

}

function draw(){	
	context.drawImage(road,0,100,1000,400);

	if(isRedActive){
		context.drawImage(redCarSprites,0,0,carRed.width,carRed.height,carRed.x,carRed.y,carRed.width,carRed.height);
	}

	if(isBlueActive == true){
		context.drawImage(blueCarSprites,0,0,carBlue.width,carBlue.height,carBlue.x,carBlue.y,carBlue.width,carBlue.height);
	}

	if(isGreenActive == true){
		context.drawImage(greenCarSprites,0,0,carGreen.width,carGreen.height,carGreen.x,carGreen.y,carGreen.width,carGreen.height);
	}

	context.drawImage(stopSign,580,230,30,30);
	context.drawImage(mainSign,610,90,30,30);
	context.drawImage(mainSign,390,230,30,30);
}




let frameCountGreen = 0; 
let count = 0;

function greenCarMove(){
	frameCountGreen++;
	if(frameCountGreen > 15){
		window.requestAnimationFrame(greenCarMove);
		return; 
	}
	frameCountGreen = 0; 
	context.clearRect(0,0,canvas.width,canvas.height);
	draw();
	context.drawImage(greenCarSprites,count*carGreen.width,0,carGreen.width,carGreen.height,carGreen.x,carGreen.y,carGreen.width,carGreen.height);
	carGreen.newPos(3,0);

	window.requestAnimationFrame(greenCarMove);
}


//na kokot 
function blueCarMove(){ 
	var number = 0; 
	var interval = setInterval(function(){
		context.clearRect(0,0,canvas.width,canvas.height);
		draw();
		number++;
		number = number % carBlue.frame;
		context.drawImage(blueCarSprites,number*carBlue.width,0,carBlue.width,carBlue.height,carBlue.x,carBlue.y,carBlue.width,carBlue.height);
		carBlue.newPos(0,0);
	},400);
}

/*https://dev.to/martyhimmel/animating-sprite-sheets-with-javascript-ag3*/


const cycleLoopRed = [0,1,2,3,4,5,6,7,8];
let currentLoopIndexRed = 0; 
let frameCountRed = 0; 
let currentDirectionRed = 0; 

function redCarMove(){
	frameCountRed++;
	if(frameCountRed > 15){
		window.requestAnimationFrame(redCarMove);
		return;
	}
	frameCount = 0;
	context.clearRect(0,0,canvas.width,canvas.height);
	draw();
	context.drawImage(redCarSprites,cycleLoopRed[currentLoopIndexRed] * carRed.width,currentDirectionRed * carRed.height,carRed.width,carRed.height,0,0,carRed.width,carRed.height);
	if(currentDirectionRed == 0){
		carRed.newPos(-3,0);
	}else if(currentDirectionRed == 1){
		carRed.newPos(-3,0);
	}else if(currentDirectionRed == 2){
		carRed.newPos(-1,3);
	}else if(currentDirectionRed == 3){
		carRed.newPos(0,3);
	}else if(currentDirectionRed == 4){
		carRed.newPos(0,3);
	}

	currentLoopIndexRed++;
	if(currentLoopIndexRed >= cycleLoopRed.length){
		currentLoopIndexRed = 0; 
		currentDirectionRed++;
	}
	window.requestAnimationFrame(redCarMove);
}



function condition(type,rectReady){
	if(rectReady){
		update(type);
	}else{
		console.log(rect + " " + "Nie je na rade");
	}
}

function update(type){
	switch(type){
		case "blue" : 
			isBlueActive= false;
			blueCarMove();
			break;
		case "red" : 
			isRedActive = false;
			window.requestAnimationFrame(redCarMove);
			break;
		case "green" : 
			isGreenActive = false;
			window.requestAnimationFrame(greenCarMove);
			break;
	}
}



$(document).ready(function(){
	$("#canvas").on('click',function(e){
		var pos = getMousePosition(e);
		if(carBlue.contains(pos.x,pos.y)){
			update("blue");
		}else if(carRed.contains(pos.x,pos.y)){
			update("red");
		}else if(carGreen.contains(pos.x,pos.y)){
			update("green");
		}
	});
});  