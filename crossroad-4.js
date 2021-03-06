var canvas = document.getElementById("canvas");
canvas.width = 1000;
canvas.height = 500;
var context = canvas.getContext("2d");
var isRedActive = false; isBlueActive = false;  isGreenActive = false;
var isBlueReady = false, isRedReady = false, isGreenReady = true;
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var carRedStartX = 630;
var carRedStartY = 180; 
var carGreenStartX = 330; 
var carGreenStartY = 237; 
var carBlueStartX =467 ; 
var carBlueStartY = -50; 
var greenID,redID,blueID;;
var isRoadFree = true;		
var flag = false;		
var counter =0;


var road = new Image();
road.onload = function(){
}
road.src = "img/crossroadWtram3N.png";


var mainSign1 = new Image();
mainSign1.onload = function(){
}
mainSign1.src = "img/signsKri1newHlavna.png";

var mainSign2 = new Image();
mainSign2.onload = function(){
}
mainSign2.src = "img/signsKri1newHlavna2.png";

var mainSign3 = new Image();
mainSign3.onload = function(){
}
mainSign3.src = "img/signsKri1newHlavna3.png";

var greenCarSprites = new Image();
greenCarSprites.onload = function(){
	carGreen = new car(carGreenStartX,carGreenStartY,102,53);
	isGreenActive = true;
}
greenCarSprites.src = "img/greencarsprites.png"; 

var redCarSprites = new Image();
redCarSprites.onload = function(){
	carRed = new car(carRedStartX,carRedStartY,98,98);
	isRedActive = true;
}
redCarSprites.src = "img/redcarsprites.png";

var blueCarSprites = new Image();
blueCarSprites.onload = function(){
	carBlue = new car(carBlueStartX,carBlueStartY,108,245);
	isBlueActive = true;
}
blueCarSprites.src = "img/tramsprites.png";


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

	if(isGreenActive == true){
		context.drawImage(greenCarSprites,0,0,carGreen.width,carGreen.height,carGreen.x,carGreen.y,carGreen.width,carGreen.height);
    }
    
    if(isBlueActive == true){
		context.drawImage(blueCarSprites,0,0,carBlue.width,carBlue.height,carBlue.x,carBlue.y,carBlue.width,carBlue.height);
    }

	context.drawImage(mainSign1,360,95,60,120);
    context.drawImage(mainSign2,305,300,130,50);
    context.drawImage(mainSign3,620,150,130,50);

}


var fpsB = 24; 
var nowB,deltaB;
var thenB = Date.now();
var intervalB = 1000/fpsB;

function blueCarMove(){ 
	if(counter < 150){
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
            flag=false;
		}else{
		    rightOrder();
		}
		return;
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
		if(flag){
			update("blue");
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
			update("green");
		}else {
		   rightOrder();
		}
	}
	return;

}	



function update(type){
	switch(type){
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
        case "blue" : 
			if(isRoadFree){
				isRoadFree = false;
				isBlueActive= false;
				blueID =requestAnimationFrame(blueCarMove);
			}
			break;
	}
}


var countClicker = 1; 
$(document).ready(function(){
	$("#canvas").on('click',function(e){
		var pos = getMousePosition(e);
		
		if(carRed.contains(pos.x,pos.y)){
			carRed.setID(countClicker);
			countClicker++;
			update("red");
		}else if(carGreen.contains(pos.x,pos.y)){
			carGreen.setID(countClicker);
			countClicker++;
			update("green");
        }
        else if(carBlue.contains(pos.x,pos.y)){
			carBlue.setID(countClicker);
			countClicker++;
            update("blue");
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

	

	
	
	isBlueActive = true;
	

	 fpsC = 22;
	 thenC = Date.now();
	 intervalC = 1000/fpsC;


	isGreenActive = true;
	isRedActive = true;
	

	carGreen.x = carGreenStartX;
	carGreen.y = carGreenStartY;
	carRed.x = carRedStartX;
    carRed.y = carRedStartY;
    carBlue.x = carBlueStartX;
    carBlue.y = carBlueStartY;


    carRed.setID(-carRed.id);
    carGreen.setID(-carGreen.id);
    carBlue.setID(-carBlue.id);
	draw();
}


function simulation(){
	resetCrossroad();
	flag=true;
	update("red");

}


function rightOrder(){
	if(isRedActive == false && isBlueActive == false && isGreenActive == false){

		if(carGreen.id == 2 && carRed.id == 1 && carBlue.id == 3){
			alert("Križovatka bola vyplnená správne");
		} else {
			alert("Križovatka bola vyplenena nespravne skuste ešte raz");
		}
	}
}