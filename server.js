/**
 * Created by Jam on 07-Mar-16.
 */
"use strict";

/*var express = require('express');
var _ = require('lodash');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static('public'));

server.listen(8080);




var gameNumber = 0; /* to create room ids
var gameId = 0; /* to create room ids
var guestId = 0; /* to create guest ids
var gameList = []; /* all the games currently played on the serv. Contains an array of gameRoom objects */

function main() {
    let server = require("./object-server.js")(8080);
    server.start();
    console.log("Server Started on port " + server.port);

    server.io.on('connection', function (socket) {
        console.log("client successfully connected");
        // Does the player have an account? We assume no for now
        let uniqueGuestId = server.getGuestId;
        server.incrementGuestId();
        socket.emit("account info", uniqueGuestId);

        showCurrentGames();

        socket.on('createGame', function (jsonInfos) {
            let infos = JSON.parse(jsonInfos).split(" ");
            console.log("client created game with infos 0 = " + infos[0] + " and infos 1 = " + infos[1]);
            server.incrementGameId();
            let gameRoom = require("./object-game.js")(infos[0], server.getGameId);
            //en premier créer le joueur
            let player = require("./object-player.js")(socket, uniqueGuestId);
            // puis l'ajouter a la liste dans la game
            gameRoom.addPlayerToList(player);
            server.addGameToList(gameRoom);
        });
            // And then we join the game

            /*
            var infos = JSON.parse(jsonInfos).split(" ");
            gameId += 1;
            //create a game
            gameRoom.playerNumber++;
            gameRoom.roomName = infos[0];
            gameRoom.roomId = gameId;
            gameRoom.playerSockets.set(infos[1], socket);
            //gameRoom.playerSockets[infos[1]] = gameRoom.playerSockets[infos[1]] || [];
            gameRoom.playerSockets[infos[1]].push(socket);
            //gameRoom.playerSockets.push(socket);
            gameRoom.players.push(infos[1]);
            gameList.push(gameRoom);
            socket.emit("current games", _.map(gameList, function(game) {
                return _.omit(game, 'playerSockets');
            }));
            var gRToSend = omitPlayerSockets(gameRoom);

            // Here find a way to update everybody's list of game view to dynamically show the new games


            socket.emit("join game", gRToSend);*/
        //});

        socket.on("request join game", function (jsonInfos) {
            var infos = JSON.parse(jsonInfos).split(" ");
            // 1ere etape = trouver la room
            for (var i = 0; i < gameList.length; i++){
                if (gameList[i].roomId == infos[0]){
                    gameList[i].playerNumber++;
                    gameList[i].playerSockets[infos[1]] = gameList[i].playerSockets[infos[1]] || [];
                    gameList[i].playerSockets[infos[1]].push(socket);
                    gameList[i].players.push(infos[1]);
                    var gRTosend = omitPlayerSockets(gameList[i]);
                    socket.emit("join game", gRTosend);
                }
            }

            // puis l'envoyer
        });

        socket.on("player leave", function(jsonInfos) {
            var infos = JSON.parse(jsonInfos).split(" ");
            for (var i = 0; i < gameList.length; i++){
                if (gameList[i].roomId == infos[0]){
                    gameList[i].playerNumber--;
                    gameList[i].playerSockets.delete(infos[1]);
                    //gameList[i].players.delete(infos[1]);
                    for (var j = 0; j < gameList[i].players.length; j++){
                        if (gameList[i].players[j] == infos[1]) {
                            var index = gameList[i].players[j].indexOf(j);
                            gameList[i].players.splice(index, 1);
                        }
                    }
                    if (gameList[i].playerNumber == 0) {
                        var index = gameList.indexOf(i);
                        gameList.splice(index, 1);
                    }
                    showCurrentGames();
                }
            }
        });

        socket.on('join game', function(infos) {

        });

        function omitPlayerSockets(gameRoom){
            return _.omit(gameRoom, "playerSockets")
        }
        function showCurrentGames() {
            socket.emit("current games", _.map(server.gameList, function(game) {
                return _.omit(game, 'playerSockets');
            }));
        }
    });
}

main();

/*



io.on('connection', function (socket) {
    // Does the player have an account?

    // create a player

    showCurrentGames();

    var gameRoom = {
        playerNumber: 0,
        roomName: "",
        roomId: 0,
        playerSockets: new Map(),
        players: []
    };


    socket.emit("account info", guestId++);


    socket.on('createGame', function (jsonInfos) {
        var infos = JSON.parse(jsonInfos).split(" ");
        gameNumber += 1;
        gameId += 1;
        //create a game
        gameRoom.playerNumber++;
        gameRoom.roomName = infos[0];
        gameRoom.roomId = gameId;
        gameRoom.playerSockets.set(infos[1], socket);
        //gameRoom.playerSockets[infos[1]] = gameRoom.playerSockets[infos[1]] || [];
        gameRoom.playerSockets[infos[1]].push(socket);
        //gameRoom.playerSockets.push(socket);
        gameRoom.players.push(infos[1]);
        gameList.push(gameRoom);
        socket.emit("current games", _.map(gameList, function(game) {
            return _.omit(game, 'playerSockets');
        }));
        var gRToSend = omitPlayerSockets(gameRoom);

        // Here find a way to update everybody's list of game view to dynamically show the new games


        socket.emit("join game", gRToSend);
    });
    
    socket.on("request join game", function (jsonInfos) {
        var infos = JSON.parse(jsonInfos).split(" ");
        // 1ere etape = trouver la room
        for (var i = 0; i < gameList.length; i++){
            if (gameList[i].roomId == infos[0]){
                gameList[i].playerNumber++;
                gameList[i].playerSockets[infos[1]] = gameList[i].playerSockets[infos[1]] || [];
                gameList[i].playerSockets[infos[1]].push(socket);
                gameList[i].players.push(infos[1]);
                var gRTosend = omitPlayerSockets(gameList[i]);
                socket.emit("join game", gRTosend);
            }
        }

        // puis l'envoyer
    });

    socket.on("player leave", function(jsonInfos) {
        var infos = JSON.parse(jsonInfos).split(" ");
        for (var i = 0; i < gameList.length; i++){
            if (gameList[i].roomId == infos[0]){
                gameList[i].playerNumber--;
                gameList[i].playerSockets.delete(infos[1]);
                //gameList[i].players.delete(infos[1]);
                for (var j = 0; j < gameList[i].players.length; j++){
                    if (gameList[i].players[j] == infos[1]) {
                        var index = gameList[i].players[j].indexOf(j);
                        gameList[i].players.splice(index, 1);
                    }
                }
                if (gameList[i].playerNumber == 0) {
                    var index = gameList.indexOf(i);
                    gameList.splice(index, 1);
                }
                showCurrentGames();
            }
        }
    });

    socket.on('join game', function(infos) {

    });

    function omitPlayerSockets(gameRoom){
        return _.omit(gameRoom, "playerSockets")
    }
    function showCurrentGames() {
        socket.emit("current games", _.map(gameList, function(game) {
            return _.omit(game, 'playerSockets');
        }));
    }
});

*/