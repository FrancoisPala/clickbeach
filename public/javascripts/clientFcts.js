/**
 * Created by Jam on 31-Mar-16.
 */
/* ----- FUNCTIONS ----- */

function getRoomId(target) {
    var buffer;
    for (i = target.length - 1; target[i] != " " && i >= 0; i--){
        buffer += target[i];
    }
    buffer = buffer.replace("undefined", '');
    buffer = reverse(buffer);
    return buffer;
}

function reverse(s){
    return s.split("").reverse().join("");
}

function gameRoomClicker(event) {
    var roomId = getRoomId(event.target.textContent);
    socket.emit("request join game", toJson(roomId, guestId));
    event.stopPropagation();
}

function gameRoomMouseover(event) {
    $(event.target).css("background-color", "#555555");
}

function gameRoomMouseleave(event) {
    $(event.currentTarget).css("background-color", "#666666");
}

function toJson(/*whatever we want*/) {
    var str = [];
    for (var i = 0; i < arguments.length; i++) {
        str += arguments[i] + " ";
    }
    return JSON.stringify(str);
}

function createGame() {
    var gameName = document.getElementById("createText").value;
    if (gameName){
        socket.emit('createGame', toJson(gameName, guestId))
    }
    document.getElementById("createText").value = "";
}

function displayGame() {
    $("#index").css("display", "none");
    $("#game").css("display", "block");
}

function displayIndex() {
    $("#game").css("display", "none");
    $("#index").css("display", "block");
}
/* ----- END FUNCTIONS ----- */