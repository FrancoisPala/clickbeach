/**
 * Created by Jam on 31-Mar-16.
 */
/* ----- CREATE, DISPLAY AND LISTEN TO CURRENT GAMES ----- */
socket.on("current games", function(gameList) {
    var cG = $("#currentGames").empty();
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
/* ----- END OF HANDLING CURRENT GAMES ----- */