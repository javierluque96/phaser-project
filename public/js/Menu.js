import global from "./Game.js";

class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  create() {
    let config = global.config;

    let start = this.add
      .text(config.width / 2, config.height / 2, "Start game", {
        font: "25px Arial",
        fill: "yellow",
        boundsAlignH: "center",
        boundsAlignV: "middle",
      })
      .setOrigin(0.5);

    start.setInteractive().on("pointerdown", () => {
      this.scene.start("Level1");
    });
  }
}

export default Menu;
