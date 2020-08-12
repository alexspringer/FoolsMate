//Basic structure follows the documentation for setting up a socket.io server with expo.
//https://github.com/expo/examples/tree/master/with-socket-io
//https://socket.io/get-started/chat/

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

//Active games
games = {};
//Keep track of what games players are in
players = {};

io.on("connection", (socket) => {
  console.log("a user connected! id: " + socket.id);

  socket.on("get-active-games", () => {
    socket.emit("active games", games);
  });

  socket.on("create game", (gameName) => {
    //Keep track of the players in the game
    games[gameName] = [{ id: socket.id, color: "white" }];
    //keep track of what game a player is in
    players[socket.id] = gameName;
    socket.broadcast.emit("game created", gameName);
  });

  socket.on("join game", (gameName) => {
    let serverMessage;
    let flag = true;
    //There is a slight delay from when a game is deleted on the server and
    //when that deletion is represented on the client so there is a chance
    //the game no longer exists when the user clicks on it.
    if (games[gameName]) {
      //Only allow 1 other player to join the game
      if (games[gameName].length === 1) {
        games[gameName].push({ id: socket.id, color: "black" });
        players[socket.id] = gameName;
        var sendToPlayer = findOpponentID(gameName);
        socket.to(sendToPlayer).broadcast.emit("enemy join");
      } else {
        serverMessage = "Sorry! This game is full.";
        flag = false;
      }
    } else {
      serverMessage = "Sorry! This game no longer exists!";
      flag = false;
    }
    socket.emit("join status", { serverMessage: serverMessage, flag: flag });
  });

  socket.on("turn end", (move) => {
    var gameName = players[socket.id];
    var sendToPlayer = findOpponentID(gameName);
    if (sendToPlayer) {
      socket.to(sendToPlayer).broadcast.emit("turn start", move);
    }
  });

  socket.on("forfeit", () => {
    var gameName = players[socket.id];
    var sendToPlayer = findOpponentID(gameName);

    if (sendToPlayer) {
      socket.to(sendToPlayer).broadcast.emit("enemy forfeit");
    }

    //get rid of the game name and remove the active game from the player.
    delete games[gameName];
    delete players[socket.id];

    socket.emit("active games", games);
  });

  //After a player forfeits, and the other player presses on the alert to go
  //back to matchmaking, clean up their info on the server so they aren't in
  //a game anymore.
  socket.on("player leave", () => {
    delete players[socket.id];
  });

  socket.on("disconnect", () => {
    //If the player was in any game before DC, make the other player the winner
    //And delete the game.
    var gameName = players[socket.id];
    var sendToPlayer = findOpponentID(gameName);

    if (players[socket.id]) {
      delete players[socket.id];
    }

    if (games[gameName]) {
      delete games[gameName];
    }

    if (sendToPlayer) {
      socket.to(sendToPlayer).broadcast.emit("enemy forfeit");
    }

    console.log(socket.id + " disconnected.");
  });

  //Finds the socket.id of the other player in a users game to send them info
  //while in the game screen
  function findOpponentID(gameName) {
    //If the game doesn't exist.
    if (!games[gameName]) {
      return false;
    }

    //Are there two players in this game? If there are...
    if (games[gameName].length > 1) {
      //Are we player 1? If we are, send the message to player 2.
      if (games[gameName][0].id === socket.id) {
        return games[gameName][1].id;
      }
      //Are we player 2? If we are, send the message to player 1.
      else {
        return games[gameName][0].id;
      }
    }

    //There are not two players in this game...
    else {
      return false;
    }
  }
});

server.listen(port, () => console.log("The server is running on port " + port));
