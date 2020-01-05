var canvas = document.getElementById("canvas");
canvas.width = 1000;
canvas.height = 500;
var context = canvas.getContext("2d");
var isRedActive = false, isBlueActive = false; isGreenActive = false;
var isBlueReady = false, isRedReady = false, isGreenReady = true;
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var carRedStartX = 630;
var carRedStartY = 180; 
var carBlueStartX =425 ; 
var carBlueStartY = 90; 
var carGreenStartX = 320; 
var carGreenStartY = 215; 
var greenID,redID,blueID;
var isRoadFree = true;		
var flag = false;		
var counter =0;


var road = new Image();
road.onload = function(){
}
road.src = "img/crossroad2.png";


var mainSign = new Image();
mainSign.onload = function(){
}
mainSign.src = "img/main.png";

var triangle = new Image();
triangle.onload = function(){
}
triangle.src = "img/triangleleft.png";

var triangle2 = new Image();
triangle2.onload = function(){
}
triangle2.src = "img/triangleright.png";

var greenCarSprites = new Image();
greenCarSprites.onload = function(){
	carGreen = new car(carGreenStartX,carGreenStartY,102,102);
	isGreenActive = true;
}
greenCarSprites.src = "img/greenturnright.png"; 

var blueCarSprites = new Image();
blueCarSprites.onload = function(){
	carBlue = new car(carBlueStartX,carBlueStartY,135,135);
	isBlueActive = true;
}
blueCarSprites.src = "img/bluecarspritesSolo.png";

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
	context.drawImage(road,0,0,1000,500);

	if(isRedActive == true){
		context.drawImage(redCarSprites,0,0,carRed.width,carRed.height,carRed.x,carRed.y,carRed.width,carRed.height);
	}

	if(isBlueActive == true){
		context.drawImage(blueCarSprites,0,0,carBlue.width,carBlue.height,carBlue.x,carBlue.y,carBlue.width,carBlue.height);
	}

	if(isGreenActive == true){
		context.drawImage(greenCarSprites,0,0,carGreen.width,carGreen.height,carGreen.x,carGreen.y,carGreen.width,carGreen.height);
	}

	
	context.drawImage(mainSign,390,170,30,30);
    context.drawImage(triangle,390,300,30,30);
    context.drawImage(triangle2,630,170,30,30);
}

var cycleLoopGreen = [0,1,2,3,4,5];
var currentLoopIndexGreen = 0; 
var currentDirectionGreen = 0; 
var fpsC = 20; 
var nowC,deltaC;
var thenC = Date.now();
var intervalC = 1000/fpsC;

function greenCarMove(){
	if(counter < 100){
		requestAnimationFrame(greenCarMove);
		nowC = Date.now();
		deltaC = nowC - thenC;
		if(deltaC > intervalC){
			context.clearRect(0,0,canvas.width,canvas.height);
			draw();
			context.drawImage(greenCarSprites,cycleLoopGreen[currentLoopIndexGreen]*carGreen.width,currentDirectionGreen*carGreen.height,carGreen.width,carGreen.height,carGreen.x,carGreen.y,carGreen.width,carGreen.height);
			if(currentDirectionGreen == 0){
				carGreen.newPos(10,0);
			} else if(currentDirectionGreen == 1){
				carGreen.newPos(8,2);
			} else if(currentDirectionGreen == 2){
				carGreen.newPos(2,6);
			} else if(currentDirectionGreen == 3){
				carGreen.newPos(0,12);
			} else if(currentDirectionGreen == 4){
				carGreen.newPos(0,20);
			}
			currentLoopIndexGreen++;
			if(currentLoopIndexGreen >= cycleLoopGreen.length){
				currentLoopIndexGreen = 0; 
				currentDirectionGreen++;
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
			context.drawImage(blueCarSprites,0,0,carBlue.width,carBlue.height,carBlue.x,carBlue.y,carBlue.width,carBlue.height);
			carBlue.newPos(0,10);
			thenB = nowB - (deltaB % intervalB);
		}
		counter++;
	} else {
		counter = 0; 
		cancelAnimationFrame(blueID);
		isRoadFree = true;
		if(flag){
            update("green");
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
			flag= false;
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
	 fpsB = 24;
	 thenB = Date.now();
	 intervalB = 1000/fpsB;

	 currentLoopIndexGreen = 0; 
	 currentDirectionGreen =0;
	 fpsC = 20;
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

	carGreen.setID(-carGreen.id);
	carRed.setID(-carRed.id);
	carBlue.setID(-carBlue.id);

	draw();
}


function simulation(){
	resetCrossroad();
	flag=true;
	update("blue");

}


function rightOrder(){
	if(isRedActive == false && isBlueActive == false && isGreenActive == false){
		if(carGreen.id == 2 && carRed.id == 3 && carBlue.id == 1){
			alert("Križovatka bola vyplnená správne");
		} else {
			alert("Križovatka bola vyplenena nespravne skuste ešte raz");
		}
	}
}