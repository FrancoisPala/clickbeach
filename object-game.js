/**
 * Created by Jam on 31-Mar-16.
 */
"use strict";

/* Object Game */
class Game {
    constructor (roomName, roomId) {
        this.playerList = new Map(); /* map de player avec le score devant? */
        this.playerCount = 1;
        this.roomName = roomName;
        this.roomId = roomId;
        this.started = 0;
        this.leader = null;
        this.leaderName = "";
    };

    addPlayerToList(player) {
        this.playerList.set(player, 0);
        this.changePlayerCount(0);
    }

    removePlayerFromList(player) {
        this.playerList.delete(player);
        this.changePlayerCount(1);
    }

    incrementScore(player) {
        let tmp = this.playerList[player].value;
        this.playerList[player] = tmp++;
    }

    changePlayerCount(bool) {
        if (bool === 0)
            ++this.playerCount;
        else if(bool === 1)
            --this.playerCount;
    }
    playerJoin (Player) {
        this.changePlayerCount(0);

    }
}

module.exports = function(roomName, roomId) {return new Game(roomName, roomId);};

/* End Object */