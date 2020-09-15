import Phaser from 'phaser';
import { putScore } from './leaderboard';
var keySpace;
var keyBackspace;
var textEntry;
var enterKey = false;
var currscore;

export default class GetUsername extends Phaser.Scene {
  constructor() {
    super('GetUsername');
  }
  init(cscore) {
    currscore = this.scene.settings.data.cscore;

  }

  create() {
    this.add.text(100, 10, 'Enter your name:', { font: '32px Courier', fill: '#ffffff' });

    textEntry = this.add.text(100, 50, '', { font: '32px Courier', fill: '#ffff00' });

    // keys = this.input.keyboard.addKeys('A,B,C');

    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyBackspace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);

    this.input.keyboard.on('keydown', function (event) {

      if (event.keyCode === 8 && textEntry.text.length > 0) {
        textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
      }
      else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) {
        textEntry.text += event.key;
      }
      else if (event.keyCode === 13) {

        // console.log(textEntry.text);
        // console.log("current score: ", currscore);
        putScore(textEntry.text, currscore).then(() => {
          enterKey = true;
        }).catch((e) => {
          console.log(e)
        });

      }

    });
  }

  update() {
    if (keySpace.isDown) {

    }
    if (enterKey) {
      this.end()

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