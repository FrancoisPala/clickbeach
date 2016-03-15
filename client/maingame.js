/**
 * Created by Jam on 28-Feb-16.
 */
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var radius = 50;

//OBJET CERCLE
function Circle(x, y, radius, color, bonus) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mainColor = color[0];
    this.strokeColor = color[1];
    this.bonus = bonus;
    this.drawn = 0;
}
//ENUM COLOR
var colorEnum = {
    GREEN:  ['green', '#003300'],
    RED:    ['red', '#aa0000'],
    YELLOW: ['yellow', '#aaaa00'],
    BLUE:   ['blue', '#0000aa'],
    PURPLE: ['purple', '#400040'],
    GREY:   ['grey', '#404040'],
    ORANGE: ['orange', '#cc8500'],
    TEAL:   ['#00cccc', 'teal'],
    PINK:   ['#ff99a8', '#ff4d67'],
    BROWN:  ['#804000', '#4d2600']
};
//FUNCTION DRAW CIRCLE
function drawCircle(mainArray, context) {
    for (var i = 0; i < mainArray.length; i++ ) {
        var circle = mainArray[i];
        if (circle.radius > 0) {
            context.beginPath();
            context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
            context.fillStyle = circle.mainColor;
            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = circle.strokeColor;
            context.stroke();
            context.closePath();
        }
    }
}
//Fonction de reduction des radius des cercles
function reduceRadius() {
    if (nextReduceRadius == 0) {
        for (i = 0; i < mainArray.length; i++) {
            mainArray[i].radius -= 1;
        }
        nextReduceRadius = 1;
    }
    else {
        nextReduceRadius = 0;
    }
}
//Fonction de check de la position du click
function checkPos(mpos, cpos, radius) {
    var isIn = 0;
    var xIsGood = 0;
    var yIsGood = 0;
    if (mpos[0] < cpos[0] && (cpos[0] - mpos[0] <= radius)) {
        xIsGood = 1;
    }
    else if (mpos[0] > cpos[0] && (mpos[0] - cpos[0] <= radius)) {
        xIsGood = 1;
    }
    if (mpos[1] < cpos[1] && (cpos[1] - mpos[1] <= radius)) {
        yIsGood = 1;
    }
    else if (mpos[1] > cpos[1] && (mpos[1] - cpos[1] <= radius)) {
        yIsGood = 1;
    }
    if (xIsGood == 1 && yIsGood == 1) {
        isIn = 1;
    }
    return isIn;
}

//GAME LOOP
var circlePos = [canvas.width / 2, canvas.height / 2];
var myCircle = new Circle(circlePos[0], circlePos[1], radius, colorEnum.RED, 0);
var mainArray = [];
mainArray.push(myCircle);
var nextClick = 0;
var nextReduceRadius = 0;

function gLoop(arrayPlayer) {
    requestAnimationFrame(gLoop);
    context.clearRect(0, 0, canvas.width, canvas.height); //ETAPE1: TOUT EFFACER

    var alive = arrayPlayer.length; //etape2: on check si il y a encore des joueurs

    drawCircle(mainArray, context); //dessine les ronds
    reduceRadius();//etape 3 : réduire les radius des ronds

    //recupere les controles

    $("#myCanvas").off().on('click', function (event){
        var mousePos = [event.pageX, event.pageY];
        if (nextClick == 0) {
            var isIn = checkPos(mousePos, circlePos, radius);
            if (isIn == 1) {
                mainArray.shift(); //TUER LE CERCLE
                nextClick = 1; //Next Click deviens 1 pour remettre un cercle
            }
            else {
                //Faire perdre de la vie ou qqc
            }
        }
        else {
            console.log("dans le next click = 1");
            //etape 1: update la position du futur cercle
            circlePos = [mousePos[0], mousePos[1]];
            myCircle = new Circle(mousePos[0], mousePos[1], radius, colorEnum.TEAL, 0);
            //etape 2: redraw
            mainArray.push(myCircle);
            //reset le next click
            nextClick = 0;

        }
    });
    //update score et bonus joueurs
    //update array objects map

}

// TEST TEST TEST TEST TEST TEST
var test = [];                  //
test.push("1");                 //
test.push("2");                 //
gLoop(test);                    //
// TEST TEST TEST TEST TEST TEST