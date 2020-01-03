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

	
var redCar = new Image();
redCar.onload = function(){
	carRed = new car(630,110,98,56,11);
	isRedActive = true;
}	
redCar.src = "img/redcar.png";


var blueCar = new Image();
blueCar.onload = function(){
	carBlue = new car(540,240,44,108,9);
	isBlueActive = true;
}
blueCar.src = "img/bluecar.png";
	

var greenCar = new Image();
greenCar.onload = function(){
	carGreen = new car(310,190,102,53,6);
	isGreenActive = true;
}
greenCar.src = "img/greencar.png";


var stopSign = new Image();
stopSign.onload = function(){
	
}
stopSign.src = "img/stop.png";

var mainSign = new Image();
mainSign.onload = function(){
}
mainSign.src = "img/main.png";

var greenCarSprites = new Image();
greenCarSprites.onload = function(){}
greenCarSprites.src = "img/greencarsprites.png"; 

var blueCarSprites = new Image();
blueCarSprites.onload = function(){}
blueCarSprites.src = "img/bluecarsprites.png";

var redCarSprites = new Image();
redCarSprites.onload = function(){}
redCarSprites.src = "img/redcarsprites.png";

var blinker = new Image();
blinker.onload = function(){}
blinker.src = "img/blink.png";

window.onload = function(){
	draw();
}

function car(x,y,width,height,frame){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.frame = frame;

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
		context.drawImage(redCar,630,110,98,56);
	}

	if(isBlueActive == true){
		context.drawImage(blueCar,540,240,44,108);
	}

	if(isGreenActive == true){
		context.drawImage(greenCar,310,190,102,53);
	}

	context.drawImage(stopSign,580,230,30,30);
	context.drawImage(mainSign,610,90,30,30);
	context.drawImage(mainSign,390,230,30,30);
}


function greenCarMove(){
	var number = 0; 
	var interval = setInterval(function(){
		context.clearRect(0,0,canvas.width,canvas.height);
		draw();
		number++;
		number = number % carGreen.frame;
		context.drawImage(greenCarSprites,number*carGreen.width,0,carGreen.width,carGreen.height,carGreen.x,carGreen.y,carGreen.width,carGreen.height);
		carGreen.newPos(40,0);
	},200);
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

// totalne napiču 
function redCarMove(){
	var number = 0; 
	var row = 0; 
	var interval =setInterval(function(){
		context.clearRect(0,0,canvas.width,canvas.height);
		draw();
		number++;
		number = number % carRed.frame;
		if(number% carRed.frame == 4 ){
			row++
		}
		context.drawImage(redCarSprites,number*carRed.width,row*carRed.height,carRed.width,carRed.height,carRed.x,carRed.y,carRed.width,carRed.height);
	},400);
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
			redCarMove();
			isBlueReady = true;
			break;
		case "green" : 
			isGreenActive = false;
			greenCarMove();
			isRedReady = true;
			break;
	}
}



$(document).ready(function(){
	$("#canvas").on('click',function(e){
		var pos = getMousePosition(e);
		if(carBlue.contains(pos.x,pos.y)){
			condition("blue",isBlueReady);
		}else if(carRed.contains(pos.x,pos.y)){
			condition("red",isRedReady);
		}else if(carGreen.contains(pos.x,pos.y)){
			condition("green",isGreenReady);
		}
	});
});  