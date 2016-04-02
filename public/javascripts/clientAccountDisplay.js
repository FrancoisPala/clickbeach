/**
 * Created by Jam on 31-Mar-16.
 */
/* ----- HANDLING THE DISPLAY OF USER ACCOUNT ----- */
socket.on("account info", function(data) {
    var playerName = $('#displayInfoRight');
    playerName.html("");
    playerName.append("You are guest: " + data.tempId);
    guestId = data.tempId;
});
/* ----- END OF HANDLING USER ACCOUNT ----- */