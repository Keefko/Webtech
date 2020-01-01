var canvas = document.getElementById("canvas");
canvas.width = 1000;
canvas.height = 500;
var context = canvas.getContext("2d");
var rectRed,rectBlue,rectGreen

window.onload = function(){
	
	rectRed = new rect(630,110,98,56,false);
	rectBlue = new rect(540,240,44,108,false);
	rectGreen = new rect(310,190,102,53,true);
	
	var road = new Image();
	road.onload = function(){
		context.drawImage(road,0,100,1000,400);
	}
	road.src = "img/road.png";
	

	var blueCar = new Image();
	blueCar.onload = function(){
		context.drawImage(blueCar,540,240,44,108);
	}
	blueCar.src = "img/bluecar.png";

	var redCar = new Image();
	redCar.onload = function(){
		context.drawImage(redCar,630,110,98,56);
	}
	redCar.src = "img/redcar.png";
	
	var greenCar = new Image();
	greenCar.onload = function(){
		context.drawImage(greenCar,310,190,102,53);
	}
	greenCar.src = "img/greencar.png";
	
	var stopSign = new Image();
	stopSign.onload = function(){
	
	}
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

function rule(){

}


$(document).ready(function(){
	$("#canvas").on('click',function(e){
		var pos = getMousePosition(e);

		if(rectBlue.contains(pos.x,pos.y)){
			alert("fuck yuu");
		}else if(rectRed.contains(pos.x,pos.y)){
			alert("red");
		}else if(rectGreen.contains(pos.x,pos.y)){
			alert("green");
		}
	});
});  