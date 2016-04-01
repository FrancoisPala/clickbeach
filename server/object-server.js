"use strict";
/**
 * Created by Jam on 31-Mar-16.
 */

class Server {
    constructor(port) {
        this.port = port;
        this.express = require('express');
        this._ = require('lodash');
        this.app = express();
        this.server = require('http').Server(app);
        this.io = require('socket.io')(server);

        this.gameNumber = 0; /* to create room ids */
        this.gameId = 0; /* to create room ids */
        this.guestId = 0; /* to create guest ids */
        this.gameList = []; /* all the games currently played on the serv. Contains an array of gameRoom objects */
    }

    start() {
        this.app.use(express.static('public'));
        this.server.listen(this.port);
        console.log("youpi");
    }
}

module.exports = Server;


/* Object Player */
function Player () {
    this.tempId = "0";
    this.socket = null;
    this.name = "";
    this.id = "";
    this.mail = "";
    this.password = "";
    this.record = "";
    this.nbrWin = ""
}
/* End Player */

/* Object Game */
function Game () {
    this.playerList = null; /* map avec le score devant? */
    this.nbrPlayer = 0;
    this.roomName = "";
    this.roomId = "";
    this.started = 0;
    this.leader = null;
    this.leaderName = ""
}
/* End Object */