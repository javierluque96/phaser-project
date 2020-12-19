import global from "./Game.js";

class End extends Phaser.Scene {
  constructor() {
    super("End");
  }
  create() {
    global.socket.emit("player inactive");
    this.scene.remove("Level1");
    let config = global.config;
    global.playingGame = false;
    this.add
      .text(config.width / 2, config.height / 2 - 60, global.endText, {
        font: "25px Arial",
        fill: "yellow",
      })
      .setOrigin(0.5);

    this.add
      .text(config.width / 2, config.height / 2, "Refresh to play again", {
        font: "25px Arial",
        fill: "yellow",
      })
      .setOrigin(0.5);
  }
}

export default End;
