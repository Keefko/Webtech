var canvas = document.getElementById("canvas");
canvas.width = 1000;
canvas.height = 500;
var context = canvas.getContext("2d");
var isRedActive = false; isBlueActive = false; isGreenActive = false;
var isBlueReady = false, isRedReady = false, isGreenReady = true;
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

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
	carGreen = new car(310,187,102,53);
	isGreenActive = true;
}
greenCarSprites.src = "img/greencarsprites.png"; 

var blueCarSprites = new Image();
blueCarSprites.onload = function(){
	carBlue = new car(500,250,108,108);
	isBlueActive = true;
}
blueCarSprites.src = "img/bluecarsprites.png";

var redCarSprites = new Image();
redCarSprites.onload = function(){
	carRed = new car(630,100,98,98);
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

	if(isRedActive == true){
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

var fpsC = 22; 
var nowC,deltaC;
var thenC = Date.now();
var intervalC = 1000/fpsC;

function greenCarMove(){

	requestAnimationFrame(greenCarMove);
	nowC = Date.now();
	deltaC = nowC - thenC;
	if(deltaC > intervalC){
		context.clearRect(0,0,canvas.width,canvas.height);
		draw();
		context.drawImage(greenCarSprites,carGreen.width,0,carGreen.width,carGreen.height,carGreen.x,carGreen.y,carGreen.width,carGreen.height);
		carGreen.newPos(3,0);

		thenC = nowC - (deltaC % intervalC);
	}
}

const cycleLoopBlue = [0,1,2,3,4,5];
let currentLoopIndexBlue = 0; 
let currentDirectionBlue = 0;


var fpsB = 22; 
var nowB,deltaB;
var thenB = Date.now();
var intervalB = 1000/fpsB;

function blueCarMove(){ 
	requestAnimationFrame(blueCarMove);
	nowB = Date.now();
	deltaB = nowB - thenB;
	if(deltaB > intervalB){
		context.clearRect(0,0,canvas.width,canvas.height);
		draw();
		context.drawImage(blueCarSprites,cycleLoopBlue[currentLoopIndexBlue] * carBlue.width,currentDirectionBlue*carBlue.height,carBlue.width,carBlue.height,carBlue.x,carBlue.y,carBlue.width,carBlue.height);
		
		if(currentDirectionBlue == 0){
			carBlue.newPos(0,-5);
		} else if(currentDirectionBlue == 1){
			carBlue.newPos(1,-5);
		} else if(currentDirectionBlue == 2){
			carBlue.newPos(6,-3);
		} else if(currentDirectionBlue == 3){
			carBlue.newPos(6,-1);
		} else if(currentDirectionBlue == 4 || currentDirectionBlue == 5){
			carBlue.newPos(20,0);
		}

		currentLoopIndexBlue++;
		if(currentLoopIndexBlue >= cycleLoopBlue.length){
			currentLoopIndexBlue = 0;
			currentDirectionBlue++; 

		}
		thenB = nowB - (deltaB % intervalB);
	}
}

/*https://dev.to/martyhimmel/animating-sprite-sheets-with-javascript-ag3*/


const cycleLoopRed = [0,1,2,3,4,5,6,7,8];
let currentLoopIndexRed = 0; 
let currentDirectionRed = 0; 
var now,delta;
var fps = 22; 
var then = Date.now();
var interval = 1000/fps;

function redCarMove(){

	requestAnimationFrame(redCarMove);
	now = Date.now();
	delta = now - then;
	if(delta > interval){
		context.clearRect(0,0,canvas.width,canvas.height);
		draw();
		context.drawImage(redCarSprites,cycleLoopRed[currentLoopIndexRed] * carRed.width,currentDirectionRed * carRed.height,carRed.width,carRed.height,carRed.x,carRed.y,carRed.width,carRed.height);
		if(currentDirectionRed == 0){
			carRed.newPos(-10,0);
		} else if(currentDirectionRed == 1){
			carRed.newPos(-10,0);
		} else if(currentDirectionRed == 2){
			carRed.newPos(-4,5);
		} else if(currentDirectionRed == 3){
			carRed.newPos(0,15);
		} else if(currentDirectionRed == 4){
			carRed.newPos(0,15);
		}
		currentLoopIndexRed++;
		if(currentLoopIndexRed >= cycleLoopRed.length){
			currentLoopIndexRed = 0; 
			currentDirectionRed++;
		}
		then = now - (delta%interval);
	}
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
			requestAnimationFrame(blueCarMove);
			break;
		case "red" : 
			isRedActive = false;
			requestAnimationFrame(redCarMove);
			break;
		case "green" : 
			isGreenActive = false;
			requestAnimationFrame(greenCarMove);
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





function simulation(){

	update("blue");
	update("red");
}