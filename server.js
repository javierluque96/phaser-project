let express = require("express");
let app = express(); //referencia a lo de arriba
var path = require("path");
let server = require("http").createServer(app);
let io = require("socket.io")(server);
let port = process.env.PORT || 8081;

//we will store the player data in memory on the server
var players = {};

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//SERVER: Listener for every new CLIENT connections
io.on("connection", (socket) => {
  console.log("a user connected:" + socket.id);

  players[socket.id] = {
    playerId: socket.id,
    x: Math.floor(Math.random() * 640) + 50,
    y: Math.floor(Math.random() * 480) + 50,
  };

  socket.emit("new player", players);
  socket.broadcast.emit("new enemy", players[socket.id]);

  socket.on("playerMovement", (movementData) => {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    socket.broadcast.emit("playerMoved", players[socket.id]);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:" + socket.id);
    delete players[socket.id];
    io.emit("user disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`http://localhost:${server.address().port}`);
});
