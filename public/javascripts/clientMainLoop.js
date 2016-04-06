/**
 * Created by Jam on 31-Mar-16.
 */
/* ----- MAIN LOOP ????? ----- */
socket.on("join game", function(gameRoom) {
    console.log("received join game socket message");
    var GIR = $("#gameInfoRight");
    currentGame.playerCount = gameRoom.playerCount;
    console.log("so the playernumber = " + currentGame.playerCount);
    currentGame.roomName = gameRoom.roomName;
    //console.log("so the roomName = " + currentGame.roomName);
    currentGame.roomId = gameRoom.roomId;
    //console.log("so the roomId = " + currentGame.roomId);
    currentGame.scoreBoard = gameRoom.scoreBoard;
    //console.log("so the players = " + currentGame.scoreBoard);

    GIR.empty();
    GIR.append("Players (" + currentGame.playerCount + ") :<br>");
    for (var i = 0; i < currentGame.playerCount; i++) {
        $("#gameInfoRight").append(i+1 + ": " + currentGame.scoreBoard[i].name + "<br>");
    }
    displayGame();
});
/* ----- END MAIN LOOP ----- */