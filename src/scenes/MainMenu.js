import Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
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
      this.game.config.height * 0.5,
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

    this.title = this.add.text(this.game.config.width * 0.5, 128, 'Corona SHOOTER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);
  }
}