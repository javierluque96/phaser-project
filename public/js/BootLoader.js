import global from "./Game.js";

class BootLoader extends Phaser.Scene {
    constructor(){
        super("BootLoader");         
    }


    preload() {
        this.load.tilemapTiledJSON("level1", "../js/json/level.json");
        this.load.tilemapTiledJSON("level2", "../js/json/level2.json");
        this.load.image("tile", "../assets/tile.png");
        this.load.image("hero", "../assets/hero.png");
        this.load.image("enemy", "../assets/enemy.png");
    }

    create(){
        global.socket = io();
        this.scene.start("Menu");
    }

}

export default BootLoader;