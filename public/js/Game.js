import BootLoader from "./BootLoader.js";
import Menu from "./Menu.js";
import Level1 from "./Level1.js";

let global = {
  STOP_TILE: 2,
  config: {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    backgroundColor: 0x444444,
    physics: {
      default: "arcade",
      arcade: {
        gravity: {
          y: 0,
        },
      },
    },
    scale: {
      // mode: Phaser.Scale.FIT,
      // autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [BootLoader, Menu, Level1],
  },
  gameOptions: {
    playerGravity: 900,
    playerSpeed: 200,
    playerJump: 400,
    playerDoubleJump: 300,
    playerGrip: 100,
    // enemySpeed: 150,
  },
};

new Phaser.Game(global.config);

export default global;
