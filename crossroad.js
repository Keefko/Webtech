var road,road2;
var redCar,greenCar,blueCar;
var canvas,context;
window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');

	let road = new Image;
	road.src = "img/road.png";
	road.onload = function(){
		ctx.imageSmoothingQuality = 'high';
		ctx.drawImage(road,0,50,300,120);
	}


	let greenCar = new Image;
	greenCar.src = "img/greencar.png";
	greenCar.onload = function(){
		ctx.imageSmoothingQuality = 'high';
		ctx.drawImage(greenCar,95,75,25,20);
	}


	let blueCar = new Image;
	blueCar.src = "img/bluecar.png";
	blueCar.onload = function(){
		ctx.imageSmoothingQuality = 'high';
		ctx.drawImage(blueCar,155,90,20,20);
	}

	let redCar = new Image;
	redCar.src = "img/redcar.png";
	redCar.onload = function(){
		ctx.imageSmoothingQuality = 'high';
		ctx.drawImage(redCar,190,53,25,20);
	}

}

function animate(car){
	requestAnimationFrame(animate);
	if(car == "redCar"){

	}else if(car == "greenCar"){

	}else {

	}

}

function update(){

}

function clickOnCar(x,y){

}


$(document).ready(function(){
	$("#canvas").mousedown(function(event){
		console.log(event.clientX,event.clientY);
		console.log(clickOnCar(event.clientX, event.clientY));
	});	
});
