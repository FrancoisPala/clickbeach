/**
 * Created by Jam on 31-Mar-16.
 */
/* ----- MAIN LOOP ????? ----- */
socket.on("join game", function(gameRoom) {
    var GIR = $("#gameInfoRight");
    displayGame();
    currentGame.playerNumber = gameRoom.playerNumber;
    currentGame.roomName = gameRoom.roomName;
    currentGame.roomId = gameRoom.roomId;
    currentGame.players = gameRoom.players;
    console.log("playnum = " + currentGame.playerNumber + " roomname = " + currentGame.roomName + " roomid = " + currentGame.roomId + " player = " + currentGame.players);
    GIR.html("");
    GIR.append("Players (" + currentGame.playerNumber + ") :<br>");
    for (var i = 0; i < currentGame.players.length; i++) {
        $("#gameInfoRight").append(i+1 + ": " + currentGame.players[i] + "<br>");
    }
});
/* ----- END MAIN LOOP ----- */