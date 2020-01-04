var canvas = document.getElementById("canvas");
canvas.width = 1000;
canvas.height = 500;
var context = canvas.getContext("2d");
var isRedActive = false; isBlueActive = false; isGreenActive = false;
var isBlueReady = false, isRedReady = false, isGreenReady = true;
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var carRedStartX = 750;
var carRedStartY = 290; 
var carBlueStartX =530 ; 
var carBlueStartY = 280; 
var carGreenStartX = 350; 
var carGreenStartY = 235; 
var greenID,redID,blueID;
var isRoadFree = true;	
var flag = false;		
var counter =0;
var lightsOnGreenCar = true;
var lightsOnBlueCar = false;
var lightsOnRedCar = false;

var road = new Image();
road.onload = function(){
}
road.src = "img/crossroad2.png";

var redLight = new Image();
redLight.onload = function(){

}
redLight.src = "img/redlight.png";

var redLight2 = new Image();
redLight2.onload = function(){

}
redLight2.src = "img/redlight2.png";

var greenLight = new Image();
greenLight.onload = function(){
}
greenLight.src = "img/greenlight.png";

var greenLight2 = new Image();
greenLight2.onload = function(){
}
greenLight2.src = "img/greenlight2.png";


var redLightW = new Image();
redLightW.onload = function(){

}
redLightW.src = "img/redlightW.png";

var greenLightW = new Image();
greenLightW.onload = function(){
}
greenLightW.src = "img/greenlightW.png";


var greenCarSprites = new Image();
greenCarSprites.onload = function(){
	carGreen = new car(carGreenStartX,carGreenStartY,102,53);
	isGreenActive = true;
}
greenCarSprites.src = "img/greencarsprites.png"; 

var blueCarSprites = new Image();
blueCarSprites.onload = function(){
	carBlue = new car(carBlueStartX,carBlueStartY,108,108);
	isBlueActive = true;
}
blueCarSprites.src = "img/bluecarsprites.png";

var redCarSprites = new Image();
redCarSprites.onload = function(){
	carRed = new car(carRedStartX,carRedStartY,127,127);
	isRedActive = true;
}
redCarSprites.src = "img/walker.png";


window.onload = function(){
	draw();
}

function car(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.id = 0;
	this.contains = function(x,y){
		if(this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height){
			return true;
		}
	}

	this.newPos = function(moveX, moveY){
		this.x += moveX;
		this.y += moveY;
	}

	this.setID = function(id){
		this.id += id; 
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
	context.drawImage(road,0,0,1000,500);

	if(isRedActive == true){
		context.drawImage(redCarSprites,0,0,carRed.width,carRed.height,carRed.x,carRed.y,carRed.width/2,carRed.height/2);
	}

	if(isBlueActive == true){
		context.drawImage(blueCarSprites,0,0,carBlue.width,carBlue.height,carBlue.x,carBlue.y,carBlue.width,carBlue.height);
	}

	if(isGreenActive == true){
		context.drawImage(greenCarSprites,0,0,carGreen.width,carGreen.height,carGreen.x,carGreen.y,carGreen.width,carGreen.height);
	}

	if(lightsOnBlueCar){
		context.drawImage(greenLight2,630,300,30,50);
	}else {
		context.drawImage(redLight,630,300,30,50);
	}

	if(lightsOnRedCar && isGreenActive == false){
		context.drawImage(greenLightW,690,155,30,50);
	}else{
		context.drawImage(redLightW,690,155,30,50);
	}


	if(lightsOnGreenCar){
		context.drawImage(greenLight,375,300,50,30);
	}else{
		context.drawImage(redLight2,375,300,50,30);
	}
}


var fpsC = 22; 
var nowC,deltaC;
var thenC = Date.now();
var intervalC = 1000/fpsC;

function greenCarMove(){
	if(counter < 190){
		requestAnimationFrame(greenCarMove);
		nowC = Date.now();
		deltaC = nowC - thenC;
		if(deltaC > intervalC){
			context.clearRect(0,0,canvas.width,canvas.height);
			draw();
			context.drawImage(greenCarSprites,carGreen.width,0,carGreen.width,carGreen.height,carGreen.x,carGreen.y,carGreen.width,carGreen.height);
			carGreen.newPos(10,0);
			thenC = nowC - (deltaC % intervalC);
		}
		counter++;
	}else{
		counter = 0; 
		cancelAnimationFrame(greenID);
		isRoadFree = true;
		lightsOnGreenCar = false;
		lightsOnBlueCar = true;
		context.clearRect(0,0,canvas.width,canvas.height);
		draw();
		if(flag){
			update("blue");
		}else{
			rightOrder();
		}
		return;
	}
}

const cycleLoopBlue = [0,1,2,3,4,5];
let currentLoopIndexBlue = 0; 
let currentDirectionBlue = 0;


var fpsB = 24; 
var nowB,deltaB;
var thenB = Date.now();
var intervalB = 1000/fpsB;

function blueCarMove(){ 
	if(counter < 130){
		requestAnimationFrame(blueCarMove);
		nowB = Date.now();
		deltaB = nowB - thenB;
		if(deltaB > intervalB){
			context.clearRect(0,0,canvas.width,canvas.height);
			draw();
			context.drawImage(blueCarSprites,cycleLoopBlue[currentLoopIndexBlue] * carBlue.width,currentDirectionBlue*carBlue.height,carBlue.width,carBlue.height,carBlue.x,carBlue.y,carBlue.width,carBlue.height);
			
			if(currentDirectionBlue == 0){
				carBlue.newPos(0,-3);
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
		counter++;
	} else {
		counter = 0; 
		cancelAnimationFrame(blueID);
		isRoadFree = true;
		lightsOnBlueCar = false;
		lightsOnRedCar = true;
		context.clearRect(0,0,canvas.width,canvas.height);
		draw();
		if(flag){
			update("red");
		}else{
		    rightOrder();
		}
		return;
	}
}

/*https://dev.to/martyhimmel/animating-sprite-sheets-with-javascript-ag3*/


const cycleLoopRed = [0,1,2,3,4];
let currentLoopIndexRed = 0; 
let currentDirectionRed = 0; 
var now,delta;
var fps = 15; 
var then = Date.now();
var interval = 1000/fps;

function redCarMove(){

	if(counter < 60){
		requestAnimationFrame(redCarMove);
		now = Date.now();
		delta = now - then;
		if(delta > interval){
			context.clearRect(0,0,canvas.width,canvas.height);
			draw();
			context.drawImage(redCarSprites,cycleLoopRed[currentLoopIndexRed] * carRed.width,currentDirectionRed * carRed.height,carRed.width,carRed.height,carRed.x,carRed.y,carRed.width/2,carRed.height/2);
			carRed.newPos(0,-18);
			currentLoopIndexRed++;
			if(currentLoopIndexRed >= cycleLoopRed.length){
				currentLoopIndexRed = 0; 
				currentDirectionRed++;
			}
			then = now - (delta%interval);
		}
		counter++;

	} else {
		counter =0;
		cancelAnimationFrame(redID);
		isRoadFree =true;
		if(flag){
			flag = false;
		}else {
		   rightOrder();
		}
	}
	return;

}	



function update(type){
	switch(type){
		case "blue" : 
			if(isRoadFree){
				isRoadFree = false;
				isBlueActive= false;
				blueID =requestAnimationFrame(blueCarMove);
			}
			break;

		case "red" : 
			if(isRoadFree){
				isRoadFree = false;
				isRedActive = false;
				redID = requestAnimationFrame(redCarMove);
			}
			break;
		case "green" :
			if(isRoadFree){
				isRoadFree = false; 
				isGreenActive = false;
				greenID = requestAnimationFrame(greenCarMove);
			}
			break;
	}
}


var countClicker = 1; 
$(document).ready(function(){
	$("#canvas").on('click',function(e){
		var pos = getMousePosition(e);
		if(carBlue.contains(pos.x,pos.y)){
			carBlue.setID(countClicker);
			countClicker++;
			update("blue");
		}else if(carRed.contains(pos.x,pos.y)){
			carRed.setID(countClicker);
			countClicker++;
			update("red");
		}else if(carGreen.contains(pos.x,pos.y)){
			carGreen.setID(countClicker);
			countClicker++;
			update("green");
		}
	});
});  


function resetCrossroad(){
	 countClicker = 1; 
	 counter=0;
	 isRoadFree=true;
	 currentLoopIndexRed = 0;
	 currentDirectionRed = 0;
	 fps = 22;
	 interval = 1000/fps;


	 currentLoopIndexBlue =0;
	 currentDirectionBlue =0; 
	 fpsB = 22;
	 thenB = Date.now();
	 intervalB = 1000/fpsB;

	 fpsC = 22;
	 thenC = Date.now();
	 intervalC = 1000/fpsC;


	isGreenActive = true;
	isRedActive = true;
	isBlueActive = true;

	carGreen.x = carGreenStartX;
	carGreen.y = carGreenStartY;
	carRed.x = carRedStartX;
	carRed.y = carRedStartY;
	carBlue.x = carBlueStartX;
	carBlue.y = carBlueStartY;

	lightsOnGreenCar = true;
	lightsOnBlueCar = false;
	lightsOnRedCar = false;

	draw();
}


function simulation(){
	resetCrossroad();
	flag=true;
	update("green");

}


function rightOrder(){
	if(isRedActive == false && isBlueActive == false && isGreenActive == false){
		if(carGreen.id == 1 && carRed.id == 3 && carBlue.id == 2){
			alert("Križovatka bola vyplnená správne");
		} else {
			alert("Križovatka bola vyplenena nespravne skuste ešte raz");
		}
	}
}