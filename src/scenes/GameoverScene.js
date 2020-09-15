/* eslint-disable func-names, import/no-unresolved */

import Phaser from 'phaser';
import { getScores } from './leaderboard';

export default class GameoverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameoverScene' });
  }

  preload() {
    this.load.image('PlayBtn', 'assets/button/PlayBtn.png');
    this.load.image('PlayBtnDown', 'assets/button/PlayBtnDown.png');
    this.load.image('PlayBtnHover', 'assets/button/PlayBtnHover.png');
  }

  create() {
    // this.scene.add('GameScene', GameScene, false);
    this.cameras.main.setBackgroundColor('#000111');
    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      130,
      'PlayBtn',
    );
    this.btnPlay.setInteractive();

    this.btnPlay.on('pointerover', function () {
      this.btnPlay.setTexture('PlayBtnHover'); // set the button texture to sprBtnPlayHover
    }, this);

    this.btnPlay.on('pointerout', function () {
      this.setTexture('PlayBtn');
    });

    this.btnPlay.on('pointerdown', function () {
      this.btnPlay.setTexture('PlayBtnDown');
    }, this);

    this.btnPlay.on('pointerup', function () {
      this.btnPlay.setTexture('PlayBtn');
      this.scene.start('GameScene');
    }, this);

    const textsettings = {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    };
    const textsettings2 = {
      fontFamily: 'monospace',
      fontSize: 28,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    };

    const mid = this.game.config.width * 0.5;
    this.title = this.add.text(mid, 50, 'Game Over', textsettings);
    this.title.setOrigin(0.5);

    getScores().then((scores) => {
      scores.sort((a, b) => b.score - a.score);
      this.add.text(200, 200, 'LEADER BOARD', textsettings2);
      this.add.text(200, 250, 'RANK  SCORE   NAME', textsettings2);
      for (let i = 0; i <= 4; i += 1) {
        this.add.text(200, 250 + (50 * (i + 1)), ` ${i + 1}     ${scores[i].score}     ${scores[i].user}`, textsettings2);
      }
    }).catch(() => {

    });
  }
}