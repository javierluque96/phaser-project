// import global from "./Game.js";
import Player from "./Player.js";

class Level1 extends Phaser.Scene {
  constructor() {
    super("Level1");
  }

  create() {
    let map = this.make.tilemap({
      key: "level2",
    });
    let tiles = map.addTilesetImage("tileset01", "tile");
    map.setCollision(1);
    this.layer = map.createStaticLayer("layer01", tiles);

    this.players = this.physics.add.group();

    // this.socket = global.socket;
    this.socket = io();
    let self = this;

    // Socket
    this.socket.on("new player", (playerInfo) => {
      if (playerInfo.playerId === this.socket.id) {
        self.hero = new Player(self, playerInfo, "hero");
        console.log(this.hero);
      } else {
        // new Player(this, players[id], "enemy");
        console.log(new Player(self, playerInfo, "enemy"));
      }
    });

    this.socket.on("disconnect", (playerId) => {
      console.log(self.hero);
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
  } // create

  update() {
    this.hero.setDefaultValues();

    this.physics.world.collide(
      this.hero,
      this.layer,
      (hero, layer) => {
        hero.collideTile();
      },
      null,
      this
    );

    let x = this.hero.x;
    let y = this.hero.y;

    if (this.hero.oldPosition && (x !== this.hero.oldPosition.x || y !== this.hero.oldPosition.y)) {
      this.socket.emit("playerMovement", {
        x: this.hero.x,
        y: this.hero.y,
      });
    }

    this.hero.oldPosition = {
      x: this.hero.x,
      y: this.hero.y,
    };
  } // update
} // class

export default Level1;
