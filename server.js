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
            console.log("in the create game");
            let infos = JSON.parse(jsonInfos).split(" ");

            //console.log("client created game with infos Name = " + infos[0] + " and Client Id = " + infos[1]);

            server.incrementGameId();
            let gameRoom = gr(infos[0], server.getGameId);

            //console.log("Game room created, player count = " + gameRoom.playerCount + " and roomName = " + gameRoom.roomName + " and roomId = " + gameRoom.roomId);
            //console.log("Now we add a player to the list, tempId = " + Player.tempId);

            gameRoom.addPlayerToList(Player);

            //console.log("So now the player is in the room, " + gameRoom.playerList[0]);

            server.addGameToList(gameRoom);

            //console.log("And now the room is in the list, " + server.gameList[0].roomId);
            //console.log("about to join the room");
            joinGame(gameRoom);
        });

        socket.on("request join game", function (jsonInfos) {
            let infos = JSON.parse(jsonInfos).split(" ");
            for (let i = 0; i < _.size(server.gameList); i++) {
                if (server.gameList[i].getRID == infos[0]) {
                    server.gameList[i].addPlayerToList(Player);
                    joinGame(server.gameList[i]);
                }
            }
        });

        socket.on("player leave", function(jsonInfos) {
            var infos = JSON.parse(jsonInfos).split(" ");
            for (let i = 0; i < _.size(server.gameList); i++) {
                if (server.gameList[i].getRID == infos[0]) {
                    server.gameList[i].removePlayerFromList(Player);
                    socket.emit("leave game");
                }
            }
        });

        function joinGame(game) {
            //console.log("inspect the arriving game: " + game.playerCount + " " + game.roomName + " " + game.roomId);
            /*let gRToSend = server._.map(game.playerList, function(player) {
                return server._.omit(player, "socket");
            });*/
            let gRToSend = _.omit(game, "playerList");
            //console.log("on stringify! : " + JSON.stringify(gRToSend, false, null));

            //console.log("sending ok to join the game, let's see gRToSend: " + gRToSend.playerCount + " " + gRToSend.roomName +  " " + gRToSend.roomId);

            socket.emit("join game", gRToSend);

            //console.log("game maybe joined");
        }

        function omitPlayerSocket(player) {
            return (_.omit(player, "socket"));
        }

        function showCurrentGames() {

            // Much better way to do it: just remove the playerList as it is a list of players and we juut wanna show games...

            if (server.gameList.length > 0) {
                var all;
                //console.log("lolipouet");
                var copy = {};
                _.merge(copy, server.gameList); //assignation by copy of the server.gameList object
                //console.log(server.gameList[0].roomName);
                //console.log("heyoooooooooooo: " + copy[0].roomId + " copy length: " + _.size(copy) + " voila");
                for (let i = 0; i < _.size(copy); i++) {
                    //now going through games in the list. copy[i] is a game.
                    //console.log("du coup: " );
                    for (let j = 0; j < copy[i].playerList.length; j++) {
                        //console.log("non?");
                        //here going through the players in the playerlist of a game
                        copy[i].playerList[j] = _.omit(copy[i].playerList[j], "socket")
                        //console.log("i = " + i + ", j = " + j + ", and the result is: " + JSON.stringify(copy[i].playerList[j]));
                    }
                }
                socket.emit("current games", copy);
            }
        }
    });
}

main();