/**
 * Created by Jam on 31-Mar-16.
 */
"use strict";

class Server {
    constructor(port) {
        /*this.port = port;
        this.express = require('express');
        this._ = require('lodash');
        this.app = this.express();
        this.server = require('http').Server(this.app);
        this.io = require('socket.io')(this.server);*/

        this.gameId = 0; /* to create room ids */
        this.guestId = 0; /* to create guest ids */
        this.gameList = []; /* all the games currently played on the serv. Contains an array of Game objects */
    }

    start() {

    }

    get getGameId (){
        return this.gameId;
    }

    get getGuestId () {
        return this.guestId;
    }

    incrementGameId (){
        ++this.gameId;
    }
    incrementGuestId () {
        ++this.guestId;
    }
    addGameToList (Game) {
        this.gameList.push(Game);
        //Ici on peut en profiter pour envoyer un evenement qui montre la liste de game pour afficher ça tuot le temps dynamiquement au fur et a mesure youpitralala
    }

}

module.exports = function(port) {return new Server(port);};




