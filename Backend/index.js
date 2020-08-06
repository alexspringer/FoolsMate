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

  socket.on("create game", (gameName) => {
    console.log(gameName);
    //games.concat(gameName);
    games[gameName] = [{ id: socket.id, color: "white" }];
    players[socket.id] = gameName;
    socket.broadcast.emit("game created", gameName);
  });

  socket.on("join game", (gameName) => {
    games[gameName].push({ id: socket.id, color: "black" });
  });

  socket.on("turn end", (move) => {
    console.log(move);
    socket.broadcast.emit("turn start", move);
  });

  socket.on("checkmate", ()=> {
    socket.broadcast.emit("game over");
  });

  socket.on("disconnect", () =>{
    console.log(socket.id + " disconnected.")
  });
});

server.listen(port, () => console.log("The server is running on port " + port));
