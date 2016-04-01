/**
 * Created by Jam on 31-Mar-16.
 */
"use strict";

/* Object Game */
class Game {
    constructor (roomName, roomId) {
        this.playerList = {}; /* map avec le score devant? */
        this.playerCount = 1;
        this.roomName = roomName;
        this.roomId = roomId;
        this.started = 0;
        this.leader = null;
        this.leaderName = "";
    }

    addPlayerToList(player) {
        this.playerList[player] = 0;
    }

    incrementScore(player) {
        let tmp = this.playerList[player].value;
        this.playerList[player] = tmp + 1;
    }

    changePlayerCount(bool) {
        if (bool === 0)
            this.playerCount++;
        else if(bool === 1)
            this.playerCount--;
    }

}

module.exports = function(roomName, roomId) {return new Game(roomName, roomId);};

/* End Object */