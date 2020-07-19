import 'phaser';

import { SceneMainMenu, SceneMain, SceneGameOver } from './scenes/scene-mainmenu';

const gameConfig = {
  width: 800,
  height: 600,
  scene: [
    SceneMainMenu,
    SceneMain,
    SceneGameOver
  ],
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  }
};

new Phaser.Game(gameConfig);
