var canvas = document.getElementById("canvas");
canvas.width = 1000;
canvas.height = 500;
var context = canvas.getContext("2d");
var isRedActive = false, isBlueActive = false, isBikeActive = false, isGreenActive = false;

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var carRedStartX = 630;
var carRedStartY = 100; 
var bikeStartX =310 ; 
var bikeStartY = 185; 
var carBlueStartX =500 ; 
var carBlueStartY = 250; 
var carGreenStartX = 200; 
var carGreenStartY = 170; 
var greenID,redID,blueID,bikeID, buttonID;
var isRoadFree = true;		
var flag = false;		
var counter =0;


var road = new Image();
road.onload = function(){
}
road.src = "img/roadwithbiketrail.png";

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
	carGreen = new car(carGreenStartX,carGreenStartY,102,60);
	isGreenActive = true;
}
greenCarSprites.src = "img/greencarsprites.png"; 

var bikeSprites = new Image();
bikeSprites.onload = function(){
	bike = new car(bikeStartX,bikeStartY,135,135);
	isBikeActive = true;
}
bikeSprites.src = "img/biker.png";

var blueCarSprites = new Image();
blueCarSprites.onload = function(){
	carBlue = new car(carBlueStartX,carBlueStartY,108,108);
	isBlueActive = true;
}
blueCarSprites.src = "img/bluecarsprites.png";


var buttonImg = new Image();
buttonImg.onload = function(){
	button = new car(410,30,150,50);
}
buttonImg.src = "img/button.png";


var redCarSprites = new Image();
redCarSprites.onload = function(){
	carRed = new car(carRedStartX,carRedStartY,98,98);
	isRedActive = true;
}
redCarSprites.src = "img/redcarsprites.png";


function init(){
	var canvas = document.getElementById("canvas");
	canvas.width = 1000;
	canvas.height = 500;
	var context = canvas.getContext("2d");
}

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
	context.drawImage(road,0,100,1000,400);

	if(isRedActive == true){
		context.drawImage(redCarSprites,0,0,carRed.width,carRed.height,carRed.x,carRed.y,carRed.width,carRed.height);
	}

	if(isBlueActive == true){
		context.drawImage(blueCarSprites,0,0,carBlue.width,carBlue.height,carBlue.x,carBlue.y,carBlue.width,carBlue.height);
	}

	if(isBikeActive == true){
		context.drawImage(bikeSprites,0,0,bike.width,bike.height,bike.x,bike.y,bike.width/2,bike.height/2);
	}

	if(isGreenActive == true){
		context.drawImage(greenCarSprites,0,0,carGreen.width,carGreen.height,carGreen.x,carGreen.y,carGreen.width,carGreen.height);
	}

	if(isGreenActive == true && isBikeActive){
		context.drawImage(buttonImg,button.x,button.y,button.width,button.height);
	}
	context.drawImage(stopSign,580,230,30,30);
	context.drawImage(mainSign,610,90,30,30);
	context.drawImage(mainSign,390,230,30,30);
}

var fpsC = 22; 
var nowC,deltaC;
var thenC = Date.now();
var intervalC = 1000/fpsC;

function greenCarMove(){
	if(counter < 220){
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
		if(flag){
			flag = false;
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
		counter++;
	} else {
		counter = 0; 
		cancelAnimationFrame(blueID);
		isRoadFree = true;
		if(flag){
			flag = false;
		}else{
		    rightOrder();
		}
		return;
	}
}



const cycleLoopBike = [0,1,2];
let currentLoopIndexBike = 0; 

var fpsBike = 24; 
var nowBike,deltaBike;
var thenBike = Date.now();
var intervalBike = 1000/fpsBike;

function bikeMove(){ 
	if(counter < 190){
		requestAnimationFrame(bikeMove);
		nowBike = Date.now();
		deltaBike = nowBike - thenBike;
		if(deltaBike > intervalBike){
			context.clearRect(0,0,canvas.width,canvas.height);
			draw();
			context.drawImage(bikeSprites,cycleLoopBike[currentLoopIndexBike]*bike.width,0,bike.width,bike.height,bike.x,bike.y,bike.width/2,bike.height/2);
			bike.newPos(10,0);
			currentLoopIndexBike++;
			if(currentLoopIndexBike >= cycleLoopBike.length){
				currentLoopIndexBike = 0; 
			}
			thenBike = nowBike - (deltaBike % intervalBike);
		}
		counter++;
	} else {
		counter = 0; 
		cancelAnimationFrame(bikeID);
		isRoadFree = true;
		if(flag){
			flag=false;
		}else{
		    rightOrder();
		}
		return;
	}
}


function buttonMove(){
	if(counter < 240){
		requestAnimationFrame(buttonMove);
		nowC = Date.now();
		deltaC = nowC - thenC;
		if(deltaC > intervalC){
			context.clearRect(0,0,canvas.width,canvas.height);
			draw();
			context.drawImage(greenCarSprites,carGreen.width,0,carGreen.width,carGreen.height,carGreen.x,carGreen.y,carGreen.width,carGreen.height);
			context.drawImage(bikeSprites,cycleLoopBike[currentLoopIndexBike]*bike.width,0,bike.width,bike.height,bike.x,bike.y,bike.width/2,bike.height/2);
			bike.newPos(8,0);
			carGreen.newPos(10,0);
			currentLoopIndexBike++;
			if(currentLoopIndexBike >= cycleLoopBike.length){
				currentLoopIndexBike = 0; 
			}
			thenC = nowC - (deltaC % intervalC);
		}
		counter++;
	}else{
		counter = 0; 
		cancelAnimationFrame(greenID);
		isRoadFree = true;
		if(flag){
			update("red");
		}else{
			rightOrder();
		}
		return;
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

	if(counter < 130){
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
		counter++;

	} else {
		counter =0;
		cancelAnimationFrame(redID);
		isRoadFree =true;
		if(flag){
			update("blue");
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
		case "bike" : 
			if(isRoadFree){
				isRoadFree = false;
				isBikeActive = false;
				bikeID = requestAnimationFrame(bikeMove);
			}
		case "button" : {
			if(isRoadFree){
				isRoadFree = false;
				isBikeActive = false;
				isGreenActive = false;
				buttonID = requestAnimationFrame(buttonMove);
			}
		}
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
		}else if(bike.contains(pos.x,pos.y)){
			bike.setID(countClicker);
			countClicker++;
			update("bike");
		}else if(button.contains(pos.x,pos.y)){
			button.setID(countClicker);
			countClicker++;
			update("button");
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
	 fpsB = 22;
	 thenB = Date.now();
	 intervalB = 1000/fpsB;

	 fpsC = 20;
	 thenC = Date.now();
	 intervalC = 1000/fpsC;

	currentLoopIndexBike = 0; 
	fpsBike = 24; 
	thenBike = Date.now();
	intervalBike = 1000/fpsBike;

	isGreenActive = true;
	isRedActive = true;
	isBlueActive = true;
	isBikeActive = true;

	carGreen.x = carGreenStartX;
	carGreen.y = carGreenStartY;
	carRed.x = carRedStartX;
	carRed.y = carRedStartY;
	carBlue.x = carBlueStartX;
	carBlue.y = carBlueStartY;
	bike.x = bikeStartX;
	bike.y = bikeStartY;

	carGreen.setID(-carGreen.id);
	carRed.setID(-carRed.id);
	carBlue.setID(-carBlue.id);
	bike.setID(-bike.id);
	button.setID(-button.id);
	draw();
}


function simulation(){
	resetCrossroad();
	flag=true;
	update("button");

}


function rightOrder(){
	if(isRedActive == false && isBlueActive == false && isGreenActive == false && isBikeActive == false){
		if(button.id == 1 && carRed.id == 2 && carBlue.id == 3){
			alert("Križovatka bola vyplnená správne");
		} else {
			alert("Križovatka bola vyplenena nespravne skuste ešte raz");
		}
	}
}