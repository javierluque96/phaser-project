import global from "./Game.js";

class End extends Phaser.Scene {
  constructor() {
    super("End");
  }
  create() {
    let config = global.config;
    global.playingGame = false;
    this.add
      .text(config.width / 2, config.height / 2 - 60, global.endText, {
        font: "25px Arial",
        fill: "yellow",
      })
      .setOrigin(0.5);

    let playAgain = this.add
      .text(config.width / 2, config.height / 2, "Refresh to play again", {
        font: "25px Arial",
        fill: "yellow",
      })
      .setOrigin(0.5);

    // playAgain.setInteractive().on("pointerdown", () => {
    //   this.scene.switch("Menu");
    // });
  }
}

export default End;
