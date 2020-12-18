import global from "./Game.js";

class End extends Phaser.Scene {
  constructor() {
    super("End");
  }
  init(data) {
    this.socket = data.socket;
    this.id = data.playerId;
  }

  create() {
    let config = global.config;

    let start = this.add
      .text(config.width / 2, config.height / 2, "You won!!", {
        font: "25px Arial",
        fill: "yellow"
      })
      .setOrigin(0.5);

    // start.setInteractive().on("pointerdown", () => {
    //   this.scene.start("Level1", { socket: this.socket });
    // });
  }
}

export default End;
