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
        //let uniqueId = server.getGuestId; //already set above
        server.incrementGuestId();
        socket.emit("account info", omitPlayerSocket(Player)); //gotta remove the socket first

        showCurrentGames();

        socket.on('createGame', function (jsonInfos) {
            let infos = JSON.parse(jsonInfos).split(" ");
            server.incrementGameId();
            let gameRoom = gr(infos[0], server.getGameId);
            gameRoom.addPlayerToList(Player);
            server.addGameToList(gameRoom);
            joinGame(gameRoom);
        });

        socket.on("request join game", function (jsonInfos) {
            let infos = JSON.parse(jsonInfos).split(" ");
            console.log("client requested to join game with roomId = " + infos[0]);
            for (let i = 0; i < _.size(server.gameList); i++) {
                if (server.gameList[i].getRID == infos[0]) {
                    server.gameList[i].addPlayerToList(Player);
                    joinGame(server.gameList[i]);
                }
            }
        });

        /*socket.on("player leave", function(jsonInfos) {
            var infos = JSON.parse(jsonInfos).split(" ");
            for (let i = 0; i < _.size(server.gameList); i++) {
                if (server.gameList[i].getRID == infos[0]) {
                    server.gameList[i].removePlayerFromList(Player);
                        socket.emit("leave game");
                    sendPlayersChanges(game, "left");
                }
            }
        });*/

        function sendPlayersChanges(game, change) {
            for (let i = 0; i < _.size(game.playerList); i++) {
                if (Player.tempId != game.playerList[i].tempId){
                    if (change == "joined"){
                        //if i send the new player, i have to append him to the list in the client. In the wrong order then
                        //if i send the whole game, the client will just have to reprint the list of players, in order.

                        let tmp = _.cloneDeep(game);
                        tmp = _.omit(tmp, "playerList");
                        game.playerList[i].socket.emit("player joined", tmp); //send the game not the player
                    }
                    else if (change == "left") {
                        game.playerList[i].socket.emit("player left", omitPlayerSocket(Player));
                    }
                }
            }
        }

        function joinGame(game) {
            //console.log("inspect the arriving game: " + game.playerCount + " " + game.roomName + " " + game.roomId);
            /*let gRToSend = server._.map(game.playerList, function(player) {
                return server._.omit(player, "socket");
            });*/
            console.log("arriving in the joinGame");

            //let gRToSend = _.cloneDeep(game);


            let gRToSend = _.omit(_.cloneDeep(game), "playerList"); // removing the sockets from the object

            //console.log("on stringify! : " + JSON.stringify(gRToSend, false, null));

            //console.log("sending ok to join the game, let's see gRToSend: " + gRToSend.playerCount + " " + gRToSend.roomName +  " " + gRToSend.roomId);

            socket.emit("join game", gRToSend); // sending a notif to all players that a players joined

            console.log("At the end of joinGame, socket du tout premier joueur existe" + server.gameList[0].playerList[0].socket)

            sendPlayersChanges(game, "joined");
            //console.log("game maybe joined");
        }

        function omitPlayerSocket(player) {
            let tmp = _.cloneDeep(player);
            return _.omit(tmp, "socket");
        }

        function showCurrentGames() {
            // Much better way to do it: just remove the playerList as it is a list of players and we juut wanna show games...
            if (server.gameList.length > 0) {
                var all;
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
        }
    });
}

main();