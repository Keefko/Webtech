var canvas = document.getElementById("canvas");
canvas.width = 1000;
canvas.height = 500;
var context = canvas.getContext("2d");
var rectRed,rectBlue,rectGreen;
var redCar,blueCar, greenCar, road;
var redCarSprites, blueCarSprites, greenCarSprites; 

var isRedActive = true; isBlueActive = true; isGreenActive = true;

window.onload = function(){
	draw();
}

function rect(x,y,width,height,status){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	context.fillRect(this.x,this.y,this.width,this.height);
	this.status = status;
	this.contains = function(x,y){
		if(this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height){
			return true;
		}
	}
}

function getMousePosition(e){
	var rect = canvas.getBoundingClientRect();

	return{ 
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};

}

function update(type){
	switch(type){
		case "blue" : 
			blueCarMove();
			break;
		case "red" : 
			redCarMove();
			break;

		case "green" : 
			greenCarMove();
			break;
	}
}

function draw(){	
	road = new Image();
	road.onload = function(){
		context.drawImage(road,0,100,1000,400);
	}
	road.src = "img/road.png";
	
	if(isRedActive == true){
		rectRed = new rect(630,110,98,56,false);
		redCar = new Image();
		redCar.onload = function(){
			context.drawImage(redCar,630,110,98,56);
		}		
		redCar.src = "img/redcar.png";
	}

	if(isBlueActive == true){
		rectBlue = new rect(540,240,44,108,false);
		blueCar = new Image();
		blueCar.onload = function(){
			context.drawImage(blueCar,540,240,44,108);
		}
		blueCar.src = "img/bluecar.png";
	}

	if(isGreenActive == true){
		rectGreen = new rect(310,190,102,53,true);	
		greenCar = new Image();
		greenCar.onload = function(){
			context.drawImage(greenCar,310,190,102,53);
		}
		greenCar.src = "img/greencar.png";
	}
	
	var stopSign = new Image();
	stopSign.onload = function(){
		context.drawImage(stopSign,580,230,30,30);
	}
	stopSign.src = "img/stop.png";

	var mainSign = new Image();
	mainSign.onload = function(){
		context.drawImage(mainSign,610,90,30,30);
		context.drawImage(mainSign,390,230,30,30);
	}
	mainSign.src = "img/main.png";

}


function greenCarMove(){
	greenCarSprites = new Image();
	greenCarSprites.onload = function(){
		var frames = 6; 
		var number = 0; 
		var width = greenCarSprites.width;
		var height = greenCarSprites.height;
		var carWidth = width / frames;
		var moveX = 80; 
		var posX = 310;
		draw();
		setInterval(function(){
			//context.clearRect(0,0,canvas.width,canvas.height);
			number++;
			number = number % frames;
			posX += moveX;
			context.drawImage(greenCarSprites,number*carWidth,0,carWidth,height,posX,190,carWidth,height);
		},50);
	
	}
	greenCarSprites.src = "img/greencarsprites.png";
	
}

function blueCarMove(){

	blueCarSprites = new Image();
	blueCarSprites.onload = function(){
		var frames = 9; 
		var number = 0; 
		var width = blueCarSprites.width;
		var height = blueCarSprites.height;
		var carWidth = width / frames;

		setInterval(function(){
			context.clearRect(0,0,canvas.width,canvas.height);
			number++;
			number = number % 9;
			context.drawImage(blueCarSprites,number*carWidth,0,carWidth,height,540,240,carWidth,height);
		},400);
	}

	blueCarSprites.src = "img/bluecarsprites.png";
}

function redCarMove(){
	redCarSprites = new Image();
	redCarSprites.onload = function(){

		var frames = 11; 
		var number = 11; 
		var width = redCarSprites.width;
		var height = redCarSprites.height;
		var carWidth = width / frames;

		setInterval(function(){
			number--;
			number = number % frames;
			context.drawImage(redCarSprites,number*carWidth,0,carWidth,height,630,110,carWidth,height);
			if(number < 0){
				number = 11;
			}
		},400);
	}

	redCarSprites.src = "img/redcarsprites.png";
}


	



$(document).ready(function(){
	$("#canvas").on('click',function(e){
		var pos = getMousePosition(e);
		console.log(pos);
		if(rectBlue.contains(pos.x,pos.y)){
			if(rectBlue.status){
				isBlueActive = false;
				greenCarMove();
			} else{
				console.log("blue cannot");
			}
		}else if(rectRed.contains(pos.x,pos.y)){
			if(rectRed.status){
				isBlueActive = false;
				blueCarMove();
			}else {
				console.log("red cannot");
			}
		}else if(rectGreen.contains(pos.x,pos.y)){
			if(rectGreen.status){	
				isGreenActive = false;
				greenCarMove();
			} else {
				console.log("blue cannot");
			}
		}
	});
});  