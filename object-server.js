/**
 * Created by Jam on 31-Mar-16.
 */
"use strict";

var _ = require('lodash');

class Server {
    constructor() {
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

    sendPlayersChanges(tempId, game, change) { //static because the function never needs access to any "this" properties
        for (let i = 0; i < _.size(game.playerList); i++) {
            if (tempId != game.playerList[i].tempId){
                let tmp = _.cloneDeep(game);
                tmp = _.omit(tmp, "playerList");
                if (change == "joined"){
                    //if i send the new player, i have to append him to the list in the client. In the wrong order then
                    //if i send the whole game, the client will just have to reprint the list of players, in order.
                    game.playerList[i].socket.emit("player joined", tmp); //send the game not the player
                }
                else if (change == "left") {
                    game.playerList[i].socket.emit("player left", tmp);
                }
            }
        }
    }

    joinGame(game, player) {
        console.log("arriving in the joinGame");
        let gRToSend = _.omit(_.cloneDeep(game), "playerList"); // removing the sockets from the object
        player.socket.emit("join game", gRToSend); // sending a notif to all players that a players joined
        this.sendPlayersChanges(player.tempId, game, "joined");
    }

    omitPlayerSocket(player) {
        return _.omit(_.cloneDeep(player), "socket");
    }

    showCurrentGames(socket) {
    // Much better way to do it: just remove the playerList as it is a list of players and we just wanna show games. But for now we'll keep this in case we want to show the users more info
    if (this.gameList.length > 0) {
        var copy = _.cloneDeep(this.gameList);
        for (let i = 0; i < _.size(copy); i++) {
            //now going through games in the list. copy[i] is a game.
            for (let j = 0; j < copy[i].playerList.length; j++) {
                //here going through the players in the playerlist of a game
                copy[i].playerList[j] = _.omit(copy[i].playerList[j], "socket")
            }
        }
        socket.emit("current games", copy);
    }
}

}

module.exports = function(port) {return new Server(port);};




