"use strict";
/**
 * Created by Jam on 31-Mar-16.
 */

/* Object Player */
class Player {
    constructor(socket, tempId) {
        this.tempId = tempId;
        this.socket = socket;
        this.currentRoom = -1;
        this.life = -1;
        this.name = "";
        this.id = 0;
        this.mail = "";
        this.password = "";
        this.record = "";
        this.nbrWin = "";
    }

    get playerId() {
        if (this.id == 0)
            return this.tempId;
        else
            return this.id;
    }

    get getCurrentRoom() {
        return this.currentRoom;
    }

}

module.exports = function(socket, tempId) {return new Player(socket, tempId);};


/* End Player */