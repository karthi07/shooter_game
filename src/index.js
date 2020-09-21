/* eslint-disable import/no-unresolved */

import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import GameoverScene from './scenes/GameoverScene';
import GetUsername from './scenes/GetUsername';
import MainMenu from './scenes/MainMenu';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
    },
  },
  scene: [MainMenu, GameScene, GameoverScene, GetUsername],
};

export default new Phaser.Game(config);