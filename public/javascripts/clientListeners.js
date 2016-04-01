/**
 * Created by Jam on 31-Mar-16.
 */
/* ----- LISTENERS ----- */
var BH = $("#backHome");
var SG = $("#startGame");
$("#createGameButton").on("click", function(event) {
    createGame();
    event.stopPropagation();
}); /* CREATE GAME VIA BUTTON */
$("#createText").on("keydown", function(event) {
    if (event.which == 13){
        createGame();
        event.stopPropagation();
    }
}); /* CREATE GAME VIA TEXT BOX */
BH.on("click", function(event) {
    $("#game").css("display", "none");
    $("#index").css("display", "block");
    socket.emit("player leave", toJson(currentGame.roomId, guestId));
    event.stopPropagation();
});
BH.on("mouseover", function() {
    $(this).css("background-color", "#555555");
});
BH.on("mouseleave", function() {
    $(this).css("background-color", "#666666");
});
SG.on("click", function(event) {
    /* if nbr player < 2 pas start */
    if (currentGame.playerNumber < 2){
        if (hasClicked == 0){
            $(this).append("<p style='color: red'>You must be at least 2 to start a game</p>");
        }
        hasClicked = 1;
    }
    else {
        hasClicked = 0;
        socket.emit("start game");
    }
    event.stopPropagation();
});
SG.on("mouseover", function() {
    $(this).css("background-color", "#555555");
});
SG.on("mouseleave", function() {
    $(this).css("background-color", "#666666");
});
/* ----- END LISTENERS ----- */