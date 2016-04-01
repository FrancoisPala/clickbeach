"use strict";
/**
 * Created by Jam on 31-Mar-16.
 */

/* Object Player */
class Player {
    constructor(socket, tempId) {
        this.tempId = tempId;
        this.socket = socket;
        this.name = "";
        this.id = "";
        this.mail = "";
        this.password = "";
        this.record = "";
        this.nbrWin = "";
    }
}


/* End Player */