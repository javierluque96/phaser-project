import global from "./Game.js";

class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  create() {
    global.socket.emit("menu");

    let config = global.config;
    let style = {
      font: "30px Arial",
      fill: "yellow",
    };

    this.labelNumPlayers = "Players connected: ";
    this.numPlayers = this.add
      .text(global.config.width / 2, global.config.height / 2 - 60, this.labelNumPlayers, style)
      .setOrigin(0.5);

    this.start = this.add
      .text(config.width / 2, config.height / 2, "Click here to play", style)
      .setOrigin(0.5);

    this.start.setInteractive().on("pointerdown", () => {
      global.socket.emit("player active");
    });

    global.socket.on("players", (players) => {
      self.allPlayers = players;
      this.updatePlayersPlay(players);
    });

    this.fullRoom = this.add
      .text(config.width / 2, config.height / 2, "Full room", style)
      .setOrigin(0.5)
      .setAlpha(0);
  }
  /**
   * Checks players actives, starts the game and full room text
   * @param  {} players
   */
  updatePlayersPlay(players) {
    let actives = 0;
    const PLAYERS_TO_PLAY = 2;
    //Loop players and ask who is active
    Object.keys(players).forEach(function (id) {
      if (players[id].active) actives++;
    });

    this.numPlayers.setText(this.labelNumPlayers + Object.keys(players).length);

    // If there are 2 active players starts the game
    if (actives < PLAYERS_TO_PLAY) {
      this.fullRoom.setAlpha(0);
      this.start.setAlpha(1);
      if (players[global.socket.id].active) {
        this.start.setText("Waiting for players " + actives + "/" + PLAYERS_TO_PLAY);
      }
    } else {
      this.fullRoom.setAlpha(1);
      this.start.setAlpha(0);

      if (players[global.socket.id].active && !global.playingGame) {
        this.scene.switch("Level1");
      }
    }
  }
}

export default Menu;
