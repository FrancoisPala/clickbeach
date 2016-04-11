/**
 * Created by Jam on 31-Mar-16.
 */
"use strict";

class   cPlayer {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    };

    get getName() {
        return this.name;
    }
    get getScore() {
        return this.score;
    }
}

/* Object Game */
class   Game {
    constructor (roomName, roomId) {
        this.playerList = []; // Just an array of player objects containing sockets. Don't send em, all you need is in the scoreboard
        this.scoreBoard = []; // Nom de joueur plus score, all we need for now
        this.playerCount = 0;
        this.roomName = roomName;
        this.roomId = roomId;
        this.started = 0;
        this.leader = null;
        this.leaderName = "";
    };

    get getRID () {
        return this.roomId;
    }

    addPlayerToList(player) {
        this.playerList.push(player);
        this.addPlayerToScoreboard(player);
        this.changePlayerCount(0);
    }

    addPlayerToScoreboard(player){
        let CPlayer = new cPlayer(player.tempId, 0);
        this.scoreBoard.push(CPlayer);
    }

    /*removePlayerFromScoreboard(player) {
        let index = this.scoreBoard.indexOf(player.tempId);
        if (index > -1) {
            this.scoreBoard.splice(index, 1);
        }
        //this.scoreBoard.pop(player.tempId);
    }*/

    removePlayerFromList(player) {
        this.removeFromArray(this.scoreBoard, player.tempId, 1); //remove the player from the scoreboard
        this.removeFromArray(this.playerList, player, 1); //remove the player from the playerlist
        this.changePlayerCount(1); //minus one on the player count
    }

    static removeFromArray(array, element, number) {
        let index = array.indexOf(element);
        if (index > -1 && number > 0) {
            array.splice(index, number);
        }
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