/**
 * Created by Jam on 31-Mar-16.
 */
/* ----- CREATE, DISPLAY AND LISTEN TO CURRENT GAMES ----- */
socket.on("current games", function(gameList) {
    var cG = $("#currentGames").empty();
    //console.log("in the current games displayer with gamelist[0] = " + gameList[0].playerCount + " and " + gameList[0].roomId);
    for (i = 0; i < gameList.length; i++) {
        cG.append("<div class='gameList'>" + gameList[i].roomName + "<p class='gameListD'>" + " Number Of Players: " + gameList[i].playerNumber + " id: " + gameList[i].roomId + "</p>");
    } /* Dynamically Loads the list of games */
    /* ----- SET LISTENERS ON GAME LIST----- */
    var selectorGameList = document.querySelectorAll('.gameList');
    var selectorGameListD = document.querySelectorAll('.gameListD');
    for (var i = 0; i < selectorGameList.length; i++) {
        selectorGameList.item(i).addEventListener("mouseover", gameRoomMouseover, false);
        selectorGameList.item(i).addEventListener("mouseleave", gameRoomMouseleave, false);
        selectorGameListD.item(i).addEventListener("mouseover", gameRoomMouseover, false);
        selectorGameListD.item(i).addEventListener("mouseleave", gameRoomMouseleave, false);
        selectorGameList.item(i).removeEventListener("click", gameRoomClicker, false);
        selectorGameList.item(i).addEventListener("click", gameRoomClicker, false);
    }
    /* ----- END ----- */
});

/*socket.on("join game", function(data) {
    displayGame();

});*/
/* ----- END OF HANDLING CURRENT GAMES ----- */