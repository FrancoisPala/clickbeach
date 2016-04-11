/**
 * Created by Jam on 31-Mar-16.
 */
/* ----- MAIN LOOP ????? ----- */
socket.on("join game", function(gameRoom) {
    console.log("received join game socket message");
    updatePlayerInfos(gameRoom);
    appendPlayers();
    displayGame();
});

socket.on("player joined", function (data) {
    "use strict";
    updatePlayerInfos(data);
    appendPlayers();
});

socket.on("player left", function (data) {
    "use strict";
    updatePlayerInfos(data);
    appendPlayers();
});

socket.on("leave game", function () {
    "use strict";
    displayIndex();
});

socket.on("cannot start game", function () {
    "use strict";
    $("#startGame").append("<p style='color: red'>You must be at least 2 to start a game</p>");
});

socket.on("game start", function () { //HERE THE GAME SI STARTED
    "use strict";

});

function appendPlayers () {
    "use strict";
    let GIR = $("#gameInfoRight");
    GIR.empty();
    GIR.append("Players (" + currentGame.playerCount + ") :<br>");
    for (let i = 0; i < currentGame.playerCount; i++) {
        $("#gameInfoRight").append(i+1 + ": " + currentGame.scoreBoard[i].name + "<br>");
    }
}

function updatePlayerInfos (gameRoom) {
    "use strict";
    currentGame.playerCount = gameRoom.playerCount;
    //console.log("so the playernumber = " + currentGame.playerCount);
    currentGame.roomName = gameRoom.roomName;
    //console.log("so the roomName = " + currentGame.roomName);
    currentGame.roomId = gameRoom.roomId;
    //console.log("so the roomId = " + currentGame.roomId);
    currentGame.scoreBoard = gameRoom.scoreBoard;
}



/* ----- END MAIN LOOP ----- */