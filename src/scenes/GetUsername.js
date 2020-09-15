/* eslint-disable no-empty, import/no-unresolved */

import Phaser from 'phaser';
import { putScore } from './leaderboard';

let keySpace;
let textEntry;
let enterKey = false;
let currscore;

export default class GetUsername extends Phaser.Scene {
  constructor() {
    super('GetUsername');
  }

  init() {
    currscore = this.scene.settings.data.cscore;
  }

  create() {
    this.add.text(100, 10, 'Enter your name:', { font: '32px Courier', fill: '#ffffff' });

    textEntry = this.add.text(100, 50, '', { font: '32px Courier', fill: '#ffff00' });

    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.input.keyboard.on('keydown', (event) => {
      if (event.keyCode === 8 && textEntry.text.length > 0) {
        textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
      } else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) {
        textEntry.text += event.key;
      } else if (event.keyCode === 13) {
        putScore(textEntry.text, currscore).then(() => {
          enterKey = true;
        }).catch((e) => `error: ${e}`);
      }
    });
  }

  update() {
    if (keySpace.isDown) {

    }
    if (enterKey) {
      this.end();
    }
  }

  end() {
    // this.scene.start('GameoverScene')
    enterKey = false;
    this.time.addEvent({
      delay: 1000,
      callback() {
        // this.scene.sleep('GameScene');
        this.scene.start('GameoverScene');
      },
      callbackScope: this,
      loop: false,
    });
  }
}