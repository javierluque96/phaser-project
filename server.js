let express = require("express");
let app = express(); //referencia a lo de arriba
let server = require("http").createServer(app);
let io = require("socket.io")(server);
let port = process.env.PORT || 8081;

//we will store the player data in memory on the server
let players = {};

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//SERVER: Listener for every new CLIENT connections
io.on("connection", (socket) => {
  console.log("a user connected:" + socket.id);

  socket.on("menu", () => {
    players[socket.id] = { active: false };
    io.emit("players", players);
  });

  socket.on("player active", () => {
    players[socket.id].active = true;
    io.emit("players", players);
  });

  socket.on("level1", () => {
    players[socket.id] = {
      playerId: socket.id,
      x: Math.floor(Math.random() * 640) + 50,
      y: Math.floor(Math.random() * 480) + 50,
      active: true,
    };

    io.emit("start playing", players);
  });

  socket.on("playerMovement", (movementData) => {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    socket.broadcast.emit("playerMoved", players[socket.id]);
  });

  socket.on("winner", () => {
    io.emit("winner");
    io.emit("players", players);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:" + socket.id);
    delete players[socket.id];
    socket.broadcast.emit("players", players);
    io.emit("left level1", socket.id);
  });
});

// Local
// server.listen(port, () => {
//   console.log(`http://localhost:${server.address().port}`);
// });

// Heroku
let server_port = process.env.YOUR_PORT || process.env.PORT || 80;

let server_host = process.env.YOUR_HOST || "0.0.0.0";

server.listen(server_port, server_host, () => {
  console.log("Listening on port %d", server_port);
});
