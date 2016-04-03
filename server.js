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

app.use(express.static('public'));
serv.listen(port);

function main() {
    let server = require("./object-server.js")(8080);
    server.start();
    console.log("Server Started on port " + port);

    io.on('connection', function (socket) {
        console.log("client successfully connected");
        // Does the player have an account? We assume no for now but we should build the player object first
        let Player = require("./object-player.js")(socket, server.getGuestId); //gives us a player object
        //let uniqueId = server.getGuestId; //already set above
        server.incrementGuestId();
        socket.emit("account info", omitPlayerSocket(Player)); //gotta remove the socket first

        showCurrentGames();

        socket.on('createGame', function (jsonInfos) {
            let infos = JSON.parse(jsonInfos).split(" ");

            //console.log("client created game with infos Name = " + infos[0] + " and Client Id = " + infos[1]);

            server.incrementGameId();
            let gameRoom = require("./object-game.js")(infos[0], server.getGameId);

            //console.log("Game room created, player count = " + gameRoom.playerCount + " and roomName = " + gameRoom.roomName + " and roomId = " + gameRoom.roomId);
            //console.log("Now we add a player to the list, tempId = " + Player.tempId);

            gameRoom.addPlayerToList(Player);

            //console.log("So now the player is in the room, " + gameRoom.playerList[0]);

            server.addGameToList(gameRoom);

            //console.log("And now the room is in the list, " + server.gameList[0].roomId);
            joinGame(gameRoom);
        });

        socket.on("request join game", function (jsonInfos) {
            let infos = JSON.parse(jsonInfos).split(" ");
            //console.log("Client requested to join game " + infos[0] + " and his ID is " + infos[1]);

            for (let iter of server.gameList) {
                if (iter.getgid == infos[0]) {
                    server.gameList[iter].addPlayerToList(Player);
                    joinGame(server.gameList[iter]);
                }
            }
        });

        socket.on("player leave", function(jsonInfos) {
            var infos = JSON.parse(jsonInfos).split(" ");

            for (let iter of server.gameList) {
                if (iter.getgid == infos[0]) {
                    server.gameList[iter].removePlayerFromList(Player);
                }
            }
        });

        function joinGame(game) {
            //console.log("inspect the arriving game: " + game.playerCount + " " + game.roomName + " " + game.roomId);
            /*let gRToSend = server._.map(game.playerList, function(player) {
                return server._.omit(player, "socket");
            });*/
            let gRToSend = _.omit(game, "playerList");
            console.log(JSON.stringify(gRToSend, false, null));

            //console.log("sending ok to join the game, let's see gRToSend: " + gRToSend.playerCount + " " + gRToSend.roomName +  " " + gRToSend.roomId);
            io.emit("join game", gRToSend);
            //console.log("game maybe joined");
        }

        function omitPlayerSocket(player) {
            return (_.omit(player, "socket"));
        }

        function showCurrentGames() {
            //console.log("in the show current games and server gamelist = " + server.gameList[0]);
            socket.emit("current games", _.map(server.gameList, function(game) {
                //console.log("in the first map");
                let tmp = _.map(game.playerList, function(player) {
                    return _.omit(player, 'socket');
                });
                console.log(tmp.playerCount);
                return tmp;
            }));
        }
    });
}

main();