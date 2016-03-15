/**
 * Created by Jam on 07-Mar-16.
 */

var express = require('express');
var _ = require('lodash');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static('public'));

server.listen(8080);


var gameNumber = 0; /* to create room ids */
var gameId = 0; /* to create room ids */
var guestId = 0; /* to create guest ids */
var gameList = []; /* all the games currently played on the serv. Contains an array of gameRoom objects */
/*
var gameRoom(playerName, roomName, roomId, socket) {
    var playerNumber = 1;
    var roomName = roomName;
    var roomId = roomId;
    var players = [playerName]; /* array of sockets */
/*
}*/

io.on('connection', function (socket) {
    socket.emit("current games", _.map(gameList, function(game) {
        return _.omit(game, 'playerSockets');
    }));
    socket.emit("account info", guestId++);

    console.log("connection");

    socket.on('createGame', function (jsonInfos) {
        var infos = JSON.parse(jsonInfos).split(" ");
        gameNumber += 1;
        gameId += 1;
        /*create a game*/
        var gameRoom = {
            playerNumber: 1,
            roomName: infos[0],
            roomId: gameId,
            playerSockets: socket,
            players: []
        };
        gameRoom.players.push(infos[1]);
        gameList.push(gameRoom);
        socket.emit("current games", _.map(gameList, function(game) {
            return _.omit(game, 'playerSockets');
        }));
        gRToSend = _.omit(gameRoom, "playerSockets")
        socket.emit("join game", gRToSend);
    });

    socket.on("player leave", function(){

    });

    socket.on('join game', function(nameRoom) {

    });
});