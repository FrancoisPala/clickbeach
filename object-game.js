/**
 * Created by Jam on 31-Mar-16.
 */
"use strict";

/* Object Game */
class Game {
    constructor (roomName, roomId) {
        this.playerList = []; /* map de player avec le score devant? Cannot be map (not enough entries) */
        this.scoreBoard = [];
        this.playerCount = 1;
        this.roomName = roomName;
        this.roomId = roomId;
        this.started = 0;
        this.leader = null;
        this.leaderName = "";
    };

    addPlayerToList(player) {
        console.log("--We here add a player to the list, playerId is: " + player.tempId);
        this.playerList.push(player);
        console.log("--The playerList is now composed of: " + this.playerList[0].tempId);
        this.addPlayerToScoreboard(player);
        console.log("--And now the scoreBoard is made of: " + this.scoreBoard[player.tempId])
        this.changePlayerCount(0);
        //console.log("--Let's then access the player in the list, " + this.playerList[player].tempId)
    }

    addPlayerToScoreboard(player){
        console.log("--adding a player to the score, tempid = " + player.tempId);
        this.scoreBoard[player.tempId] = 0;
        console.log("--now added, scoreboard[tempid] = " + this.scoreBoard[player.tempId])
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

    removeFromArray(array, element, number) {
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