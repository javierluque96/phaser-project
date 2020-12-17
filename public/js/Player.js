import global from "./Game.js";
export default class Player extends Phaser.Physics.Arcade.Sprite {
  /**
   * Player manager
   * @param {*} config
   */
  constructor(scene, playerInfo, texture) {
    super(scene, playerInfo.x, playerInfo.y, texture);
    this.playerId = playerInfo.playerId;

    scene.add.existing(this);
    scene.physics.world.enableBody(this);

    if (scene.socket.id == playerInfo.playerId) {
      this.body.velocity.x = global.gameOptions.playerSpeed;
      this.canJump = true;
      this.canDoubleJump = false;
      this.onWall = false;
      scene.input.on("pointerdown", () => { this.handleJump(this) }, scene); // prettier-ignore
      scene.cameras.main.setBounds(0, 0, 1920, 1440);
      scene.cameras.main.startFollow(this);
    }
    scene.players.add(this);
  }

  handleJump(hero) {
    if ((hero.canJump && hero.body.blocked.down) || hero.onWall) {
      hero.body.velocity.y = -global.gameOptions.playerJump;

      if (hero.onWall) {
        hero.setPlayerXVelocity(true);
      }

      hero.canJump = false;
      hero.onWall = false;
      hero.canDoubleJump = true;
    } else {
      if (hero.canDoubleJump) {
        hero.canDoubleJump = false;
        hero.body.velocity.y = -global.gameOptions.playerDoubleJump;
      }
    }
  }

  collideTile(layer) {
    let blockedDown = this.body.blocked.down;
    let blockedLeft = this.body.blocked.left;
    let blockedRight = this.body.blocked.right;
    let shouldStop = false;

    this.canDoubleJump = false;

    if (blockedDown) {
      this.canJump = true;

      if (layer.index == global.STOP_TILE) {
        // hero should stop
        shouldStop = true;
      }
    }

    if (blockedRight) {
      this.flipX = true;
    }

    if (blockedLeft) {
      this.flipX = false;
    }

    if ((blockedRight || blockedLeft) && !blockedDown) {
      this.onWall = true;
      this.body.gravity.y = 0;
      this.body.velocity.y = global.gameOptions.playerGrip;
    }

    // adjusting hero speed according to the direction it's moving
    this.setPlayerXVelocity(!this.onWall || blockedDown, shouldStop);
  }

  setDefaultValues() {
    this.body.gravity.y = global.gameOptions.playerGravity;
    this.onWall = false;
    this.setPlayerXVelocity(true);
  }

  setPlayerXVelocity(defaultDirection, stopHero) {
    if (stopHero) {
      this.body.velocity.x = 0;
    } else {
      this.body.velocity.x =
        global.gameOptions.playerSpeed * (this.flipX ? -1 : 1) * (defaultDirection ? 1 : -1);
    }
  }
}
