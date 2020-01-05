var canvas = document.getElementById("canvas");
canvas.width = 1000;
canvas.height = 500;
var context = canvas.getContext("2d");
var isBlueActive = false; isGreenActive = false;
var isBlueReady = false, isGreenReady = true;
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;


var carBlueStartX =260 ;
var carBlueStartY = 170;
var carGreenStartX = 190;
var carGreenStartY = 205;
var greenID,blueID;
var isRoadFree = true;
var flag = false;
var counter =0;


var road = new Image();
road.onload = function(){
}
road.src = "img/kruhacsprechodmi.png";

var greenCarSprites = new Image();
greenCarSprites.onload = function(){
    carGreen = new car(carGreenStartX,carGreenStartY,108,108);
    isGreenActive = true;
}
greenCarSprites.src = "img/greenroundabout.png";

var blueCarSprites = new Image();
blueCarSprites.onload = function(){
    carBlue = new car(carBlueStartX,carBlueStartY,108,108);
    isBlueActive = true;
}
blueCarSprites.src = "img/blueroundabout.png";



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
    context.drawImage(road,100,0,800,500);

    if(isBlueActive == true){
        context.drawImage(blueCarSprites,0,0,carBlue.width,carBlue.height,carBlue.x,carBlue.y,carBlue.width,carBlue.height);
    }

    if(isGreenActive == true){
        context.drawImage(greenCarSprites,0,0,carGreen.width,carGreen.height,carGreen.x,carGreen.y,carGreen.width,carGreen.height);
    }


}

var cycleLoopGreen = [0,1,2,3,4,5];
var currentLoopIndexGreen = 0;
var currentDirectionGreen = 0;
var fpsC = 22;
var nowC,deltaC;
var thenC = Date.now();
var intervalC = 1000/fpsC;

function greenCarMove(){
    if(counter < 180){
        requestAnimationFrame(greenCarMove);
        nowC = Date.now();
        deltaC = nowC - thenC;
        if(deltaC > intervalC){
            context.clearRect(0,0,canvas.width,canvas.height);
            draw();
            context.drawImage(greenCarSprites,cycleLoopGreen[currentLoopIndexGreen]*carGreen.width,currentDirectionGreen*carGreen.height,carGreen.width,carGreen.height,carGreen.x,carGreen.y,carGreen.width,carGreen.height);
            if(currentDirectionGreen == 0){
                carGreen.newPos(5,0);
            } else if(currentDirectionGreen == 1){
                carGreen.newPos(5,2);
            } else if(currentDirectionGreen == 2){
                carGreen.newPos(4,5);
            } else if(currentDirectionGreen == 3){
                carGreen.newPos(3,5);
            } else if(currentDirectionGreen == 4){
                carGreen.newPos(6,3);
            } else if(currentDirectionGreen == 5){
                carGreen.newPos(7,2);
            } else if(currentDirectionGreen == 6){
                carGreen.newPos(10,2);
            } else if(currentDirectionGreen == 7){
                carGreen.newPos(2,7);
            } else if(currentLoopIndexGreen == 8){
                carGreen.newPos(0,10);
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
var fpsB = 28;
var nowB,deltaB;
var thenB = Date.now();
var intervalB = 1000/fpsB;

function blueCarMove(){
    if(counter < 140){
        requestAnimationFrame(blueCarMove);
        nowB = Date.now();
        deltaB = nowB - thenB;
        if(deltaB > intervalB){
            context.clearRect(0,0,canvas.width,canvas.height);
            draw();
            context.drawImage(blueCarSprites,cycleLoopBlue[currentLoopIndexBlue]*carBlue.width,currentDirectionBlue*carBlue.height,carBlue.width,carBlue.height,carBlue.x,carBlue.y,carBlue.width,carBlue.height);
            if(currentDirectionBlue == 0){
                carBlue.newPos(1,6);
            }else if(currentDirectionBlue == 1){
                carBlue.newPos(2,6);
            } else if(currentDirectionBlue == 2){
                carBlue.newPos(3,5);
            } else if(currentDirectionBlue == 3){
                carBlue.newPos(6,3);
            } else if (currentDirectionBlue == 4){
                carBlue.newPos(8,1);
            } else if(currentDirectionBlue == 5){
                carBlue.newPos(6,3);
            } else if(currentDirectionBlue == 6){
                carBlue.newPos(2,8);
            } else if(currentDirectionBlue == 7){
                carBlue.newPos(0,15);
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
            flag =false;
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


    currentLoopIndexBlue =0;
    currentDirectionBlue = 0;
    fpsB = 28;
    thenB = Date.now();
    intervalB = 1000/fpsB;

    currentLoopIndexGreen = 0;
    currentDirectionGreen =0;
    fpsC = 20;
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
    update("green");

}


function rightOrder(){
    if(isBlueActive == false && isGreenActive == false){
        if(carGreen.id == 1 && carBlue.id == 2){
            alert("Križovatka bola vyplnená správne");
        } else {
            alert("Križovatka bola vyplenena nespravne skuste ešte raz");
        }
    }
}