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

    this.hero = new Player(this);
    
  }

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
  }
} //class

export default Level1;
