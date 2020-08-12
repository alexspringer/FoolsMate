//From socket.io documentation. and https://github.com/expo/examples/tree/master/with-socket-io
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

games = {};
players = {};
//an individual game has a name and an array of up to two players.
bool = true;

io.on("connection", (socket) => {
  console.log("a user connected! id: " + socket.id);

  //var gameNames = Object.keys(games);
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
    games[gameName].push({ id: socket.id, color: "black" });
    players[socket.id] = gameName;
  });

  socket.on("turn end", (move) => {
    var sendToPlayer = false;
    var gameName = players[socket.id];
    var playersInGame = games[gameName];
    //Only send broadcast if we have two players.
    if (playersInGame.length > 1) {
      //if the sockets ids match, we want to send the move to the other player.
      if (playersInGame[0].id === socket.id) {
        sendToPlayer = playersInGame[1].id;
      }
      //send to player 1
      else {
        sendToPlayer = playersInGame[0].id;
      }
      socket.to(sendToPlayer).broadcast.emit("turn start", move);
    }
  });

  socket.on("forfeit", () => {
    var sendToPlayer = false;
    var gameName = players[socket.id];
    var playersInGame = games[gameName];
    console.log(playersInGame);
    //Only send broadcast if we have two players.
    if (playersInGame.length > 1) {
      //if the sockets ids match, we want to send the move to the other player.
      if (playersInGame[0].id === socket.id) {
        sendToPlayer = playersInGame[1].id;
      }
      //send to player 1
      else {
        sendToPlayer = playersInGame[0].id;
      }

      if (sendToPlayer) {
        socket.to(sendToPlayer).broadcast.emit("enemy forfeit");
      }
    }
    //get rid of the game name and remove the active game from the player.
    delete games[gameName];
    delete players[socket.id];
    socket.emit("update-active-games", (games))
    console.log(players);
    console.log(games);
  });

  socket.on("player leave", () => {
    delete players[socket.id];
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected.");
  });
});

server.listen(port, () => console.log("The server is running on port " + port));
