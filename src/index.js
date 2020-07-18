import 'phaser';

import { SimpleScene } from './scenes/simple-scene';

const gameConfig = {
  width: 800,
  height: 600,
  scene: SimpleScene,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  }
};

new Phaser.Game(gameConfig);
