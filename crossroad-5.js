var canvas = document.getElementById("canvas");
canvas.width = 1000;
canvas.height = 500;
var context = canvas.getContext("2d");


isBlueActive = false; isGreenActive = false;
var isBlueReady = false, isGreenReady = true;

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var carBlueStartX =400 ; 
var carBlueStartY = 280; 
var carGreenStartX = 280; 
var carGreenStartY = 155; 
var greenID,blueID;
var isRoadFree = true;		
var flag = false;		
var counter =0;


var road = new Image();
road.onload = function(){
}
road.src = "img/crossroad3N.png";


var greenCarSprites = new Image();
greenCarSprites.onload = function(){
	carGreen = new car(carGreenStartX,carGreenStartY,192,103);
	isGreenActive = true;
}
greenCarSprites.src = "img/greencarspritesLarge.png"; 

var blueCarSprites = new Image();
blueCarSprites.onload = function(){
	carBlue = new car(carBlueStartX,carBlueStartY,220,208);
	isBlueActive = true;
}
blueCarSprites.src = "img/bluecarspritesLarge.png";

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


function draw(){	
	context.drawImage(road,0,0,1000,500);

	if(isBlueActive == true){
		context.drawImage(blueCarSprites,0,0,carBlue.width,carBlue.height,carBlue.x,carBlue.y,carBlue.width,carBlue.height);
	}

	if(isGreenActive == true){
		context.drawImage(greenCarSprites,0,0,carGreen.width,carGreen.height,carGreen.x,carGreen.y,carGreen.width,carGreen.height);
	}
}


function getMousePosition(e){
	var rect = canvas.getBoundingClientRect();

	return{ 
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};

}


var fpsC = 35; 
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
			context.drawImage(greenCarSprites,0,0,carGreen.width,carGreen.height,carGreen.x,carGreen.y,carGreen.width,carGreen.height);
			carGreen.newPos(11,0);
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

const cycleLoopBlue = [0,1,2];
let currentLoopIndexBlue = 0; 
let currentDirectionBlue = 0;


var fpsB = 64; 
var nowB,deltaB;
var thenB = Date.now();
var intervalB = 1000/fpsB;
var n = 0;
function blueCarMove(){ 
	if(counter < 120){
		requestAnimationFrame(blueCarMove);
		nowB = Date.now();
		deltaB = nowB - thenB;
		if(deltaB > intervalB){
			context.clearRect(0,0,canvas.width,canvas.height);
			draw();
			context.drawImage(blueCarSprites,cycleLoopBlue[currentLoopIndexBlue] * carBlue.width,currentDirectionBlue*carBlue.height,carBlue.width,carBlue.height,carBlue.x,carBlue.y,carBlue.width,carBlue.height);
			
			if(currentDirectionBlue == 0){
				carBlue.newPos(5,-2);
			} else if(currentDirectionBlue == 1){
				carBlue.newPos(5,-1.5);
			} else if(currentDirectionBlue == 2){
				carBlue.newPos(10,0);
			} 

			if(n==20|| n==30 || n==40){
            currentLoopIndexBlue++;
			if(currentLoopIndexBlue >= cycleLoopBlue.length){
				currentLoopIndexBlue = 0;
                currentDirectionBlue++; 
                n=0;

            }
            }

            n++;
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

function update(type){
	switch(type){
		case "blue" : 
			if(isRoadFree){
				isRoadFree = false;
				isBlueActive= false;
				blueID =requestAnimationFrame(blueCarMove);
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
     n=0;
     
	 currentLoopIndexBlue =0;
	 currentDirectionBlue =0; 
	 fpsB = 64;
	 thenB = Date.now();
	 intervalB = 1000/fpsB;

	 fpsC = 22;
	 thenC = Date.now();
	 intervalC = 1000/fpsC;


	isGreenActive = true;
	
	isBlueActive = true;

	carGreen.x = carGreenStartX;
	carGreen.y = carGreenStartY;
	carBlue.x = carBlueStartX;
    carBlue.y = carBlueStartY;
    
    carGreen.setID(-carGreen.id);
    carBlue.setID(-carBlue.id);

	draw();
}


function simulation(){
	resetCrossroad();
	flag=true;
	update("blue");

}


function rightOrder(){
	if(isBlueActive == false && isGreenActive == false){
		if(carGreen.id == 2 && carBlue.id == 1){
			alert("Križovatka bola vyplnená správne");
		} else {
			alert("Križovatka bola vyplenena nespravne skuste ešte raz");
		}
	}
}