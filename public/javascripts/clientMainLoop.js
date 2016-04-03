/**
 * Created by Jam on 31-Mar-16.
 */
/* ----- MAIN LOOP ????? ----- */
socket.on("join game", function(gameRoom) {
    var GIR = $("#gameInfoRight");
    currentGame.playerNumber = gameRoom.playerNumber;
    console.log("so the playernumber = " + currentGame.playerNumber);
    currentGame.roomName = gameRoom.roomName;
    console.log("so the roomName = " + currentGame.roomName);
    currentGame.roomId = gameRoom.roomId;
    console.log("so the roomId = " + currentGame.roomId);
    currentGame.players = gameRoom.players;
    console.log("so the players = " + currentGame.players);

    console.log("playnum = " + currentGame.playerNumber + " roomname = " + currentGame.roomName + " roomid = " + currentGame.roomId + " player = " + currentGame.players);
    GIR.empty();
    GIR.append("Players (" + currentGame.playerNumber + ") :<br>");
    for (var i = 0; i < currentGame.players.length; i++) {
        $("#gameInfoRight").append(i+1 + ": " + currentGame.players[i] + "<br>");
    }
    displayGame();
});
/* ----- END MAIN LOOP ----- */