/**
 * Created by Jam on 07-Mar-16.
 */
"use strict";

var port = 8080;
var express = require('express');
var _ = require('lodash');
var app = express();
var serv = require('http').Server(app);
var io = require('socket.io')(serv);
var util = require('util');
var gr = require("./object-game.js");
var p = require("./object-player.js");

var server = require("./object-server.js")();

app.use(express.static('public'));
serv.listen(port);

function main() {

    console.log("Server Started on port " + port);

    io.on('connection', function (socket) {
        console.log("client successfully connected");
        // Does the player have an account? We assume no for now but we should build the player object first
        let Player = p(socket, server.getGuestId); //gives us a player object
        server.incrementGuestId();

        socket.emit("account info", server.omitPlayerSocket(Player)); //gotta remove the socket first

        server.showCurrentGames(Player.socket);

        socket.on('createGame', function (jsonInfos) {
            let infos = JSON.parse(jsonInfos).split(" ");
            server.incrementGameId();
            let gameRoom = gr(infos[0], server.getGameId);

            Player.currentRoom = gameRoom.getRID; // set the current room to the room joined
            gameRoom.addPlayerToList(Player); //add the player the list of players in the game room object
            server.addGameToList(gameRoom); //add the game room in the list of rooms in the server object
            server.joinGame(gameRoom, Player);
        });

        socket.on("request join game", function (jsonInfos) {
            let infos = JSON.parse(jsonInfos).split(" ");
            for (let i = 0; i < _.size(server.gameList); i++) {
                if (server.gameList[i].getRID == infos[0]) {
                    Player.currentRoom = server.gameList[i].getRID; // set the current room to the room joined
                    server.gameList[i].addPlayerToList(Player); //add the player the list of players in the game room object
                    server.joinGame(server.gameList[i], Player);
                }
            }
        });

        socket.on("player leave", function (jsonInfos) {
            var infos = JSON.parse(jsonInfos).split(" ");
            for (let i = 0; i < _.size(server.gameList); i++) {
                if (server.gameList[i].getRID == infos[0]) {
                    server.gameList[i].removePlayerFromList(Player);
                    socket.emit("leave game");
                    Player.currentRoom = -1; // reset the current room, means the player is not in a room
                    if (server.gameList[i].playerCount > 0)
                        server.sendPlayersChanges(Player.tempId, server.gameList[i], "left");
                    else {
                        let index = server.gameList.indexOf(i);
                        server.gameList.splice(index, 1);
                    }

                    server.showCurrentGames(Player.socket);
                }
            }
        });


        ///////////////////////////////////////////
        // TO BE DONE: The client only sends msgs, never info. //
        // If the client wants to leave a room, find the room he is in, then remove him from it //
        // SO we need a "find currentRoom" function
        // But looking through and comparing all sockets might not be very optimised
        // -> let's add a currentRoom attribute to teh player obj
        ///////////////////////////////////////////

        function findCurrentRoom (roomId) {
            for (let i = 0; i < _.size(server.gameList); i++) {
                if (server.gameList[i].roomId == roomId) {
                    return server.gameList[i];
                }
            }
        }

        /* Sockets to deal with game start and play */
        socket.on("request start game", function () {
            let gameRoom = findCurrentRoom(Player.currentRoom);
            if (gameRoom.playerCount < 2) {
                socket.emit("cannot start game");
            }
            else {
                socket.emit("game start");
            }
        });

        /*function sendPlayersChanges(game, change) {
            for (let i = 0; i < _.size(game.playerList); i++) {
                if (Player.tempId != game.playerList[i].tempId){
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
        }*/

        /*function joinGame(game) {
            console.log("arriving in the joinGame");
            //let gRToSend = _.cloneDeep(game);
            let gRToSend = _.omit(_.cloneDeep(game), "playerList"); // removing the sockets from the object
            socket.emit("join game", gRToSend); // sending a notif to all players that a players joined
            server.sendPlayersChanges(Player.tempId, game, "joined");
        }*/

        /*function omitPlayerSocket(player) {
            let tmp = _.cloneDeep(player);
            return _.omit(tmp, "socket");
        }*/

        /*function showCurrentGames() {
            // Much better way to do it: just remove the playerList as it is a list of players and we just wanna show games. But for now we'll keep this in case we want to show the users more info
            if (server.gameList.length > 0) {
                var copy = _.cloneDeep(server.gameList);
                for (let i = 0; i < _.size(copy); i++) {
                    //now going through games in the list. copy[i] is a game.
                    for (let j = 0; j < copy[i].playerList.length; j++) {
                        //here going through the players in the playerlist of a game
                        copy[i].playerList[j] = _.omit(copy[i].playerList[j], "socket")
                    }
                }
                socket.emit("current games", copy);
            }
        }*/
    });
}

main();