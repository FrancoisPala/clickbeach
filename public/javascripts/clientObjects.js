/**
 * Created by Jam on 31-Mar-16.
 */

/* Object Menu */
var Menu = {
    gameList: [],
    currentPlayer: null
};
/* End Menu */

/* Object Player */
var Player = {
    tempId: "0",
    socket: null,
    name: "",
    id: "",
    mail:"",
    password:"",
    record:"",
    nbrWin:""
};
/* End Player */

/* Object Game */
var Game = {
    playerList: null, /* map avec le score devant? */
    nbrPlayer: 0,
    roomName: "",
    roomId: "",
    started: 0,
    leader: null,
    leaderName: ""
};