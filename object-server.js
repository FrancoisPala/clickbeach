/**
 * Created by Jam on 31-Mar-16.
 */
"use strict";

class Server {
    constructor(port) {
        this.port = port;
        this.express = require('express');
        this._ = require('lodash');
        this.app = this.express();
        this.server = require('http').Server(this.app);
        this.io = require('socket.io')(this.server);

        this.gameId = 0; /* to create room ids */
        this.guestId = 0; /* to create guest ids */
        this.gameList = []; /* all the games currently played on the serv. Contains an array of gameRoom objects */
    }

    start() {
        this.app.use(this.express.static('public'));
        this.server.listen(this.port);
    }

    incrementGameId (){
        ++this.gameId;
    }

    incrementGuestId () {
        ++this.guestId;
    }
}

module.exports = function(port) {return new Server(port);};




