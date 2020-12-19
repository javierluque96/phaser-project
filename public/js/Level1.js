import global from "./Game.js";
import Player from "./Player.js";

class Level1 extends Phaser.Scene {
  constructor() {
    super("Level1");
  }

  init() {
    this.socket = global.socket;
    this.socket.emit("level1");
    global.playingGame = true;
  }

  create() {
    let self = this;

    this.map = this.make.tilemap({
      key: "level1",
    });
    let tiles = this.map.addTilesetImage("tileset01", "tile");
    this.map.setCollision(1, 3);
    this.layer = this.map.createStaticLayer("layer01", tiles);

    this.players = this.physics.add.group();

    this.socket.on("start playing", (players) => {
      Object.keys(players).forEach(function (id) {
        if (players[id].playerId === global.socket.id) {
          self.hero = new Player(self, players[id], "hero");
        } else {
          new Player(self, players[id], "enemy");
        }
      });
    });

    this.socket.on("left level1", (playerId) => {
      this.players.getChildren().forEach((otherPlayer) => {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy();
        }
      });
    });

    this.socket.on("playerMoved", (playerInfo) => {
      this.players.getChildren().forEach((otherPlayer) => {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.setPosition(playerInfo.x, playerInfo.y);
        }
      });
    });

    this.socket.on("winner", () => {
      global.endText = self.win ? "You won!!!" : "I am sorry, you have lost :(";
      this.scene.switch("End");
    });
  } // create

  update() {
    if (this.hero) {
      this.hero.setDefaultValues();
      let tile = this.map.getTileAtWorldXY(this.hero.x, this.hero.y);

      if (tile != null && tile.index == 2) {
        this.socket.emit("winner");
        this.win = true;
      }

      this.physics.world.collide(
        this.hero,
        this.layer,
        (hero, layer) => {
          hero.collideTile(layer);
        },
        null,
        this
      );

      let x = this.hero.x;
      let y = this.hero.y;

      if (
        this.hero.oldPosition &&
        (x !== this.hero.oldPosition.x || y !== this.hero.oldPosition.y)
      ) {
        this.socket.emit("playerMovement", {
          x: this.hero.x,
          y: this.hero.y,
        });
      }

      this.hero.oldPosition = {
        x: this.hero.x,
        y: this.hero.y,
      };
    }
  } // update
} // class

export default Level1;
